import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import classnames from "classnames";

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
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.student?.name}</td>
              <td>{project.studentId}</td>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.dateCreated.toLocaleDateString()}</td>
              <td
                className={classnames({
                  "badge-warning": project.status === "PENDING",
                  "badge-success": project.status === "APPROVED",
                  "badge-error": project.status === "REJECTED",
                  "badge-info": project.status === "COMPLETED",
                  "badge badge-soft mt-2 ml-4": true,
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
