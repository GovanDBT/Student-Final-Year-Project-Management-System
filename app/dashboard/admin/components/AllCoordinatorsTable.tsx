import { prisma } from "@/prisma/client";
import classnames from "classnames";
import Link from "next/link";

const AllCoordinatorsTable = async () => {
  const coordinator = await prisma.user.findMany({
    where: { role: "COORDINATOR" },
  });

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-5">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Coordinator Name</th>
            <th>Coordinator ID</th>
            <th className="hidden md:table-cell">Email</th>
            <th className="hidden lg:table-cell">Phone</th>
            <th className="hidden lg:table-cell">Office</th>
            <th className="hidden md:table-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {coordinator.map((student) => (
            <tr key={student.id}>
              <td>
                <Link className="link link-success" href={"#"}>
                  {student.name}
                </Link>
              </td>
              <td>{student.userId}</td>
              <td className="hidden md:table-cell">{student.email}</td>
              <td className="hidden lg:table-cell">{student.phone}</td>
              <td className="hidden lg:table-cell">{student.office}</td>
              <td
                className={classnames({
                  "badge-success": student.isActive === true,
                  "badge-error": student.isActive === false,
                  "badge badge-soft mt-2": true,
                })}
              >
                {student.isActive === true ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoordinatorsTable;
