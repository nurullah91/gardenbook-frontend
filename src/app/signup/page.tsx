import { Link } from "@nextui-org/link";
import React from "react";

const Singnup = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-center text-rose-400 text-3xl">
        Sign up page
      </h1>
      <Link
        href="/"
        className="bg-slate-300 py-2 px-3 text-gray-800 rounded-md mt-6"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Singnup;
