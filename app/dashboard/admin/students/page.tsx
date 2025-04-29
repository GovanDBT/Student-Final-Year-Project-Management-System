import React from "react";
import AllStudentsTable from "../components/AllStudentsTable";

const StudentsPage = () => {
  return (
    <div>
      <h1 className="text-2xl">All Registered Students</h1>
      <div className="divider mt-2 mb-6"></div>
      <AllStudentsTable />
    </div>
  );
};

export default StudentsPage;
