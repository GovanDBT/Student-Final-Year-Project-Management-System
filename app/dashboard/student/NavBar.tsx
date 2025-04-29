"use client";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import LogoutModal from "../components/LogoutModal";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/dashboard/student" },
    { label: "My Project", href: "/dashboard/student/project" },
    { label: "Submissions", href: "/dashboard/student/submission" },
    { label: "Feedbacks", href: "/dashboard/student/feedback" },
    { label: "Timeline", href: "/dashboard/student/timeline" },
    { label: "Project Guide", href: "/dashboard/student/guide" },
  ];
  return (
    <nav className="navbar mb-6 bg-base-200 w-full">
      <div className="container mx-auto flex">
        {/* Navbar start */}
        <div className="navbar-start">
          {/* Dropdown */}
          <div className="dropdown">
            {/* Burger */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered size={23} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={classnames({
                      "text-white": link.href === currentPath,
                      "text-gray-400": link.href !== currentPath,
                      "hover:text-white transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
          {/* Logo and Text */}
          <Link href="/dashboard/student" className="btn btn-ghost space-x-2">
            <Image src="/ub-logo.png" alt="UB logo" width={28} height={28} />
            <h1 className="font-bungee text-2xl mt-2">Project Hub</h1>
          </Link>
        </div>
        {/* Navbar middle */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu">
            <li className="menu-horizontal space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classnames({
                    "text-white": link.href === currentPath,
                    "text-zinc-400": link.href !== currentPath,
                    "hover:text-white transition-colors": true,
                  })}
                >
                  {link.label}
                </Link>
              ))}
            </li>
          </ul>
        </div>
        {/* Navbar end */}
        <div className="navbar-end flex space-x-5">
          <LogoutModal />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <FaCircleUser size={35} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2"
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
