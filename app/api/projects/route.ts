import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from 'zod';

// Input Validation
const createProjectSchema =  z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest){
    const body = await request.json(); // create request
    const validation = createProjectSchema.safeParse(body); // validates request
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 }); // if request validation fails

    // if validation is successful, create new project
    const newProject = await prisma.project.create({
        data: { title: body.title, description: body.description }
    });

    // return to client
    return NextResponse.json(newProject, { status:201 })
}