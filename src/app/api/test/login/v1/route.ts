"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.redirect("http://localhost:3000/api/test/login/v2");
}
