"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/app/validationSchema";
import { z } from "zod";
import { Project, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type ProjectFormData = z.infer<typeof createProjectSchema>;

interface Props {
  project?: Project;
}

const ProjectProposalForm = ({ project }: Props) => {
  const router = useRouter(); // router
  const [fieldError, setFieldError] = useState(""); // error hook
  const { data: supervisors, error } = useQuery<User[]>({
    queryKey: ["supervisors"],
    queryFn: () => axios.get("/api/users/supervisors").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (error) return null;
  // function to make our editor compatible with our browser
  const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
  });
  // react hook forms
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });
  return (
    <div className="container mx-auto">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link
              className="link link-success"
              href="/dashboard/student/project"
            >
              My Project
            </Link>
          </li>
          <li>Project Proposal</li>
        </ul>
      </div>
      {fieldError && (
        <div role="alert" className="alert alert-error my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{fieldError}</span>
        </div>
      )}
      <h1>Final Year Project Proposal Form</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/projects", data);
            router.push("/dashboard/student/project");
          } catch (error) {
            setFieldError("An unexpected error has occurred");
          }
        })}
        className="space-y-5 my-5"
      >
        <input
          type="text"
          defaultValue={project?.title}
          placeholder="Project Title"
          className="input w-full"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
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
            defaultValue={project?.description}
            render={({ field }) => (
              <SimpleMDE
                className="textarea w-full"
                placeholder="Enter project Description"
                {...field}
              />
            )}
          />
        </fieldset>
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Select Supervisor</legend>
          <select
            className="select"
            {...register("supervisorId")}
            defaultValue={project?.supervisorId}
          >
            <option value="" disabled>
              Select a supervisor
            </option>
            {supervisors?.map((supervisor) => (
              <option
                key={supervisor.id}
                value={supervisor.id}
                defaultValue={project?.supervisorId}
              >
                {supervisor.name}
              </option>
            ))}
          </select>
        </fieldset>
        <button className="btn btn-primary">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProjectProposalForm;
