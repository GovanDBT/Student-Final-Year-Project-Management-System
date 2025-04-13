import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
import { prisma } from "@/prisma/client";

import SubmissionCountdown from "@/app/components/SubmissionCountdown";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">
        👋 Hello {session && <span>{session.user!.name}</span>}
      </h1>
      <div className="flex items-start gap-2 lg:gap-5 my-5">
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
      <div className="grid grid-cols-3 my-5">
        <div className="col-span-2">Project Details</div>
        <div>calendar</div>
        <div className="col-span-2">Announcements</div>
        <div>Activities</div>
      </div>
    </div>
  );
}
