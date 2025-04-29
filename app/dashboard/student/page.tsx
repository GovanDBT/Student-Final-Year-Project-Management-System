import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import classnames from "classnames";

import DeadlineCard from "@/app/components/DeadlineCard";
import Announcement from "@/app/components/Announcement";
import Calendar from "@/app/components/Calendar";
import Link from "next/link";
import ActivityCard from "./components/ActivityCard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const currentUserId = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
    select: { userId: true },
  });

  // find project
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

  // get all announcements
  const announcements = await prisma.announcement.findMany({
    include: {
      coordinator: true,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

  // get all deadlines
  const deadlines = await prisma.deadline.findMany();

  // Get the current date
  const now = new Date();

  // Find the closest and furthest deadlines
  const sortedDeadlines = deadlines.sort(
    (a, b) =>
      new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime()
  );

  const closestDeadline = sortedDeadlines.find(
    (deadline) => new Date(deadline.deadlineDate) > now
  );

  const furthestDeadline = sortedDeadlines[sortedDeadlines.length - 1];

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">
        👋 Hello {session && <span>{session.user!.name}</span>}
      </h1>
      <div className="md:flex items-start gap-2 lg:gap-5 my-5">
        {closestDeadline && (
          <DeadlineCard
            title={
              closestDeadline.description?.toString() ||
              "No description available"
            }
            date={closestDeadline.deadlineDate.toDateString()}
            days={Math.ceil(
              (new Date(closestDeadline.deadlineDate).getTime() -
                now.getTime()) /
                (1000 * 60 * 60 * 24)
            )}
            desc={closestDeadline.description?.toString()}
          />
        )}
        {furthestDeadline && (
          <DeadlineCard
            title={
              furthestDeadline.description?.toString() ||
              "No description available"
            }
            date={furthestDeadline.deadlineDate.toDateString()}
            days={Math.ceil(
              (new Date(furthestDeadline.deadlineDate).getTime() -
                now.getTime()) /
                (1000 * 60 * 60 * 24)
            )}
            desc={furthestDeadline.description?.toString()}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 my-5">
        {/** Project Overview */}
        <div>
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
            <div className="grid md:grid-cols-2 gap-x-2">
              <div className="space-y-10">
                <p>
                  <span className="font-bold">Project Title:</span>{" "}
                  {project?.title}
                </p>
                <p>
                  <span className="font-bold">Project Supervisor:</span>{" "}
                  {project?.supervisor.name}
                </p>
              </div>
              <div className="space-y-10">
                <div>
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
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(project.dateCreated))}
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
          <Calendar />
        </div>
        {/** Announcements */}
        <div>
          <div className="divider divider-start mb-8">
            <h2>Announcements</h2>
          </div>
          <div className="max-h-105 overflow-scroll p-3 border-1 border-secondary/10 rounded-lg">
            {announcements && announcements.length > 1 ? (
              announcements.map((announcement) => (
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
              ))
            ) : (
              <p className="text-center mt-4">No Announcements.</p>
            )}
          </div>
        </div>
        {/** Activities */}
        <div>
          <div className="divider divider-start mb-8">
            <h2>Activities</h2>
          </div>
          <div className="max-h-105 overflow-scroll p-3 border-1 border-secondary/10 rounded-lg">
            {deadlines && deadlines.length > 0 ? (
              deadlines.map((d) => (
                <ActivityCard
                  key={d.id}
                  title={d.title}
                  date={d.deadlineDate.toLocaleDateString()}
                />
              ))
            ) : (
              <p>No Activities Set</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
