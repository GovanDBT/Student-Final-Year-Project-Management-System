"use client";
import { FaLinkSlash } from "react-icons/fa6";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error", error);
  return (
    <div className="flex-col space-y-5 h-lvh place-content-center place-items-center">
      <div className="flex gap-3 items-center">
        <FaLinkSlash size={20} />
        <h3>An unexpected error has occurred</h3>
      </div>
      <button className="btn btn-primary" onClick={() => reset()}>
        Refresh
      </button>
    </div>
  );
};

export default ErrorPage;
