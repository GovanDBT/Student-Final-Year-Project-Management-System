import React from "react";
import AllStudentsTable from "../components/AllStudentsTable";
import { prisma } from "@/prisma/client";

const StudentsPage = async () => {
  const students = await prisma.user.findMany();
  return (
    <div>
      <h1 className="text-2xl">All Registered Students</h1>
      <div className="divider mt-2 mb-6"></div>
      {students && students.length > 1 ? (
        <AllStudentsTable />
      ) : (
        <p>No students registered.</p>
      )}
    </div>
  );
};

export default StudentsPage;
