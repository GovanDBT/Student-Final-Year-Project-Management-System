import React from "react";
import SubmissionForm from "../components/SubmissionForm";
import SubmissionTable from "../components/SubmissionTable";

const SubmissionPage = () => {
  return (
    <div className="container mx-auto">
      <h1>Submissions</h1>
      <div className="divider mt-2 mb-6"></div>
      <SubmissionForm />
      <h2 className="mb-5">Submission History</h2>
      <SubmissionTable />
    </div>
  );
};

export default SubmissionPage;
