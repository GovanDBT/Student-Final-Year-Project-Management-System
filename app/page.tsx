import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SubmissionCountdown from "./components/SubmissionCountdown";
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
  return (
    <>
      <NavBar />
      <div className="grid grid-rows-auto gap-5 lg:grid-cols-3 content-stretch container mx-auto">
        <LoginForm />
        <div className="lg:col-span-2">
          <h1 className="mb-6 divider divider-start">
            2025 Final Year Project Management System
          </h1>
          <div className="flex items-start gap-2 lg:gap-5 mb-8">
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
          </div>
          <h1 className="mb-6 divider divider-start">Announcement</h1>
          <div className="max-h-110 overflow-scroll p-3 border-1 border-secondary/10 rounded-lg">
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
      </div>
    </>
  );
}
