import { prisma } from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import ResponseModal from "../../../components/ResponseModal";
import CommentsCard from "../../../../components/CommentsCard";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      student: {
        select: {
          name: true,
          email: true,
          phone: true,
          programme: true,
          userId: true,
        },
      },
    },
  });
  if (!project) return notFound();

  const comments = await prisma.comment.findMany({
    where: { userId: project.supervisorId },
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
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link className="link link-success" href="/dashboard/coordinator">
              Dashboard
            </Link>
          </li>
          <li>Project ID: {project.id}</li>
        </ul>
      </div>
      {/* Headers */}
      <div className="flex justify-between">
        <h1 className="text-5xl">
          {project.title}{" "}
          <span className="btn text-sm italic">
            by: {project.student?.name}
          </span>
        </h1>
        <ResponseModal
          projectId={project.id}
          author={project.student?.name ?? ""}
        />
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
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div>
          <div className="prose card bg-base-200 shadow-sm p-5 border-1 border-white/10 max-w-none mb-5">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </div>
        <div>
          <p>
            <span className="font-bold">Student ID:</span>{" "}
            {project.student?.userId}
          </p>
          <div className="divider my-1"></div>
          <p>
            <span className="font-bold">Student Email:</span>{" "}
            {project.student?.email}
          </p>
          <div className="divider my-1"></div>
          <p>
            <span className="font-bold">Phone Number:</span>{" "}
            {project.student?.phone}
          </p>
          <div className="divider my-1"></div>
          <p>
            <span className="font-bold">Programme:</span>{" "}
            {project.student?.programme}
          </p>
          <div className="divider my-1"></div>
          <p>
            <span className="font-bold">Date Created:</span>{" "}
            {new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(project.dateCreated))}
          </p>
          <div className="divider my-1"></div>
          <p>
            <span className="font-bold">Last Update:</span>{" "}
            {new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(
              project.dateUpdated ? new Date(project.dateUpdated) : new Date()
            )}
          </p>
        </div>
      </div>
      {/* Comments */}
      <div className="space-y-3">
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
  );
};

export default ProjectDetailsPage;
