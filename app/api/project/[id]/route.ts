import { projectSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface Props {
    params: { id: string };
}

// update project
export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json();
    const validation = projectSchema.safeParse(body);
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

// export async function PATCH(request: NextRequest, {params}: Props) {
//     const body = await request.json();
//     const validation = updateProjectSchema.safeParse(body);
//     if (!validation.success) 
//         return NextResponse.json(validation.error.format(), {status: 400})

//     const project = await prisma.project.findUnique({
//         where: { id: parseInt(params.id) }
//     })

//     if (!project)
//         return NextResponse.json({ error: 'Invalid Project' }, {status: 404})

//     const updatedProject = await prisma.project.update({
//         where: { id: project.id },
//         data: {
//             title: body.title,
//             description: body.description,
//             status: body.status
//         }
//     });

//     return NextResponse.json(updatedProject);
// }

// export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
//   const session = await getServerSession(authOptions);

//   // Check if the user is authenticated
//   if (!session || !session.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // Parse the request body
//   const body = await request.json();
//   const validation = createCommentSchema.safeParse(body);

//   // Validate the request body
//   if (!validation.success) {
//     console.log('validation error', validation.error.format())
//     return NextResponse.json(validation.error.format(), { status: 400 });
//   }

//   // Find the supervisor based on the session email
//   const supervisor = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     select: { id: true }, // Only fetch the supervisor's ID
//   });

//   if (!supervisor) {
//     return NextResponse.json({ error: "Supervisor not found" }, { status: 404 });
//   }

//   // Find the project based on the project ID
//   const project = await prisma.project.findUnique({
//     where: { id: parseInt(params.id, 10) },
//   });

//   if (!project) {
//     return NextResponse.json({ error: "Project not found" }, { status: 404 });
//   }

//   // Create a new comment
//   const newComment = await prisma.comment.create({
//     data: {
//       comment: body.comment,
//       userId: supervisor.id,
//       projectId: project.id
//     }
//   });

//   // Return the newly created comment
//   return NextResponse.json(newComment, { status: 201 });
// }