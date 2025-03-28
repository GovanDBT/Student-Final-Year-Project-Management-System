"use client";
import Link from "next/link";

const ProjectProposalPage = () => {
  return (
    <div className="container mx-auto">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/dashboard/student/project">My Project</Link>
          </li>
          <li>Project Proposal</li>
        </ul>
      </div>
      <div className="space-y-5 my-5">
        <h1>Final Year Project Proposal Form</h1>
        <input
          type="text"
          placeholder="Project Title"
          className="input w-full"
        />
        <textarea
          className="textarea w-full"
          placeholder="Problem Statement"
        ></textarea>
        <textarea
          className="textarea w-full"
          placeholder="Motivation"
        ></textarea>
        <textarea
          className="textarea w-full"
          placeholder="Proposed Solution"
        ></textarea>
        <textarea
          className="textarea w-full"
          placeholder="Objectives"
        ></textarea>
        <textarea
          className="textarea w-full"
          placeholder="Project Scope"
        ></textarea>
        <button className="btn btn-primary">Submit Proposal</button>
      </div>
    </div>
  );
};

export default ProjectProposalPage;
