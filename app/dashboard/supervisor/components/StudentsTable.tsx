import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import classnames from "classnames";
import Link from "next/link";

const StudentsTable = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
    select: { id: true },
  });
  const projects = await prisma.project.findMany({
    where: {
      supervisorId: currentUser?.id,
    },
    include: {
      student: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-5">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Student Name</th>
            <th className="hidden md:table-cell">Student ID</th>
            <th className="hidden md:table-cell">Date Submitted</th>
            <th className="hidden md:table-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link
                  className="link link-success"
                  href={`/dashboard/supervisor/projects/${project.id}`}
                >
                  {project.title}
                </Link>
                <div
                  className={classnames({
                    "badge-warning": project.status === "PENDING",
                    "badge-success": project.status === "APPROVED",
                    "badge-error": project.status === "REJECTED",
                    "badge-info": project.status === "COMPLETED",
                    "badge badge-soft badge-xs mt-2 block md:hidden": true,
                  })}
                >
                  {project.status}
                </div>
              </td>
              <td>{project.student?.name}</td>
              <td className="hidden md:table-cell">{project.studentId}</td>
              <td className="hidden md:table-cell">
                {project.dateCreated.toLocaleDateString()}
              </td>
              <td
                className={classnames({
                  "badge-warning": project.status === "PENDING",
                  "badge-success": project.status === "APPROVED",
                  "badge-error": project.status === "REJECTED",
                  "badge-info": project.status === "COMPLETED",
                  "badge badge-soft hidden md:badge mt-2 ml-4 ": true,
                })}
              >
                {project.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
