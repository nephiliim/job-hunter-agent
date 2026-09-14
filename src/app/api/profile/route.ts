import { NextResponse } from "next/server";
import { candidateProfile } from "@/data/candidate-profile";

export async function GET() {
  return NextResponse.json(candidateProfile);
}
