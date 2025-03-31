"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBarsStaggered } from "react-icons/fa6";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  if (status === "loading") return null;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home page after logout
  };
  const links = [
    { label: "Dashboard", href: "/dashboard/supervisor" },
    { label: "Project", href: "/dashboard/supervisor/project" },
  ];
  return (
    <nav className="navbar shadow-sm mb-5">
      <div className="container mx-auto flex">
        <div className="navbar-start">
          <div className="dropdown">
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
          <Link href="/" className="btn btn-ghost text-xl space-x-2">
            <Image src="/ub-logo.png" alt="UB logo" width={25} height={25} />
            <h1 className="font-bungee text-xl hidden md:flex">Project Hub</h1>
          </Link>
        </div>
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
        <div className="navbar-end flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
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
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
