import { updateDeadlineSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json();
    const validation = updateDeadlineSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), {status: 400})

    const deadline = await prisma.deadline.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!deadline)
        return NextResponse.json({error: 'Deadline does not exist'}, {status: 404})

    if (body.isSubmittable === 'true') {
        body.isSubmittable = true;
    } else {
        body.isSubmittable = false
    }

    const updatedDeadline = await prisma.deadline.update({ 
        where: { id: deadline.id },
        data: {
            title: body.title,
            description: body.description,
            deadlineDate: body.deadlineDate,
            isSubmittable: body.isSubmittable
        }
    })

    return NextResponse.json(updatedDeadline);
}