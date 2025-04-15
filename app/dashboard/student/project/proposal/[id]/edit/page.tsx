import { prisma } from "@/prisma/client";
import ProposalForm from "../../../../components/ProposalForm";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditProposalPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!project) notFound();
  return <ProposalForm project={project} />;
};

export default EditProposalPage;
