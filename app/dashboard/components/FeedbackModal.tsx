"use client";
import { MdFeedback } from "react-icons/md";

const FeedbackModal = () => {
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
          <h2 className="font-bold mb-2">Feedback</h2>
          <form className="space-y-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Leave Feedback
              </legend>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Comment on students project"
              ></textarea>
            </fieldset>
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
