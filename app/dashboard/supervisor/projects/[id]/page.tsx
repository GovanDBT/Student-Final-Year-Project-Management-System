import { prisma } from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import CommentModal from "../../../components/CommentModal";
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
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link className="link link-success" href="/dashboard/supervisor">
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
        <CommentModal
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
      <p>
        <span className="font-bold">Student ID:</span> {project.student?.userId}
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
        {project.dateCreated.toLocaleDateString()}
      </p>
      <div className="divider my-1"></div>
      <p>
        <span className="font-bold">Last Update:</span>{" "}
        {project.dateUpdated?.toLocaleDateString()}
      </p>
      <div className="divider my-1"></div>
      <p className="font-bold mt-4 mb-1">Project Description:</p>
      <div className="prose card bg-base-200 shadow-sm p-5 border-1 border-white/10 max-w-none mb-5">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>
      <div className="my-10 space-y-3">
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
