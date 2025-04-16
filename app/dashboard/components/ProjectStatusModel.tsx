"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  projectId: number;
}

const ProjectStatusModel = ({ projectId }: Props) => {
  const router = useRouter(); // router
  const { register, handleSubmit } = useForm();

  return (
    <div>
      {/* Button */}
      <button
        className="btn btn-primary"
        onClick={() =>
          (document.getElementById("modal") as HTMLDialogElement)?.showModal()
        }
      >
        Update Status
      </button>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="font-bold mb-2">Change Project Status</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              await axios.patch("/api/project/status/" + projectId, data);
              router.refresh();
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
            <button type="submit" className="btn btn-primary text-wrap">
              Update Status
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProjectStatusModel;
