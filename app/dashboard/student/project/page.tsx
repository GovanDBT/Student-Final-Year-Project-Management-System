import Link from "next/link";
import React from "react";

const ProjectPage = () => {
  return (
    <div className="container mx-auto">
      <div
        role="alert"
        className="alert alert-vertical sm:alert-horizontal mb-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>You do not have a project proposal</span>
        <div>
          <Link
            href="/dashboard/student/project/proposal"
            className="btn btn-sm btn-primary"
          >
            Submit Proposal
          </Link>
        </div>
      </div>
      <h1 className="text-center">NO PROJECT YET</h1>
    </div>
  );
};

export default ProjectPage;
