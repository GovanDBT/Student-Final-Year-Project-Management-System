import { createDeadlineSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions); // use session of current use
    // use session to grab ID of current user for ID
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json(); // create request
    const validation = createDeadlineSchema.safeParse(body); // validates request
        if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails
    // grabs the current coordinator ID from the session
    const coordinator = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    // if coordinator not found
    if (!coordinator) {
        return NextResponse.json({ error: "Coordinator not found!" }, { status: 404 });
    }
    if (body.isSubmittable === 'true') {
        body.isSubmittable = true;
    } else {
        body.isSubmittable = false
    }
    // if validation is successful, create new project
    const newDeadline = await prisma.deadline.create({
        data: { title: body.title, description: body.description, deadlineDate: body.deadlineDate, coordinatorId: coordinator.id, isSubmittable: body.isSubmittable }
    });
    // return to client
    return NextResponse.json(newDeadline, { status:201 })
}