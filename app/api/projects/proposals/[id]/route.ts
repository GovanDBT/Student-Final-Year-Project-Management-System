import { updateProjectSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
    const validation = updateProjectSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), {status: 400})

    const project = await prisma.project.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!project)
        return NextResponse.json({error: 'Invalid Project'}, {status: 404})

    const updatedProject = await prisma.project.update({ 
        where: { id: project.id },
        data: {
            title: body.title,
            description: body.description,
            supervisorId: body.supervisorId
        }
    })

    return NextResponse.json(updatedProject);
}