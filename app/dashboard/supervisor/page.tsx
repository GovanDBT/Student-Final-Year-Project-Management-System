import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import StudentsTable from "./components/StudentsTable";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">
        👋 Hello {session && <span>{session.user!.name}</span>}
      </h1>
      <div className="divider mt-2 mb-6"></div>
      <div>
        <h2>My Students Projects:</h2>
        <StudentsTable />
      </div>
    </div>
  );
}
