import { prisma } from "@/prisma/client";
import Link from "next/link";
import React from "react";

const DeadlinesTable = async () => {
  const deadlines = await prisma.deadline.findMany({
    include: {
      coordinator: true,
    },
  });
  return (
    <div className="rounded-box border border-base-content/5 bg-base-200">
      <table className="table table-zebra">
        {/* Head */}
        <thead>
          <tr>
            <th>Title</th>
            <th className="hidden lg:table-cell">Created By</th>
            <th>Deadline</th>
            <th>Submissions</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {deadlines.map((deadline) => (
            <tr key={deadline.id}>
              <td>
                <Link
                  className="link link-success"
                  href={`/dashboard/coordinator/announcements/${deadline.id}`}
                >
                  {deadline.title}
                </Link>
              </td>
              <td className="hidden lg:table-cell">
                {deadline.coordinator.name}
              </td>
              <td>
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(deadline.deadlineDate))}
              </td>
              <td>50%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeadlinesTable;
