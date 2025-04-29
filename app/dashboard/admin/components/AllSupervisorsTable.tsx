import { prisma } from "@/prisma/client";
import classnames from "classnames";
import Link from "next/link";

const AllSupervisorTable = async () => {
  const supervisor = await prisma.user.findMany({
    where: { role: "SUPERVISOR" },
  });

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-5">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Supervisor Name</th>
            <th>Supervisor ID</th>
            <th className="hidden md:table-cell">Email</th>
            <th className="hidden lg:table-cell">Phone (+267)</th>
            <th className="hidden lg:table-cell">Office</th>
            <th className="hidden md:table-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {supervisor.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  className="link link-success"
                  href={`/dashboard/admin/supervisors/${user.id}`}
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.userId}</td>
              <td className="hidden md:table-cell">{user.email}</td>
              <td className="hidden lg:table-cell">{user.phone}</td>
              <td className="hidden lg:table-cell">{user.office}</td>
              <td
                className={classnames({
                  "badge-success": user.isActive === true,
                  "badge-error": user.isActive === false,
                  "badge badge-soft mt-2": true,
                })}
              >
                {user.isActive === true ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSupervisorTable;
