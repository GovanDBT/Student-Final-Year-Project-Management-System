import { prisma } from "@/prisma/client";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import notFound from "../../not-found";
import RegisterSupervisorForm from "../../components/RegisterSupervisorForm";

interface Props {
  params: { id: string };
}

const AnnouncementDetailsPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) notFound();

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/admin/supervisors"
            >
              Supervisors
            </Link>
          </li>
          <li>Supervisor Detail</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <h1>Supervisors Details Form</h1>
        <button className="btn btn-primary">
          {" "}
          <IoTrashBin size={18} /> Delete
        </button>
      </div>
      <RegisterSupervisorForm user={user || undefined} />
    </div>
  );
};

export default AnnouncementDetailsPage;
