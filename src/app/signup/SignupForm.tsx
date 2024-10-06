"use client";
import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";

import GBForm from "@/src/components/form/GBForm";
import GBInput from "@/src/components/form/GBInput";
import { loginSchema, signupSchema } from "@/src/schema";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { signupUser } from "@/src/services/Auth";

export interface ILoginFormProps {}
export default function SignupForm({}: ILoginFormProps) {
  const handleSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const res = await signupUser(data);
    console.log(res);
  };
  return (
    <div>
      <GBForm
        onSubmit={handleSubmit}
        resolver={zodResolver(signupSchema)}
        // defaultValues={{ email: "", password: "" }}
      >
        <GBInput name="password" label="Password" type="password" required />
        <GBInput name="name.firstName" label="First Name" required />
        <GBInput name="name.middleName" label="Middle Name" />
        <GBInput name="name.lastName" label="Last Name" required />
        <GBInput name="email" label="Email" type="email" required />
        <GBInput name="phone" label="Phone" required />
        <GBInput name="address" label="Address" required />

        <Button radius="sm" className="mt-3" size="sm" type="submit">
          Signup
        </Button>
      </GBForm>
    </div>
  );
}
