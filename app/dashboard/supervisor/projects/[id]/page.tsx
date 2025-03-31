import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      student: {
        select: { name: true, email: true, phone: true, programme: true },
      },
    },
  });
  if (!project) return notFound();
  return (
    <div>
      <p>{project.student?.name}</p>
      <p>{project.title}</p>
      <p>{project.description}</p>
      <p>{project.student?.email}</p>
      <p>{project.student?.phone}</p>
      <p>{project.student?.programme}</p>
      <p>{project.status}</p>
      <p>{project.dateCreated.toLocaleDateString()}</p>
      <p>{project.dateUpdated?.toLocaleDateString()}</p>
    </div>
  );
};

export default ProjectDetailsPage;
