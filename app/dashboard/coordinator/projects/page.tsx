import ProposalTable from "@/app/proposals/ProposalTable";
import { prisma } from "@/prisma/client";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();
  const totalProjects = projects.length;

  return (
    <div className="container mx-auto">
      <h1>Projects Proposal List</h1>
      <div className="divider mt-2 mb-6"></div>
      <div className="card bg-base-200 w-fit px-5 py-2 text-lg border-1 border-base-content/10">
        <p className="m-0">
          <span className="font-black">Number of Projects:</span>{" "}
          {totalProjects}
        </p>
      </div>
      <div className="my-5 rounded-box border border-base-content/5">
        <ProposalTable />
      </div>
    </div>
  );
};

export default ProjectsPage;
