export type Candidate = {
  skills: string[];
  targetTitles: string[];
  careerGoals: string[];
  currentSalary?: number | null;
  minimumSalary?: number | null;
  homeLocation: string;
  maxCommuteMinutes: number;
};

export type JobInput = {
  title: string;
  location: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  description: string;
  requirements?: string[];
};

const clamp = (number: number) => Math.max(0, Math.min(100, Math.round(number)));
const normalise = (text: string) => text.toLowerCase().replace(/[^a-z0-9+#. ]/g, " ");

export function scoreJob(job: JobInput, candidate: Candidate) {
  const evidence = normalise([job.title, job.description, ...(job.requirements ?? [])].join(" "));
  const matchedSkills = candidate.skills.filter((skill) => evidence.includes(normalise(skill)));
  const missingSkills = (job.requirements ?? []).filter(
    (requirement) => !candidate.skills.some((skill) => normalise(requirement).includes(normalise(skill))),
  );
  const skillsScore = clamp((matchedSkills.length / Math.max(6, candidate.skills.length)) * 100);
  const titleMatch = candidate.targetTitles.some(
    (title) => normalise(job.title).includes(normalise(title)) || normalise(title).includes(normalise(job.title)),
  );
  const goalMatches = candidate.careerGoals.filter((goal) => evidence.includes(normalise(goal)));
  const careerScore = clamp((titleMatch ? 65 : 25) + goalMatches.length * 10);
  const offeredSalary = job.salaryMax ?? job.salaryMin;
  const salaryFloor = candidate.minimumSalary ?? candidate.currentSalary ?? 0;
  const salaryScore = !offeredSalary ? 50 : salaryFloor === 0 ? 75 : clamp(50 + ((offeredSalary - salaryFloor) / salaryFloor) * 150);
  const locationScore = /remote/i.test(job.location) ? 100 : /coventry|birmingham|west midlands/i.test(job.location) ? 90 : 50;
  const overallScore = clamp(skillsScore * 0.4 + careerScore * 0.3 + salaryScore * 0.2 + locationScore * 0.1);
  const recommendation = overallScore >= 75 ? "APPLY" : overallScore >= 55 ? "CONSIDER" : "SKIP";

  return { overallScore, skillsScore, careerScore, salaryScore, locationScore, recommendation, matchedSkills, missingSkills, goalMatches };
}
