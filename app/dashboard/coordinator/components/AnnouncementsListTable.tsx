import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const AnnouncementsListTable = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
    select: { id: true },
  });
  const announcements = await prisma.announcement.findMany({
    where: { coordinatorId: currentUser?.id },
    include: {
      coordinator: true,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

  return (
    <div className="rounded-box border border-base-content/5 bg-base-200">
      <table className="table table-zebra">
        {/* Head */}
        <thead>
          <tr>
            <th>Title</th>
            <th className="hidden md:table-cell">Description</th>
            <th>Author</th>
            <th className="hidden md:table-cell">Date Created</th>
            <th className="hidden md:table-cell">Date Updated</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>
                <Link
                  className="link link-success"
                  href={`/dashboard/coordinator/announcements/${announcement.id}`}
                >
                  {announcement.title}
                </Link>
              </td>
              <td className="hidden md:table-cell">
                {announcement.description.length > 50
                  ? `${announcement.description.slice(0, 50)}...`
                  : announcement.description}
              </td>
              <td>{announcement.coordinator.name}</td>
              <td className="hidden md:table-cell">
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(announcement.dateCreated))}
              </td>
              <td className="hidden md:table-cell">
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(announcement.dateUpdated))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementsListTable;
