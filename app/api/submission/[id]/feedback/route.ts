import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createFeedbackSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";

// create feedback
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json(); // Parse the request body

  const validation = createFeedbackSchema.safeParse(body); // validate input

  // Validate the request body
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Find the supervisor based on the session email
  const supervisor = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }, // Only fetch the supervisor's ID
  });

  if (!supervisor) {
    return NextResponse.json({ error: "Supervisor does not exist" }, { status: 404 });
  }

  const submission = await prisma.submission.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!submission) {
    return NextResponse.json({ error: "Submission does not exist" }, { status: 404 });
  }

  // Create a new comment
  const newFeedback= await prisma.feedback.create({
    data: {
      title: body.title,
      description: body.description,
      supervisorId: supervisor.id,
      submissionId: submission.id
    }
  });

  // Return the newly created comment
  return NextResponse.json(newFeedback, { status: 201 });
}