import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import classnames from "classnames";

const SubmissionTable = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
    select: { userId: true },
  });
  const submissions = await prisma.submission.findMany({
    where: {
      userId: currentUser?.userId ?? undefined,
    },
    include: {
      deadline: true,
    },
    orderBy: {
      dateSubmitted: "desc",
    },
  });
  return (
    <div className="rounded-box border border-base-content/5 bg-base-200 mb-10">
      <table className="table table-auto table-zebra">
        {/* Head */}
        <thead>
          <tr>
            <th>Submission Type</th>
            <th className="hidden lg:table-cell">Description</th>
            <th>File URL</th>
            <th className="hidden lg:table-cell">Date Submitted</th>
            <th className="hidden lg:table-cell">Status</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.deadline?.title}</td>
              <td className="hidden lg:table-cell">{sub.description}</td>
              <td className="break-words max-w-xs">
                <a
                  href={sub.fileURL}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {sub.fileURL}
                </a>
              </td>
              <td className="hidden lg:table-cell">
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(sub.dateSubmitted))}
              </td>
              <td
                className={classnames({
                  "badge-warning": sub.status === "Late",
                  "badge-success": sub.status === "On Time",
                  "badge badge-soft hidden md:badge mt-2 ml-4 text-nowrap":
                    true,
                })}
              >
                {sub.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
