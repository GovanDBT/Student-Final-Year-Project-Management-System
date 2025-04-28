import { createSubmissionSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions); // use session of current use
    console.log("Session:", session); // Debugging
    // use session to grab ID of current user for ID
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json(); // create request
    console.log("Request Body:", body); // Debugging
    const validation = createSubmissionSchema.safeParse(body); // validates request
        if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails
    // get current student
    const student = await prisma.user.findUnique({ where: { email: session.user.email }, select: { userId: true } });
    console.log("Student:", student); // Debugging

    // if student not found
    if (!student) {
        return NextResponse.json({ error: "Student not found!" }, { status: 404 });
    }

    const deadline = await prisma.deadline.findUnique({ where: { id: body.deadlineId } })
    // if student not found
    if (!deadline) {
        return NextResponse.json({ error: "deadline not found!" }, { status: 404 });
    }

    try {
  const newSubmission = await prisma.submission.create({
    data: {
      deadlineId: deadline.id,
      description: body.description,
      fileURL: body.fileURL,
      userId: student.userId ?? "",
    },
  });
  console.log("New Submission:", newSubmission); // Debugging
  return NextResponse.json(newSubmission, { status: 201 });
} catch (error) {
  console.error("Database Error:", error); // Debugging
  return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
}
}