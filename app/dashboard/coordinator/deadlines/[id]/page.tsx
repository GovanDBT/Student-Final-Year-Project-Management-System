import { prisma } from "@/prisma/client";
import notFound from "../../not-found";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import DeadlinesTable from "../../components/DeadlinesTable";
import DeadlineForm from "../../components/DeadlineForm";

interface Props {
  params: { id: string };
}

const DeadlineDetails = async ({ params }: Props) => {
  // find specific deadline
  const deadline = await prisma.deadline.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!deadline) notFound(); // if not found

  return (
    <div className="container mx-auto">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/coordinator/deadlines"
            >
              Deadlines
            </Link>
          </li>
          <li>Deadline Detail: {deadline?.id}</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <h1>Deadline Details Form</h1>
        <button className="btn btn-primary">
          {" "}
          <IoTrashBin size={18} /> Delete
        </button>
      </div>
      <div className="my-4 flex justify-between space-x-5">
        <div className="stats shadow w-full bg-base-200">
          <div className="stat">
            <div className="stat-value">86%</div>
            <div className="stat-title">Submissions</div>
            <div className="stat-desc link link-success">
              View all submissions
            </div>
          </div>
        </div>
        <div className="stats shadow w-full bg-base-200">
          <div className="stat">
            <div className="stat-value">
              {new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(deadline?.dateCreated || Date.now()))}
            </div>
            <div className="stat-title">Date Created</div>
          </div>
        </div>
        <div className="stats shadow w-full bg-base-200">
          <div className="stat">
            <div className="stat-value">
              {deadline?.dateUpdated
                ? new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(deadline.dateUpdated))
                : "No Update"}
            </div>
            <div className="stat-title">Last Update</div>
          </div>
        </div>
      </div>
      <DeadlineForm deadline={deadline || undefined} />
    </div>
  );
};

export default DeadlineDetails;
