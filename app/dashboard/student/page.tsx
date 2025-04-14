import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import classnames from "classnames";

import SubmissionCountdown from "@/app/components/SubmissionCountdown";
import Announcement from "@/app/components/Announcement";
import Link from "next/link";

export default async function Dashboard() {
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

  const announcements = await prisma.announcement.findMany({
    include: {
      coordinator: true,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">
        👋 Hello {session && <span>{session.user!.name}</span>}
      </h1>
      <div className="md:flex items-start gap-2 lg:gap-5 my-5">
        <SubmissionCountdown
          title="Days till next submission"
          days={11}
          desc="Project proposal - documentation of introduction, literature review, and system analysis"
        />
        <SubmissionCountdown
          title="Days till final year presentation"
          days={45}
          desc="Presentation of project - including presentation slides, documentation, and implementation"
        />
        <SubmissionCountdown
          title="Days till final year presentation"
          days={45}
          desc="Presentation of project - including presentation slides, documentation, and implementation"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        {/** Project Overview */}
        <div className="col-span-2">
          <div className="divider divider-start mb-8">
            <h2>Project Overview</h2>
          </div>
          {!project?.studentId && (
            <div className="h-50 bg-base-200 rounded-lg p-5 place-items-center content-center space-y-5">
              <h1>You Do Not Have A Project Proposal!</h1>
              <button className="btn btn-primary">
                <Link href="/dashboard/student/project/proposal">
                  Create Proposal
                </Link>
              </button>
            </div>
          )}
          {project?.studentId && (
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-5">
                <p>
                  <span className="font-bold">Project Title:</span>{" "}
                  {project?.title}
                </p>
                <p>
                  <span className="font-bold">Project Supervisor:</span>{" "}
                  {project?.supervisor.name}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-10 mt-2 mb-5">
                  <p>
                    <span className="font-bold">Project Status:</span>{" "}
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
                <p>
                  <span className="font-bold">Last Update:</span>{" "}
                  {project?.dateUpdated?.toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
        {/** Calendar */}
        <div>
          <div className="divider divider-start mb-8">
            <h2>Calendar</h2>
          </div>
        </div>
        {/** Announcements */}
        <div className="col-span-2">
          <div className="divider divider-start mb-8">
            <h2>Announcements</h2>
          </div>
          <div className="max-h-105 overflow-scroll p-3 border-1 border-secondary/10 rounded-lg">
            {announcements.map((announcement) => (
              <Announcement
                key={announcement.id}
                title={announcement.title}
                date={new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(announcement.dateCreated))}
                author={announcement.coordinator.name ?? ""}
                role={announcement.coordinator.role ?? ""}
                description={announcement.description}
              />
            ))}
          </div>
        </div>
        {/** Activities */}
        <div>
          <div className="divider divider-start mb-8">
            <h2>Activities</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
