import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
import { prisma } from "@/prisma/client";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">
        👋 Hello {session && <span>{session.user!.name}</span>}
      </h1>
      <div>
        <p>This is a coordinator dashboard page</p>
      </div>
    </div>
  );
}
