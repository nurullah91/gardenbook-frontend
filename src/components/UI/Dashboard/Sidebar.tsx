"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
export default function Sidebar() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="sticky top-16 lg:h-[calc(100vh-66px)] px-2 py-4 z-20 backdrop-blur-md lg:w-60 w-full shadow-lg shadow-default-200 rounded-lg">
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
            href={"/admin/dashboard"}
            className="shadow-md py-3 px-2 rounded shadow-default-200 bg-default-100 w-full text-center"
          >
            Analytics
          </Link>
          <Link
            href={"/admin/dashboard/manage-users"}
            className="shadow-md py-3 px-2 rounded shadow-default-200 bg-default-100 w-full text-center"
          >
            Manage users
          </Link>
          <Link
            href={"/admin/dashboard/manage-content"}
            className="shadow-md py-3 px-2 rounded shadow-default-200 bg-default-100 w-full text-center"
          >
            Manage Content
          </Link>
        </div>
      </div>
    </div>
  );
}
