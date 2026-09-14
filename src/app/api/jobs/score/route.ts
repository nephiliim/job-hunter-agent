import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreJob } from "@/lib/scoring";

const requestSchema = z.object({
  job: z.object({
    title: z.string().min(1),
    location: z.string(),
    salaryMin: z.number().nullable().optional(),
    salaryMax: z.number().nullable().optional(),
    description: z.string(),
    requirements: z.array(z.string()).optional(),
  }),
  candidate: z.object({
    skills: z.array(z.string()),
    targetTitles: z.array(z.string()),
    careerGoals: z.array(z.string()),
    currentSalary: z.number().nullable().optional(),
    minimumSalary: z.number().nullable().optional(),
    homeLocation: z.string(),
    maxCommuteMinutes: z.number().positive(),
  }),
});

export async function POST(request: Request) {
  try {
    const input = requestSchema.parse(await request.json());
    return NextResponse.json(scoreJob(input.job, input.candidate));
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid scoring request", detail: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
