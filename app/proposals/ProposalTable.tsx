import { prisma } from "@/prisma/client";
import classnames from "classnames";

const ProposalTable = async () => {
  const proposals = await prisma.project.findMany({
    include: {
      student: true,
      supervisor: true,
    },
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Supervisor</th>
            <th>Project Title</th>
            <th>Project Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.student?.name}</td>
              <td>{proposal.studentId}</td>
              <td>{proposal.supervisor?.name}</td>
              <td>{proposal.title}</td>
              <td
                className={classnames({
                  "badge-warning": proposal.status === "PENDING",
                  "badge-success": proposal.status === "APPROVED",
                  "badge-error": proposal.status === "REJECTED",
                  "badge-info": proposal.status === "COMPLETED",
                  "badge badge-soft mt-2 ml-4": true,
                })}
              >
                {proposal.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalTable;
