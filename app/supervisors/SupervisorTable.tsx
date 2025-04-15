import { prisma } from "@/prisma/client";

const SupervisorTable = async () => {
  // retrieves users with supervisor, coordinator and admin role
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: ["SUPERVISOR", "COORDINATOR", "ADMIN"],
      },
    },
    include: {
      supervisorProjects: true,
    },
  });

  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>Supervisor Name</th>
          <th>Email</th>
          <th className="hidden md:table-cell">Phone</th>
          <th>Office</th>
          <th className="hidden md:table-cell">Role</th>
          <th className="hidden md:table-cell">Number of Students</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="hidden md:table-cell">{user.phone}</td>
            <td>{user.office}</td>
            <td className="hidden md:table-cell">{user.role}</td>
            <td className="hidden md:table-cell">
              {user.supervisorProjects.length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupervisorTable;
