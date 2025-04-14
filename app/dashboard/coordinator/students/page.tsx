import React from "react";
import AllStudentsTable from "../../components/AllStudentsTable";

const StudentListPage = () => {
  return (
    <div className="container mx-auto">
      <h1>Registered Students List</h1>
      <AllStudentsTable />
    </div>
  );
};

export default StudentListPage;
