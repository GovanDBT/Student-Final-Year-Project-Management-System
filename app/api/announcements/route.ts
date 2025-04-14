import { createAnnouncementSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json(); // create request
    const validation = createAnnouncementSchema.safeParse(body); // validates request
        if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails
    // grabs the current coordinator ID from the session
    const coordinator = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    // if coordinator not found
    if (!coordinator) {
        return NextResponse.json({ error: "Coordinator not found!" }, { status: 404 });
    }
    // if validation is successful, create new project
    const newAnnouncement = await prisma.announcement.create({
        data: { title: body.title, description: body.description, coordinatorId: coordinator.id }
    });
    // return to client
    return NextResponse.json(newAnnouncement, { status:201 })
}