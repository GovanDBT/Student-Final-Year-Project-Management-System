import { prisma } from "@/prisma/client";
import notFound from "../../not-found";
import AnnouncementForm from "../../components/AnnouncementForm";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";

interface Props {
  params: { id: string };
}

const AnnouncementDetailsPage = async ({ params }: Props) => {
  const announcement = await prisma.announcement.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!announcement) notFound();

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/coordinator/announcements"
            >
              Announcements
            </Link>
          </li>
          <li>Announcement Detail</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <h1>Announcement Details Form</h1>
        <button className="btn btn-primary">
          {" "}
          <IoTrashBin size={18} /> Delete
        </button>
      </div>
      <AnnouncementForm announcement={announcement || undefined} />
    </div>
  );
};

export default AnnouncementDetailsPage;
