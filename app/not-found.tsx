import Link from "next/link";
import { FaLinkSlash } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <div className="flex-col space-y-5 h-lvh place-content-center place-items-center">
      <div className="flex gap-3 items-center">
        <FaLinkSlash size={20} />
        <h3>The requested page does not exist</h3>
      </div>
      <Link href="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
