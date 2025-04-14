import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import StudentsTable from "../components/StudentsTable";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl mb-5">
        👋 Hello {session && <span>{session.user!.name} (Coordinator)</span>}
      </h1>
      <div>
        <h1 className="divider divider-start">My Students</h1>
        <StudentsTable />
      </div>
    </div>
  );
}
