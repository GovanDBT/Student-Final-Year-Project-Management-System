import { userSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), {status: 400})

    const user = await prisma.user.findUnique({
        where: { id: params.id }
    })

    if (!user)
        return NextResponse.json({error: 'User does not exist'}, {status: 404})

    // concatenate first name with last name
    const fullName = `${body.firstname} ${body.lastname}`;

    const updatedUser= await prisma.user.update({ 
        where: { id: user.id },
        data: {
            userId: body.userId, name: fullName, email: body.email, password: body.password, phone: body.phone, office: body.office, role: body.role
        }
    })

    return NextResponse.json(updatedUser);
}