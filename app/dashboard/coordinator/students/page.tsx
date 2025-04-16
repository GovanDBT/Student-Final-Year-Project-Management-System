import React from "react";
import AllStudentsTable from "../../components/AllStudentsTable";
import { prisma } from "@/prisma/client";

const StudentListPage = async () => {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
  });

  const totalStudents = students.length;

  return (
    <div className="container mx-auto">
      <h1 className="mb-4">Registered Students List </h1>
      <div className="card bg-base-200 w-fit px-5 py-2 text-lg border-1 border-base-content/10">
        <p className="m-0">
          <span className="font-black">Number of Students:</span>{" "}
          {totalStudents}
        </p>
      </div>
      <AllStudentsTable />
    </div>
  );
};

export default StudentListPage;
