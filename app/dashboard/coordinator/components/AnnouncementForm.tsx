"use client";

import { createAnnouncementSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Announcement } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AnnouncementFormData = z.infer<typeof createAnnouncementSchema>;

interface Props {
  announcement?: Announcement;
}

const AnnouncementForm = ({ announcement }: Props) => {
  const [fieldError, setFieldError] = useState(""); // error hook
  const [fieldSuccess, setFieldSuccess] = useState(""); // error hook
  const router = useRouter(); // router
  // react hook forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(createAnnouncementSchema),
  });
  return (
    <>
      {/* Error Alert Message */}
      {fieldError && (
        <div role="alert" className="alert alert-error alert-soft my-5">
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
        <div role="alert" className="alert alert-success alert-soft mt-3">
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
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            if (announcement) {
              await axios.patch("/api/announcement/" + announcement.id, data);
              setFieldSuccess("Announcement Successfully Updated!");
            } else {
              await axios.post("/api/announcement", data);
              setFieldSuccess("Announcement Successfully Posted!");
              reset(); // clears form
              router.refresh();
            }
          } catch (error) {
            setFieldError("An unexpected error has occurred");
          }
        })}
        className="my-5 space-y-8"
      >
        {/* Announcement Title */}
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Announcement Title
            </legend>
            <textarea
              className="textarea w-full"
              placeholder="e.g. Final presentation moved..."
              defaultValue={announcement?.title}
              {...register("title")}
            ></textarea>
          </fieldset>
          {errors.title && (
            <p className="text-red-600 mt-2">{errors.title.message}</p>
          )}
        </div>
        {/* Announcement Description */}
        <div className="mb-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Announcement Description
            </legend>
            <textarea
              className="textarea w-full"
              placeholder="e.g. please be advised to come and collect your papers..."
              defaultValue={announcement?.description}
              {...register("description")}
            ></textarea>
          </fieldset>
          {errors.description && (
            <p className="text-red-600 mt-2">{errors.description.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {announcement ? "Update Announcement" : "Submit Announcement"}
        </button>
      </form>
    </>
  );
};

export default AnnouncementForm;
