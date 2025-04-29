import { prisma } from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import classnames from "classnames";

interface Props {
  params: { id: string };
}

const StudentDetailsPage = async ({ params }: Props) => {
  // get student
  const student = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      project: true,
    },
  });

  const project = await prisma.project.findUnique({
    where: { studentId: student?.userId ?? undefined },
    include: {
      supervisor: true,
    },
  });

  // if student doesn't exist
  if (!student) return notFound();
  return (
    <div className="container mx-auto">
      {/** Breadcrumb */}
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/admin/students"
            >
              Registered Students
            </Link>
          </li>
          <li>{student.name}</li>
        </ul>
      </div>
      {/** Student name and status */}
      <div>
        <div className="flex justify-between">
          <h1 className="text-5xl">{student.name}</h1>
          <div className="space-x-10">
            <button className="btn btn-primary">Delete Student</button>
            <button className="btn btn-warning text-base-200">
              Change Status
            </button>
          </div>
        </div>
      </div>
      <div className="divider mt-1"></div>
      {/** Student personal details */}
      <div className="card bg-base-200 px-5 py-8 mb-5">
        <div>
          <h3 className="mb-8 font-black text-xl">Personal Information</h3>
          <div className="grid md:grid-cols-2 space-y-5">
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Student Name:
                </span>{" "}
                {student.name ? student.name : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Student ID:
                </span>{" "}
                {student.userId ? student.userId : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Programme:
                </span>{" "}
                {student.programme ? student.programme : "N/A"}
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Email:
                </span>{" "}
                {student.email ? student.email : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Phone:
                </span>{" "}
                (+267) {student.phone ? student.phone : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Status:
                </span>{" "}
                <span
                  className={classnames({
                    "badge-success": student.isActive === true,
                    "badge-error": student.isActive === false,
                    "badge badge-soft text-lg": true,
                  })}
                >
                  {student.isActive === true ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/** Student project details */}
      <div className="card bg-base-200 px-5 py-8 mb-8">
        <div>
          <h3 className="mb-8 font-black text-xl">Project Information</h3>
          <div className="grid md:grid-cols-2 space-y-5">
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Project Title:
                </span>{" "}
                {student.project?.title ? student.project?.title : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Date Created:
                </span>{" "}
                {student.project?.dateCreated
                  ? student.project?.dateCreated.toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Supervisor:
                </span>{" "}
                {project?.supervisor.name ? project?.supervisor.name : "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-400 block text-[16px]">
                  Project Status:
                </span>{" "}
                <span
                  className={classnames({
                    "badge-warning": project?.status === "PENDING",
                    "badge-success": project?.status === "APPROVED",
                    "badge-error": project?.status === "REJECTED",
                    "badge-info": project?.status === "COMPLETED",
                    "badge badge-soft": true,
                  })}
                >
                  {project?.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
