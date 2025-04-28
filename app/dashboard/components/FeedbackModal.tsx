"use client";
import { createFeedbackSchema } from "@/app/validationSchema";
import { MdFeedback } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

type FormData = z.infer<typeof createFeedbackSchema>;

interface Props {
  submissionId: number;
  author?: string;
}

const FeedbackModal = ({ submissionId, author }: Props) => {
  const [fieldError, setFieldError] = useState(""); // error hook
  const [fieldSuccess, setFieldSuccess] = useState(""); // error hook
  const router = useRouter(); // router

  // submit form function
  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`/api/submission/${submissionId}/feedback`, data);
      setFieldSuccess("Feedback Successfully Sent!");
      router.refresh();
    } catch (error) {
      setFieldError("An unexpected error has occurred!");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createFeedbackSchema),
  });
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("my_modal_9") as HTMLDialogElement
          )?.showModal()
        }
      >
        <MdFeedback />
        Feedback
      </button>
      <dialog id="my_modal_9" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* close modal button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="font-bold mb-2">Feedback for {author}'s submission</h2>
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
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g. Beta version feedback..."
                  {...register("title")}
                />
              </fieldset>
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
            </div>
            {/* Description */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm">Description</legend>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="e.g. Your document is missing..."
                  {...register("description")}
                ></textarea>
              </fieldset>
              {errors.description && (
                <p className="text-red-600 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary text-wrap">
              Submit Feedback
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default FeedbackModal;
