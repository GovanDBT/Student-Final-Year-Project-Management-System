import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { projectSchema } from "../../validationSchema";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest){
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json(); // create request
    const validation = projectSchema.safeParse(body); // validates request
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 }); // if request validation fails

    if (body.supervisorId) {
        const user = await prisma.user.findUnique({ where: { id: body.supervisorId } });
        if (!user) return NextResponse.json({ error: 'Invalid user!' }, {status: 400});
    }

    const student = await prisma.user.findUnique({ where: { email: session.user.email }, select: { userId: true } });

    if (!student?.userId) {
        return NextResponse.json({ error: "Student not found or invalid userId" }, { status: 400 });
    }

    // if validation is successful, create new project
    const newProject = await prisma.project.create({
        data: { title: body.title, description: body.description, supervisorId: body.supervisorId, studentId: student.userId }
    });

    // return to client
    return NextResponse.json(newProject, { status:201 })
}