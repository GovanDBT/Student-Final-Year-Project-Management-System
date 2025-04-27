import React from "react";
import SubmissionForm from "../components/SubmissionForm";

const SubmissionPage = () => {
  return (
    <div className="container mx-auto">
      <h1>Submissions</h1>
      <div className="divider mt-2 mb-6"></div>
      <SubmissionForm />
      <h2>Submission History</h2>
    </div>
  );
};

export default SubmissionPage;
