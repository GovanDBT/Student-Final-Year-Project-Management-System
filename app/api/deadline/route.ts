import { createDeadlineSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json(); // create request
    const validation = createDeadlineSchema.safeParse(body); // validates request
        if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails
    // looks for coordinator with the give ID
    const coordinator = prisma.user.findUnique({
        where: { id: body.coordinatorId }
    })
    // if coordinator does not exist
    if (!coordinator)
        return NextResponse.json({ error: "Coordinator not found!" }, { status: 404 });
    // if validation is successful, create new project
    const newDeadline = await prisma.deadline.create({
        data: { title: body.title, description: body.description, deadlineDate: body.deadlineDate, coordinatorId: body.coordinatorId }
    });
    // return to client
    return NextResponse.json(newDeadline, { status:201 })
}