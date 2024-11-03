import { Link } from "@nextui-org/link";
import React from "react";

import SignupForm from "./SignupForm";
import SignupAnimation from "@/src/components/UI/SignupAnimation";

const Singnup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 justify-center items-center flex-col md:flex-row my-10">
        <div className="w-full md:w-1/2">
          <SignupAnimation />
        </div>

        <div className="w-full md:w-1/2 max-w-[600px] border shadow-md px-6 py-10 rounded-lg backdrop-blur-md">
          <h1 className="text-3xl text-center">
            <span className="text-blue-400 font-bold">G</span>arden
            <span className="text-blue-400 font-bold">B</span>ook Signup
          </h1>
          <SignupForm />
          <div>
            <p className="text-sm">
              Already have an account? <Link href="/login">login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singnup;
