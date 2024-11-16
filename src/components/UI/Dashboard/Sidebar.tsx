"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
export default function Sidebar() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="sticky top-16 lg:h-[calc(100vh-66px)] px-4 py-6 z-20 backdrop-blur-md lg:w-60 w-full shadow-lg p-4 shadow-blue-600/30 rounded-lg">
      <div className="block lg:hidden">
        <button onClick={() => setShow(!show)}>
          {show ? (
            <RxCross2 className="text-2xl" />
          ) : (
            <HiOutlineMenuAlt1 className="text-2xl" />
          )}
        </button>
      </div>
      <div>
        <div
          className={`flex lg:flex flex-col gap-2 ${show ? "block" : "hidden"}`}
        >
          <Link
            href={"/admin/dashboard/manage-users"}
            className="shadow-md py-3 px-2 rounded shadow-blue-600/20"
          >
            Manage users
          </Link>
          <Link
            href={"/admin/dashboard/manage-content"}
            className="shadow-md py-3 px-2 rounded shadow-blue-600/20"
          >
            Manage Content
          </Link>
          <Link
            href={"/admin/dashboard/analytics"}
            className="shadow-md py-3 px-2 rounded shadow-blue-600/20"
          >
            Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
