import { Metadata } from "next";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { Link } from "@heroui/link";
import ForgetAnimation from "@/src/components/UI/ForgetAnimation";

export const metadata: Metadata = {
  title: "Forget Password",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-4 justify-center items-center flex-col md:flex-row my-10">
        <div className="w-full md:w-1/2">
          <ForgetAnimation />
        </div>

        <div className="w-full md:w-1/2 max-w-[400px] border shadow-md px-6 py-10 rounded-lg backdrop-blur-md">
          <h1 className="text-xl text-center">
            <span className="text-blue-400 font-bold">G</span>arden
            <span className="text-blue-400 font-bold">B</span>ook Forget
            Password
          </h1>
          <div>
            <ForgetPasswordForm />
            <p className="text-sm">
              New to Gardenbook?{" "}
              <Link href="/signup" className="text-sm">
                signup
              </Link>
            </p>
            <Link href={"/"} className="text-sm font-bold hover:underline">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
