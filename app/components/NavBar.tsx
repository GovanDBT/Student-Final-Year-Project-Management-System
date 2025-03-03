"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Supervisors", href: "/supervisors" },
    { label: "Prerequisites", href: "/prerequisites" },
    { label: "Project Milestone", href: "/milestone" },
  ];
  return (
    <nav className="flex items-center justify-between py-5 px-10">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/UBotswana.png" alt="UB logo" width={50} height={50} />
        <h2>UB FYP-MVCS</h2>
      </Link>
      <div className="flex space-x-25">
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
      </div>
      <button className="btn">Register</button>
    </nav>
  );
};

export default NavBar;
