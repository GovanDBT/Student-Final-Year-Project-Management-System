import { updateAnnouncementSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json();
    const validation = updateAnnouncementSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), {status: 400})

    const announcement = await prisma.announcement.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!announcement)
        return NextResponse.json({error: 'Announcement does not exist'}, {status: 404})

    const updatedAnnouncement = await prisma.announcement.update({ 
        where: { id: announcement.id },
        data: {
            title: body.title,
            description: body.description,
        }
    })

    return NextResponse.json(updatedAnnouncement);
}