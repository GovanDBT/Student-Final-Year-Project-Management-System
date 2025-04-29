import React from "react";
import ProposalTable from "@/app/proposals/ProposalTable";
import { prisma } from "@/prisma/client";

const ProjectsPage = async () => {
  const project = await prisma.project.findMany();
  return (
    <div>
      <h1 className="text-2xl">All Submitted Projects</h1>
      <div className="divider mt-2 mb-6"></div>
      {project && project.length > 1 ? (
        <ProposalTable />
      ) : (
        <p>No projects submitted.</p>
      )}
    </div>
  );
};

export default ProjectsPage;
