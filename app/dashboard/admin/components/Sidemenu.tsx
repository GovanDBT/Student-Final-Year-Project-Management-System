"use client";
import {
  MdAdminPanelSettings,
  MdDashboard,
  MdSupervisorAccount,
  MdEditDocument,
  MdSend,
  MdLogout,
} from "react-icons/md";
import { PiStudentFill, PiUserBold, PiMicrophoneFill } from "react-icons/pi";
import { FaProjectDiagram } from "react-icons/fa";

import Link from "next/link";
import LogoutModal from "../../components/LogoutModal";

const Sidemenu = () => {
  return (
    <ul className="menu menu-lg bg-base-200 w-full h-screen">
      <h2 className="pl-3 flex place-items-center gap-x-2 mt-2">
        <MdAdminPanelSettings /> Admin Dashboard
      </h2>
      <div className="divider my-1"></div>
      <div className="space-y-3">
        <li>
          <Link href={"/dashboard/admin"}>
            <MdDashboard />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/admin/myStudents"}>
            <PiStudentFill />
            My Students
          </Link>
        </li>
        <li>
          <a>
            <MdSend />
            Submissions
          </a>
        </li>
        <li>
          <details open>
            <summary>
              <PiUserBold />
              Users
            </summary>
            <ul>
              <li>
                <Link href={"/dashboard/admin/students"}>
                  <PiStudentFill />
                  Students
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/admin/supervisors"}>
                  <MdSupervisorAccount size={20} />
                  Supervisors
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link href={"/dashboard/admin/projects"}>
            <FaProjectDiagram />
            Projects
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/admin/registerSupervisor"}>
            <MdEditDocument />
            Register Supervisor
          </Link>
        </li>
        <li>
          <a>
            <PiMicrophoneFill />
            Announcements
          </a>
        </li>
        <li>
          <LogoutModal />
        </li>
      </div>
    </ul>
  );
};

export default Sidemenu;
