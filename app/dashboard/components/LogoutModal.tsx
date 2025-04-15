import { signOut } from "next-auth/react";

const LogoutModal = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home page after logout
  };
  return (
    <div>
      <button
        className="btn btn-primary text-nowrap"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal"
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        Sign Out
      </button>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="font-bold">Sign Out</h1>
          <p className="py-3 text-lg">Your about to sign out, are you sure?</p>
          <div className="modal-action flex justify-between">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-success">Cancel</button>
            </form>
            <button onClick={handleLogout} className="btn btn-primary">
              Sign Out
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LogoutModal;
