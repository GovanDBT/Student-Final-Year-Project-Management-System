import React from "react";
import ProposalTable from "@/app/proposals/ProposalTable";

const ProjectsPage = () => {
  return (
    <div>
      <h1 className="text-2xl">All Submitted Projects</h1>
      <div className="divider mt-2 mb-6"></div>
      <ProposalTable />
    </div>
  );
};

export default ProjectsPage;
