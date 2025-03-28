"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const ProjectProposalPage = () => {
  const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
  });
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
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            <span className="text-lg">Project Description</span>
            <span className="text-xm italic">
              should include Problem Statement, Motivation, Proposed Solution,
              Objective, and Project Scope
            </span>
          </legend>
          <SimpleMDE
            className="textarea w-full"
            placeholder="Enter project Description"
          ></SimpleMDE>
        </fieldset>
        <button className="btn btn-primary">Submit Proposal</button>
      </div>
    </div>
  );
};

export default ProjectProposalPage;
