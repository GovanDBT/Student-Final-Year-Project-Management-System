import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>This is a Dashboard</p>
      {session && <p>{session.user!.name}</p>}
      <Link href="/api/auth/signout">Sign out</Link>
    </div>
  );
}
