import { prisma } from "@/prisma/client";

const SupervisorTable = async () => {
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
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Supervisor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Office</th>
            <th>Role</th>
            <th>Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.office}</td>
              <td>{user.role}</td>
              <td>{user.supervisorProjects.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorTable;
