const pipeline = [
  { decision: "APPLY", score: 88, title: "Cloud Support Engineer", company: "Northstar Systems", detail: "£42k–£48k · Birmingham · Hybrid", reason: "Strong Azure and Microsoft 365 alignment with clear salary progression." },
  { decision: "APPLY", score: 79, title: "Infrastructure Engineer", company: "Orbit Events", detail: "£40k–£45k · Remote UK", reason: "Your event infrastructure, Windows Server and networking experience transfer directly." },
  { decision: "CONSIDER", score: 66, title: "Senior IT Support Engineer", company: "Coventry Digital", detail: "£35k–£39k · Coventry", reason: "Excellent location and technical fit, but the salary and scope may offer limited progression." },
];

export default function JobsPage() {
  return <main className="main"><div className="top"><div><span className="eyebrow">Job intelligence pipeline</span><h1>Review opportunities</h1><p>Every role must earn its place here.</p></div><button className="button">Discover new jobs</button></div><section className="filter-row"><button>All jobs</button><button>Apply</button><button>Consider</button><button>Skip</button></section><section className="jobs">{pipeline.map((job) => <article className="card job-review" key={job.title}><div className="score">{job.score}</div><div><span className={job.decision.toLowerCase()}>{job.decision}</span><h2>{job.title}</h2><p>{job.company} · {job.detail}</p><p>{job.reason}</p></div><div className="job-actions"><button className="button">Review role</button><button className="secondary">Save</button></div></article>)}</section></main>;
}
