"use client";

interface Props {
  projectId: number;
  author?: string;
}

const ResponseModal = ({ projectId, author }: Props) => {
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
          <h2 className="font-bold text-xl mb-2">
            Response to {author}'s Project
          </h2>
          <form className="space-y-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Project Status
              </legend>
              <select className="select w-full">
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Completed</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Leave Comment</legend>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Comment on students project"
              ></textarea>
              <div className="fieldset-label">Optional</div>
            </fieldset>
            <button className="btn btn-primary">Sent Response</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ResponseModal;
