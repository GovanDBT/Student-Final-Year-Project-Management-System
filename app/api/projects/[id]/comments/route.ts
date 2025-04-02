import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { createCommentSchema } from "../../../../validationSchema";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse and validate the project ID from the route
  const projectId = parseInt(params.id, 10);
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid Project ID" }, { status: 400 });
  }

  // Parse the request body
  const body = await request.json();
  const validation = createCommentSchema.safeParse(body);

  // Validate the request body
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Find the supervisor based on the session email
  const supervisor = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!supervisor?.id) {
    console.log('no super');
    return NextResponse.json({ error: "Supervisor not found or invalid ID" }, { status: 400 });
  }

  // Find the project based on the project ID
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return NextResponse.json({ error: "Invalid Project" }, { status: 404 });
  }

  // Create a new comment
  const newComment = await prisma.comment.create({
    data: {
      comment: body.comment,
      userId: supervisor.id,
      projectId: project.id,
    },
  });

  // Return the newly created comment
  return NextResponse.json(newComment, { status: 201 });
}