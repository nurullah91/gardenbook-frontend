import { Link } from "@nextui-org/link";
import LoginForm from "./LoginForm";
import { Metadata } from "next";
import SignupAnimation from "@/src/components/UI/SignupAnimation";

export const metadata: Metadata = {
  title: "Login",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function LoginPage() {
  return (
    <div className="flex gap-4 justify-center items-center flex-col md:flex-row my-10">
      <div className="w-full md:w-1/2">
        <SignupAnimation />
      </div>

      <div className="w-full md:w-1/2 max-w-[450px] border shadow-md px-6 py-10 rounded-lg backdrop-blur-md">
        <h1 className="text-3xl text-center">
          <span className="text-blue-400 font-bold">G</span>arden
          <span className="text-blue-400 font-bold">B</span>ook Login
        </h1>
        <LoginForm />
        <div>
          <p className="text-xs mt-2">
            New to Gardenbook?{" "}
            <Link href="/signup" className="text-xs font-bold">
              signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
