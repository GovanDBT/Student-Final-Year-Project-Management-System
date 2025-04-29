import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { IoNotifications, IoMail, IoGlobeOutline } from "react-icons/io5";

const Topmenu = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-base-200 w-full h-15 mb-5 flex place-items-center justify-between">
      <label className="input w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>
      <div className="flex w-160 px-4 place-items-center justify-between">
        <div className="flex gap-x-10 pl-5">
          <IoNotifications size={25} />
          <IoMail size={25} />
          <IoGlobeOutline size={25} />
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div className="flex place-items-center gap-x-4">
              <div className="flex flex-col">
                <p className="m-0 text-right text-[15px]">
                  {session && <span>{session.user!.name}</span>}
                </p>
                <p className="m-0 text-right text-[12px]">Admin</p>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topmenu;
