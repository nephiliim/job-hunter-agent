# Job Hunter Agent

A personal recruitment intelligence platform that discovers, deduplicates, evaluates and ranks jobs; explains whether each role is a genuine career step; helps tailor applications; and tracks the full application journey.

## Current foundation

- Next.js 15, React 19 and strict TypeScript
- Responsive dark dashboard designed for desktop and mobile
- PostgreSQL and Prisma production data model
- Candidate profile, jobs, evidence-based analysis, applications and activity history
- Explainable scoring API with **Apply**, **Consider** and **Skip** decisions
- OpenAI-ready environment configuration

## Run locally

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Run `npm install`.
3. Run `npx prisma migrate dev --name init`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Initial scoring model

The deterministic baseline weights:

- Skills match: 40%
- Career progression: 30%
- Salary suitability: 20%
- Location/work mode: 10%

The API returns component scores, matching and missing skills, goal matches, the overall score and a clear recommendation. This baseline remains auditable when AI enrichment is added.

## Product roadmap

1. Authentication and encrypted CV/profile ingestion
2. Job source adapters and scheduled discovery
3. Duplicate detection and source reliability
4. AI evidence extraction layered over deterministic scoring
5. Full job review and pipeline management
6. CV tailoring, cover letters and application packs
7. Follow-up reminders, analytics and alerts
8. Automated tests, observability, CI and deployment

## Important principle

The system is not a generic scraper. Every recommendation must answer whether the job fits Derek's skills, represents progression, meets salary and travel constraints, has already been seen, and deserves an Apply, Consider or Skip decision.
