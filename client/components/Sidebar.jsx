import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsPieChartFill } from "react-icons/bs";
// import { HiChaMdSpaceDashboard } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import {
  FaHandHoldingHeart,
  FaDonate,
  FaUserAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
const Sidebar = () => {
  const router = useRouter();
  return (
    <aside
      id="default-sidebar"
      className="w-full h-full   transition-transform -translate-x-full sm:translate-x-0 border-r "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${
                router.pathname === "/" ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-500">
                <MdDashboard />
              </span>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/donor"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${
                router.pathname.includes("/donor") ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-500">
                <FaHandHoldingHeart />
              </span>
              <span className="flex-1 ml-3 whitespace-nowrap">Donors</span>
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${
                router.pathname === "/users" ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-500">
                <FaUserAlt />
              </span>
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/donation"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${
                router.pathname === "/donation" ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-500">
                <FaDonate />
              </span>
              <span className="flex-1 ml-3 whitespace-nowrap">Donations</span>
            </Link>
          </li>
          <li>
            <Link
              href="/expanse"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${
                router.pathname === "/expanse" ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-500">
                <FaMoneyBillAlt />
              </span>
              <span className="flex-1 ml-3 whitespace-nowrap">Expenses</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
