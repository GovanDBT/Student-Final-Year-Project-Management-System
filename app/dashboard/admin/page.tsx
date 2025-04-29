import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import StatsCard from "./components/StatsCard";
import { prisma } from "@/prisma/client";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const student = await prisma.user.findMany({ where: { role: "STUDENT" } });
  const supervisor = await prisma.user.findMany({
    where: { role: "SUPERVISOR" },
  });
  const coordinator = await prisma.user.findMany({
    where: { role: "COORDINATOR" },
  });
  // Fetch the total number of projects
  const totalProjects = await prisma.project.count();
  const totalStudents = student.length;
  const totalSupervisors = supervisor.length + coordinator.length;
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl mb-5">
        👋 Hello {session && <span>{session.user!.name} (Admin)</span>}
      </h1>
      <div className="divider "></div>
      <div>
        <div className="mb-4 flex gap-x-10">
          <StatsCard
            title="Registered Students"
            count={totalStudents}
            link="#"
          />
          <StatsCard
            title="Supervisors + Coordinators"
            count={totalSupervisors}
            link="#"
          />
          <StatsCard
            title="Submitted Projects"
            count={totalProjects}
            link="#"
          />
        </div>
        <h2>My Students Projects:</h2>
      </div>
    </div>
  );
}
