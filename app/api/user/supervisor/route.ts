import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createUserSchema } from "@/app/validationSchema";

// POST /api/users - creates a new user
export async function POST(request: NextRequest){
    const body = await request.json(); // create request
    const validation = createUserSchema.safeParse(body); // validates request
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails
    // validate existing student ID
    if (body.userId) {
        const user = await prisma.user.findUnique({ where: { userId: body.userId } });
        if (user) return NextResponse.json({ error: 'Supervisor ID already exists!' }, {status: 400});
    }
    // validate existing student email
    if (body.email) {
        const email = await prisma.user.findUnique({ where: { email: body.email } });
        if (email) return NextResponse.json({ error: 'Email already exists!' }, {status: 400});
    }
    // validate existing phone number
    if (body.phone) {
        const phone = await prisma.user.findUnique({ where: { phone: body.phone } });
        if (phone) return NextResponse.json({ error: 'Phone Number already exists!' }, {status: 400});
    }
    // validate existing office number
    if (body.office) {
        const office = await prisma.user.findFirst({ where: { office: body.office } });
        if (office) return NextResponse.json({ error: 'Office number is already taken!' }, {status: 400});
    }
    // concatenate first name with last name
    const fullName = `${body.firstname} ${body.lastname}`;
    // compare passwords
    if (body.password != body.confirmPassword) {
        return NextResponse.json({ error: 'Passwords do not Match!' }, { status: 400 });
    }
    // if validation is successful, create new project
    const newUser = await prisma.user.create({
        data: { userId: body.userId, name: fullName, email: body.email, password: body.password, phone: body.phone, office: body.office, role: body.role }
    });
    // return to client
    return NextResponse.json(newUser, { status:201 })
}