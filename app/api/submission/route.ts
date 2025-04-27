import { createSubmissionSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    // const session = await getServerSession(authOptions); // use session of current use
    // // use session to grab ID of current user for ID
    // if (!session || !session.user?.email) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const body = await request.json(); // create request
    const validation = createSubmissionSchema.safeParse(body); // validates request
        if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails
    // // grabs the current coordinator ID from the session
    // const coordinator = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    // // if coordinator not found
    // if (!coordinator) {
    //     return NextResponse.json({ error: "Coordinator not found!" }, { status: 404 });
    // }
    
    const project = await prisma.project.findUnique({
        where: { id: body.projectId }
    });

    if (!project) {
        return NextResponse.json({ error: "Project not found!" }, { status: 404 });
    }

    // if validation is successful, create new submission
    const newSubmission = await prisma.submission.create({
        data: { title: body.title, description: body.description, fileURL: body.fileURL, projectId: body.projectId }
    });
    // return to client
    return NextResponse.json(newSubmission, { status:201 })
}