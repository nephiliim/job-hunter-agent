export const candidateProfile = {
  name: "Derek Gyaase",
  location: "Coventry, UK",
  currentRole: "Onsite Technical Manager",
  currentEmployer: "LiveBuzz",
  currentSalary: 33475,
  minimumSalary: 38000,
  targetTitles: ["Cloud Support Engineer", "Infrastructure Engineer", "Azure Administrator", "Systems Engineer", "IT Operations Lead"],
  skills: ["Azure", "Entra ID", "Microsoft 365", "Windows Server", "VMware", "Intune", "Networking", "Python", "Terraform", "GitHub Actions", "Docker", "FastAPI", "React"],
  careerGoals: ["cloud administration", "infrastructure", "technical leadership", "larger complex environments", "Azure"],
  experience: [
    { role: "Onsite Technical Manager", employer: "LiveBuzz", period: "April 2025 – Present", summary: "Leads technical delivery for live events, onsite registration infrastructure, networks, servers, printers, devices and operational troubleshooting across UK and international venues." },
    { role: "Senior IT Technician", employer: "Coventry University", period: "2021 – 2025", summary: "Supported enterprise users and Microsoft infrastructure, resolving escalated technical issues across endpoint, identity and core IT services." },
    { role: "Service Desk 1st Line Support", employer: "Flooid", period: "2019 – 2021", summary: "Delivered frontline technical support, incident diagnosis, escalation and customer communication." },
  ],
  certifications: ["DataCamp AI Engineer for Developers Associate"],
  preferences: { maxCommuteMinutes: 75, workModes: ["Hybrid", "Remote", "Onsite within range"], requiresProgression: true },
} as const;

export type CandidateProfile = typeof candidateProfile;
