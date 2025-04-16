import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import StudentsTable from "./components/StudentsTable";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl mb-5">
        👋 Hello {session && <span>{session.user!.name} (Coordinator)</span>}
      </h1>
      <div>
        <h2 className="divider divider-start">My Students</h2>
        <StudentsTable />
      </div>
    </div>
  );
}
