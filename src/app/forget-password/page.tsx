import { Metadata } from "next";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { Link } from "@nextui-org/link";

export const metadata: Metadata = {
  title: "Forget Password",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function ForgetPasswordPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="text-xl text-center">
        <span className="text-blue-400 font-bold">G</span>arden
        <span className="text-blue-400 font-bold">B</span>ook Forget Password
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
  );
}
