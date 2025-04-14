import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const ProjectSupervisorPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUserId = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
    select: { userId: true },
  });

  const project = await prisma.project.findUnique({
    where: { studentId: currentUserId?.userId ?? undefined },
    include: {
      supervisor: true,
    },
  });

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link className="link link-success" href="/dashboard/student">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/student/project"
            >
              Project ID: {project?.id}
            </Link>
          </li>
          <li>Supervisor: {project?.supervisor.name}</li>
        </ul>
      </div>
      <div>
        <h1 className="text-5xl">{project?.supervisor.name}</h1>
        <div className="divider my-2"></div>
        <p>
          <span className="font-bold">Email:</span> {project?.supervisor.email}
        </p>
        <div className="divider my-2"></div>
        <p>
          <span className="font-bold">Phone:</span> {project?.supervisor.phone}
        </p>
        <div className="divider my-2"></div>
        <p>
          <span className="font-bold">Office:</span>{" "}
          {project?.supervisor.office}
        </p>
        <div className="divider my-2"></div>
        <p>
          <span className="font-bold">Role:</span> {project?.supervisor.role}
        </p>
        <div className="divider my-2"></div>
      </div>
    </div>
  );
};

export default ProjectSupervisorPage;
