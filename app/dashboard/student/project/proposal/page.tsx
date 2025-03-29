"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface ProjectForm {
  title: string;
  description: string;
}

const ProjectProposalPage = () => {
  const router = useRouter();
  // function to make our editor compatible with our browser
  const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
  });
  // react hook forms
  const { register, control, handleSubmit } = useForm<ProjectForm>();
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
      <h1>Final Year Project Proposal Form</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/projects", data);
          router.push("/dashboard/student/project");
        })}
        className="space-y-5 my-5"
      >
        <input
          type="text"
          placeholder="Project Title"
          className="input w-full"
          {...register("title")}
        />
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            <span className="text-lg">Project Description</span>
            <span className="text-xm italic">
              should include Problem Statement, Motivation, Proposed Solution,
              Objective, and Project Scope
            </span>
          </legend>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                className="textarea w-full"
                placeholder="Enter project Description"
                {...field}
              />
            )}
          />
        </fieldset>
        <button className="btn btn-primary">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProjectProposalPage;
