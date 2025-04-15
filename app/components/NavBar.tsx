"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBarsStaggered } from "react-icons/fa6";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Supervisors", href: "/supervisors" },
    { label: "Proposals", href: "/proposals" },
    { label: "Project Guide", href: "/guide" },
    { label: "Project Milestone", href: "/milestone" },
  ];

  return (
    <nav className="navbar mb-6 bg-base-200 w-full">
      <div className="container mx-auto flex">
        {/* Navbar start */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            {/* Burger */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered size={23} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-neutral rounded-box z-1 mt-3 w-55 p-2 shadow"
            >
              <li className="space-y-3">
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
          <Link href="/" className="btn btn-ghost space-x-2">
            <Image src="/ub-logo.png" alt="UB logo" width={28} height={28} />
            <h1 className="font-bungee text-2xl">Project Hub</h1>
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
        <div className="navbar-end flex gap-2">
          <button className="btn btn-primary">
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
