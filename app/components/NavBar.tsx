"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBarsStaggered } from "react-icons/fa6";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname(); // to highlight active menu
  const links = [
    { label: "Home", href: "/" },
    { label: "Supervisors", href: "/supervisors" },
    { label: "Prerequisites", href: "/prerequisites" },
    { label: "Project Milestone", href: "/milestone" },
  ];
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBarsStaggered size={23} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classnames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  {link.label}
                </Link>
              ))}
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl space-x-2">
          <Image src="/UBotswana.png" alt="UB logo" width={30} height={30} />
          <h1 className="font-bungee text-2xl">Project Manager</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu">
          <li className="menu-horizontal space-x-15">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  "text-zinc-900": link.href === currentPath,
                  "text-zinc-500": link.href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {link.label}
              </Link>
            ))}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="#" className="btn">
          Button
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
