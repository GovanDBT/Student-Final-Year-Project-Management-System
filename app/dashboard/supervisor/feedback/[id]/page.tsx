import notFound from "@/app/dashboard/supervisor/not-found";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import classnames from "classnames";
import FeedbackModal from "@/app/dashboard/components/FeedbackModal";
import FeedbackCard from "@/app/components/FeedbackCard";

interface Props {
  params: { id: string };
}

const SubmissionDetails = async ({ params }: Props) => {
  const submission = await prisma.submission.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      user: true,
      deadline: true,
    },
  });
  if (!submission) return notFound();

  const feedbacks = await prisma.feedback.findMany({
    where: { submissionId: parseInt(params.id) },
    include: {
      supervisor: true,
    },
    orderBy: {
      dateSubmitted: "desc",
    },
  });

  return (
    <div className="container mx-auto">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/supervisor/feedback"
            >
              Submissions
            </Link>
          </li>
          <li>Submission ID: {submission.id}</li>
        </ul>
      </div>
      {/* Headers */}
      <div className="md:flex justify-between">
        <h1 className="text-5xl">{submission.deadline.title} Submission</h1>
        {/* Buttons */}
        <div className="flex justify-between md:space-x-10 my-4 md:my-0">
          <FeedbackModal
            author={submission.user.name ?? "Unknown"}
            submissionId={submission.id}
          />
        </div>
      </div>
      <div className="divider"></div>
      {/* Content */}
      <div className="mb-6">
        <p className="mb-0">
          <span className="font-bold">Student Name:</span>{" "}
          {submission.user.name}
        </p>
        <div className="divider my-2"></div>
        <p className="mb-0">
          <span className="font-bold">Student ID:</span>{" "}
          {submission.user.userId}
        </p>
        <div className="divider my-2"></div>
        <p className="mb-0">
          <span className="font-bold">File URL:</span>{" "}
          <a
            href={submission.fileURL}
            className="text-blue-500 underline"
            target="_blank"
          >
            {submission.fileURL}
          </a>
        </p>
        <div className="divider my-2"></div>
        <p className="mb-0">
          <span className="font-bold">Description:</span>{" "}
          {submission.description ? submission.description : "None"}
        </p>
        <div className="divider my-2"></div>
        <p className="mb-0">
          <span className="font-bold">Date Submitted:</span>{" "}
          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date(submission.dateSubmitted))}
        </p>
        <div className="divider my-2"></div>
        <p className="mb-0">
          <span className="font-bold">Deadline:</span>{" "}
          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date(submission.deadline.deadlineDate))}
        </p>
        <div className="divider my-2"></div>
        <p className="mb-0">
          <span className="font-bold">Submission Status:</span>{" "}
          <span
            className={classnames({
              "badge-warning": submission.status === "Late",
              "badge-success": submission.status === "On Time",
              "badge badge-soft ml-2 font-bold": true,
            })}
          >
            {submission.status}
          </span>
        </p>
        <div className="divider my-2"></div>
      </div>
      {/* Feedbacks */}
      <div className="space-y-3">
        <h2 className="font-bold mb-5">Submission Feedbacks</h2>
        {feedbacks.map((feed) => (
          <FeedbackCard
            key={feed.id}
            title={feed.title}
            author={feed.supervisor.name ?? "Unknown"}
            date={feed.dateSubmitted.toLocaleDateString()}
            description={feed.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SubmissionDetails;
