import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// update project status
export async function PATCH(request: NextRequest, {params}: { params: { id: string } }) {
    const body = await request.json();

    const project = await prisma.project.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!project)
        return NextResponse.json({ error: 'Project does not exist' }, {status: 404})

    const updatedProjectStatus = await prisma.project.update({
        where: { id: project.id },
        data: {
            status: body.status
        }
    });

    return NextResponse.json(updatedProjectStatus);
}