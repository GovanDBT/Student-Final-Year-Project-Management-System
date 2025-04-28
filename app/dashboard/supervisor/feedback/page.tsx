import React from "react";
import StudentsSubmissionsTable from "../components/StudentsSubmissionsTable";

const FeedbackPage = () => {
  return (
    <div className="container mx-auto">
      <h1>My Students Submissions</h1>
      <div className="divider mt-2 mb-6"></div>
      <StudentsSubmissionsTable />
    </div>
  );
};

export default FeedbackPage;
