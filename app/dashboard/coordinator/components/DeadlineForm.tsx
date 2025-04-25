"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createDeadlineSchema } from "@/app/validationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Deadline } from "@prisma/client";

type FormData = z.infer<typeof createDeadlineSchema>;

interface Props {
  deadline?: Deadline;
}

const DeadlineForm = ({ deadline }: Props) => {
  const [fieldError, setFieldError] = useState(""); // error hook
  const [fieldSuccess, setFieldSuccess] = useState(""); // error hook
  const router = useRouter(); // router
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createDeadlineSchema),
  });

  // submit function
  const onSubmit = async (data: FormData) => {
    try {
      if (deadline) {
        await axios.patch("/api/deadline/" + deadline.id, data);
        setFieldSuccess("Deadline Successfully Updated!");
      } else {
        await axios.post("/api/deadline", data);
        setFieldSuccess("Deadline Successfully Posted!");
        reset(); // clears form
        router.refresh();
      }
    } catch (error) {
      setFieldError("An unexpected error has occurred");
    }
  };

  return (
    <>
      {/* Error Alert Message */}
      {fieldError && (
        <div role="alert" className="alert alert-error alert-soft mb-5">
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
      {/* Success Alert Message */}
      {fieldSuccess && (
        <div role="alert" className="alert alert-success alert-soft mb-3">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{fieldSuccess}</span>
        </div>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <h2>Deadlines Form</h2>
        {/* Deadline Title */}
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Deadline Title</legend>
            <input
              type="text"
              className="input w-full"
              defaultValue={deadline?.title}
              placeholder="e.g. Beta Version Deadline"
              {...register("title")}
            />
          </fieldset>
          {errors.title && (
            <p className="text-red-600 mt-2">{errors.title.message}</p>
          )}
        </div>
        {/* Deadline Description */}
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Deadline Description
            </legend>
            <textarea
              className="textarea w-full"
              defaultValue={deadline?.description ?? ""}
              placeholder="e.g. Expected to submit documentation, presentation slide, ..."
              {...register("description")}
            ></textarea>
            <p className="label m-0">
              Write down what students are expected to submit
            </p>
          </fieldset>
          {errors.description && (
            <p className="text-red-600 mt-2">{errors.description.message}</p>
          )}
        </div>
        {/* Deadline Date */}
        <div className="mb-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Deadline Date</legend>
            <input
              type="datetime-local"
              defaultValue={deadline?.deadlineDate?.toISOString().slice(0, 16)}
              className="input w-full"
              {...register("deadlineDate")}
            />
          </fieldset>
          {errors.deadlineDate && (
            <p className="text-red-600 mt-2">{errors.deadlineDate.message}</p>
          )}
        </div>
        {/* isSubmittable */}
        <div className="mb-8">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Is Submission Expected?
            </legend>
            <select
              className="select w-full"
              defaultValue={
                deadline?.isSubmittable !== undefined
                  ? String(deadline.isSubmittable)
                  : undefined
              }
              {...register("isSubmittable")}
            >
              <option value="false">Non-submittable</option>
              <option value="true">Submittable</option>
            </select>
          </fieldset>
        </div>
        <button type="submit" className="btn btn-primary">
          {deadline ? "Update Deadline" : "Set Deadline"}
        </button>
      </form>
    </>
  );
};

export default DeadlineForm;
