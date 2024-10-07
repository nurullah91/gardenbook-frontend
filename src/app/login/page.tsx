import { Link } from "@nextui-org/link";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="text-3xl text-center">
        <span className="text-blue-400 font-bold">G</span>arden
        <span className="text-blue-400 font-bold">B</span>ook Login
      </h1>
      <LoginForm />
      <div>
        <p className="text-sm">
          New to Gardenbook? <Link href="/signup">signup</Link>
        </p>
      </div>
    </div>
  );
}
