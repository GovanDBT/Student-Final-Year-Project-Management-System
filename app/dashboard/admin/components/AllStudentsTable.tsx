import { prisma } from "@/prisma/client";
import classnames from "classnames";
import Link from "next/link";

const AllStudentsTable = async () => {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
  });

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-5">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th className="hidden md:table-cell">Email</th>
            <th className="hidden lg:table-cell">Phone (+267)</th>
            <th className="hidden lg:table-cell">Programme</th>
            <th className="hidden md:table-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <Link
                  className="link link-success"
                  href={`/dashboard/admin/students/${student.id}`}
                >
                  {student.name}
                </Link>
              </td>
              <td>{student.userId}</td>
              <td className="hidden md:table-cell">{student.email}</td>
              <td className="hidden lg:table-cell">{student.phone}</td>
              <td className="hidden lg:table-cell">{student.programme}</td>
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

export default AllStudentsTable;
