import { Link } from "@heroui/link";
import { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";
import ForgetAnimation from "@/src/components/UI/ForgetAnimation";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-4 justify-center items-center flex-col md:flex-row my-10">
        <div className="w-full md:w-1/2">
          <ForgetAnimation />
        </div>

        <div className="w-full md:w-1/2 max-w-[400px] border shadow-md px-6 py-10 rounded-lg backdrop-blur-md">
          <h1 className="text-xl text-center">
            <span className="text-blue-400 font-bold">G</span>arden
            <span className="text-blue-400 font-bold">B</span>ook Reset Password
          </h1>
          <div>
            <ResetPasswordForm />
            <p className="text-sm">
              Remember password? <Link href="/login">login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
