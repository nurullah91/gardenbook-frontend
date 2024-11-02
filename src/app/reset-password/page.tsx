import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function ResetPasswordPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
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
  );
}
