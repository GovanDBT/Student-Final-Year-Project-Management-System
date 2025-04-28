import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// GET /api/submission/type
export async function GET(request: NextRequest) {
  const deadlineTitle = await prisma.deadline.findMany({
    where: {
      isSubmittable: true
    },
    select: {
        id: true,
        title: true,
        deadlineDate: true,
        isSubmittable: true,
        description: true
    }
  });
  return NextResponse.json(deadlineTitle);
}