import { prisma } from "@/prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import CommentsCard from "@/app/components/CommentsCard";

export default async function ProjectPage() {
  const session = await getServerSession(authOptions);
  const currentUserId = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
    select: { userId: true },
  });

  const project = await prisma.project.findUnique({
    where: { studentId: currentUserId?.userId ?? undefined },
    include: {
      supervisor: {
        select: {
          name: true,
        },
      },
      student: true,
    },
  });

  const comments = await prisma.comment.findMany({
    where: { userId: project?.supervisorId },
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: {
      dateCreated: "desc",
    },
  });
  return (
    <div className="container mx-auto">
      {!project?.studentId && (
        <div>
          <div
            role="alert"
            className="alert alert-vertical sm:alert-horizontal mb-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>You do not have a project proposal</span>
            <div>
              <Link
                href="/dashboard/student/project/proposal"
                className="btn btn-sm btn-primary"
              >
                Submit Proposal
              </Link>
            </div>
          </div>
          <h1 className="text-center">NO PROJECT YET</h1>
        </div>
      )}
      {project?.studentId && (
        <div>
          <div className="breadcrumbs text-sm mb-2">
            <ul>
              <li>
                <Link className="link link-success" href="/dashboard/student">
                  Dashboard
                </Link>
              </li>
              <li>Project ID: {project.id}</li>
            </ul>
          </div>
          <div className="flex justify-between">
            <h1 className="text-5xl">
              {project.title}{" "}
              <span className="btn text-sm italic">
                by: {project.student?.name}
              </span>
            </h1>
            <button className="btn btn-primary">
              <Link href={`./project/proposal/${project.id}/edit`}>
                Update Project
              </Link>
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-10 mt-2 mb-5">
              <p
                className={classnames({
                  "badge-warning": project.status === "PENDING",
                  "badge-success": project.status === "APPROVED",
                  "badge-error": project.status === "REJECTED",
                  "badge-info": project.status === "COMPLETED",
                  "badge badge-soft": true,
                })}
              >
                {project.status}
              </p>
            </div>
            <p className="font-bold mt-2">{comments.length} comments</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h3 className="font-bold mb-3">Project Description:</h3>
              <div className="prose card bg-base-200 shadow-sm p-5 border-1 border-white/10 max-w-none mb-5">
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3">Project Details:</h3>
              <div>
                <span className="font-bold">Supervisor:</span>{" "}
                <Link href="#" className="link link-success">
                  {project.supervisor.name}
                </Link>
              </div>
              <div className="divider my-5"></div>
              <p>
                <span className="font-bold">Student ID:</span>{" "}
                {project.student?.userId}
              </p>
              <div className="divider my-5"></div>
              <p>
                <span className="font-bold">Student Email:</span>{" "}
                {project.student?.email}
              </p>
              <div className="divider my-5"></div>
              <p>
                <span className="font-bold">Phone Number:</span>{" "}
                {project.student?.phone}
              </p>
              <div className="divider my-5"></div>
              <p>
                <span className="font-bold">Programme:</span>{" "}
                {project.student?.programme}
              </p>
              <div className="divider my-5"></div>
              <p>
                <span className="font-bold">Date Created:</span>{" "}
                {project.dateCreated.toLocaleDateString()}
              </p>
              <div className="divider my-5"></div>
              <p>
                <span className="font-bold">Last Update:</span>{" "}
                {project.dateUpdated?.toLocaleDateString()}
              </p>
              <div className="divider my-5"></div>
            </div>
          </div>
          <div className="my-5 space-y-3">
            <p className="font-bold mb-2">Comments:</p>
            {comments.map((comment) => (
              <CommentsCard
                key={comment.id}
                author={comment.user?.name ?? ""}
                date={comment.dateCreated.toLocaleDateString()}
                description={comment.comment ?? ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ProjectPage;
