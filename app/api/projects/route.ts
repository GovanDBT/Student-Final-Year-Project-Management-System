import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createProjectSchema } from "../../validationSchema";

export async function POST(request: NextRequest){
    const body = await request.json(); // create request
    const validation = createProjectSchema.safeParse(body); // validates request
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails

    // if validation is successful, create new project
    const newProject = await prisma.project.create({
        data: { title: body.title, description: body.description }
    });

    // return to client
    return NextResponse.json(newProject, { status:201 })
}