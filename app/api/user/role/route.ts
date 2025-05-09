import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// GET /api/users/supervisors
export async function GET(request: NextRequest) {
  const supervisors = await prisma.user.findMany({
    where: {
      role: {
        in: ["SUPERVISOR", "COORDINATOR", "ADMIN"],
      },
    },
  });
  return NextResponse.json(supervisors);
}
