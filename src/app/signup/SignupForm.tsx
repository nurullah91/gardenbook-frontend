"use client";
//import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";

import GBForm from "@/src/components/form/GBForm";
import GBInput from "@/src/components/form/GBInput";
import { signupSchema } from "@/src/schema";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { signupUser } from "@/src/services/Auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ILoginFormProps {}
export default function SignupForm({}: ILoginFormProps) {
  const {
    mutate: handleSignup,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useMutation({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData: FieldValues) => await signupUser(userData),
  });

  // Parse the error message from the backend
  const backendError =
    isError && error instanceof Error ? JSON.parse(error.message) : null;

  if (isError) {
    toast.error(backendError.message || "Something went wrong");
  }
  if (isSuccess) {
    toast.success(data.message);
  }
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleSignup(data);
  };
  return (
    <div>
      <GBForm onSubmit={handleSubmit} resolver={zodResolver(signupSchema)}>
        <GBInput name="password" label="Password" type="password" required />
        <GBInput name="name.firstName" label="First Name" required />
        <GBInput name="name.middleName" label="Middle Name" />
        <GBInput name="name.lastName" label="Last Name" required />
        <GBInput name="email" label="Email" type="email" required />
        <GBInput name="phone" label="Phone" required />
        <GBInput name="address" label="Address" required />

        <Button
          radius="sm"
          className="mt-3"
          size="sm"
          type="submit"
          isDisabled={isPending}
        >
          {isPending ? "Loading..." : "Signup"}
        </Button>
      </GBForm>
    </div>
  );
}
