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
  officeDaysPerWeek?: number | null;
  employmentType?: string | null;
};

const clamp = (number: number) => Math.max(0, Math.min(100, Math.round(number)));
const normalise = (text: string) => text.toLowerCase().replace(/[^a-z0-9+#. ]/g, " ");
const includesAny = (text: string, terms: string[]) => terms.some((term) => text.includes(normalise(term)));

export function scoreJob(job: JobInput, candidate: Candidate) {
  const evidence = normalise([job.title, job.description, ...(job.requirements ?? [])].join(" "));
  const title = normalise(job.title);
  const matchedSkills = candidate.skills.filter((skill) => evidence.includes(normalise(skill)));
  const missingSkills = (job.requirements ?? []).filter(
    (requirement) => !candidate.skills.some((skill) => normalise(requirement).includes(normalise(skill))),
  );

  const cloudProgression = includesAny(evidence, ["Azure", "Entra ID", "cloud", "infrastructure", "Microsoft 365", "Intune", "Terraform"]);
  const leadershipProgression = includesAny(evidence, ["lead", "ownership", "mentor", "project delivery", "technical leadership"]);
  const progression = cloudProgression || leadershipProgression;

  const skillsScore = clamp((matchedSkills.length / Math.max(6, candidate.skills.length)) * 100);
  const titleMatch = candidate.targetTitles.some(
    (target) => title.includes(normalise(target)) || normalise(target).includes(title),
  );
  const goalMatches = candidate.careerGoals.filter((goal) => evidence.includes(normalise(goal)));
  let careerScore = clamp((titleMatch ? 65 : 25) + goalMatches.length * 10 + (progression ? 10 : -15));

  const offeredSalary = job.salaryMax ?? job.salaryMin;
  let salaryScore = 50;
  if (offeredSalary) {
    if (offeredSalary >= 40000) salaryScore = 100;
    else if (offeredSalary >= 38000) salaryScore = 82;
    else if (offeredSalary >= 35000 && progression) salaryScore = 62;
    else if (offeredSalary >= (candidate.currentSalary ?? 0)) salaryScore = 35;
    else salaryScore = 0;
  }

  const isLondon = /london/i.test(job.location);
  const isRemote = /remote/i.test(job.location);
  const isLocal = /coventry|birmingham|west midlands/i.test(job.location);
  let locationScore = isRemote ? 100 : isLocal ? 90 : 50;
  if (isLondon) {
    const acceptableAttendance = job.officeDaysPerWeek == null || job.officeDaysPerWeek <= 2;
    locationScore = acceptableAttendance && (!offeredSalary || offeredSalary >= 42000) ? 72 : 15;
  }

  const firstLine = includesAny(title, ["1st line", "first line", "service desk analyst", "helpdesk"]);
  const belowCurrentSalary = Boolean(offeredSalary && candidate.currentSalary && offeredSalary < candidate.currentSalary);
  const londonAttendanceFail = isLondon && job.officeDaysPerWeek != null && job.officeDaysPerWeek > 2;
  const unclearShortContract = /contract|temporary|fixed term/i.test(job.employmentType ?? "") && !offeredSalary;
  const hardSkip = firstLine || belowCurrentSalary || londonAttendanceFail || unclearShortContract;
  if (firstLine || !progression) careerScore = clamp(careerScore - 25);

  let overallScore = clamp(skillsScore * 0.4 + careerScore * 0.3 + salaryScore * 0.2 + locationScore * 0.1);
  if (hardSkip) overallScore = Math.min(overallScore, 49);
  const recommendation = hardSkip ? "SKIP" : overallScore >= 75 ? "APPLY" : overallScore >= 55 ? "CONSIDER" : "SKIP";

  const decisionReasons = [
    cloudProgression ? "Offers cloud or infrastructure progression" : "Limited evidence of cloud progression",
    offeredSalary ? `Salary evaluated at £${offeredSalary.toLocaleString("en-GB")}` : "Salary not disclosed",
    isLondon ? `London attendance: ${job.officeDaysPerWeek ?? "unknown"} office days per week` : "Location assessed against Coventry travel rules",
  ];

  return { overallScore, skillsScore, careerScore, salaryScore, locationScore, recommendation, matchedSkills, missingSkills, goalMatches, progression, hardSkip, decisionReasons };
}
