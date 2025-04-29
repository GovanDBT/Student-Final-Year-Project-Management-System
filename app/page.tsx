import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import DeadlineCard from "./components/DeadlineCard";
import Announcement from "./components/Announcement";
import { prisma } from "@/prisma/client";

export default async function Home() {
  const announcements = await prisma.announcement.findMany({
    include: {
      coordinator: true,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

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
    <>
      <NavBar />
      <div className="grid grid-rows-auto gap-5 lg:grid-cols-[2fr_4fr] content-stretch container mx-auto">
        <LoginForm />
        <div>
          <h1 className="mb-6 divider divider-start">
            2025 Final Year Project Management System
          </h1>
          <div className="flex items-start gap-2 lg:gap-5 mb-8">
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
          <h1 className="mb-6 divider divider-start">Announcement</h1>
          <div className="max-h-110 overflow-scroll p-3 border-1 border-secondary/10 rounded-lg">
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
      </div>
    </>
  );
}
