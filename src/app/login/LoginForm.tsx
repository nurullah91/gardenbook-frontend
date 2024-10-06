"use client";
import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";

import GBForm from "@/src/components/form/GBForm";
import GBInput from "@/src/components/form/GBInput";
import { loginSchema } from "@/src/schema";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

export interface ILoginFormProps {}
export default function LoginForm({}: ILoginFormProps) {
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // // Handle login logic, e.g., sending a POST request to the login API
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    // if (res.ok) {
    //   // Redirect on successful login
    //   redirect("/dashboard");
    // } else {
    //   // Handle login error
    //   console.log("Login failed");
    // }
    console.log(data);
  };
  return (
    <div>
      <GBForm
        onSubmit={handleSubmit}
        resolver={zodResolver(loginSchema)}
        // defaultValues={{ email: "", password: "" }}
      >
        <GBInput label="Email" name="email" type="email" required />
        <GBInput label="Password" name="password" type="password" required />
        <Button radius="sm" className="mt-3" size="sm" type="submit">
          Login
        </Button>
      </GBForm>
    </div>
  );
}
