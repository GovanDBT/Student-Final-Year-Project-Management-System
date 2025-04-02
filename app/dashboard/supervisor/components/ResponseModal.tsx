"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createCommentSchema } from "@/app/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CommentForm = z.infer<typeof createCommentSchema>;

interface Props {
  projectId: number;
  author?: string;
}

const ResponseModal = ({ projectId, author }: Props) => {
  const [fieldError, setFieldError] = useState(""); // error hook
  const router = useRouter(); // router
  const { register, handleSubmit } = useForm();
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Send Response
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
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
          <h2 className="font-bold text-xl mb-2">
            Response to {author}'s Project
          </h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                await axios.patch("/api/projects/" + projectId, data);
                await axios.post("/api/projects/" + projectId, data);
                router.refresh();
              } catch (error) {
                setFieldError("An unexpected error has occurred");
              }
            })}
            className="space-y-5"
          >
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Project Status
              </legend>
              <select className="select w-full" {...register("status")}>
                <option value={"PENDING"}>Pending</option>
                <option value={"APPROVED"}>Approved</option>
                <option value={"REJECTED"}>Rejected</option>
                <option value={"COMPLETED"}>Completed</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Leave Comment</legend>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Comment on students project"
                {...register("comment")}
              ></textarea>
              <div className="fieldset-label">Optional</div>
            </fieldset>
            <button type="submit" className="btn btn-primary">
              Sent Response
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ResponseModal;
