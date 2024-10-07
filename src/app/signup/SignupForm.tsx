"use client";
//import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import GBForm from "@/src/components/form/GBForm";
import GBInput from "@/src/components/form/GBInput";
import { signupSchema } from "@/src/schema";
import { signupUser } from "@/src/services/Auth";

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
      <GBForm resolver={zodResolver(signupSchema)} onSubmit={handleSubmit}>
        <GBInput required label="Password" name="password" type="password" />
        <GBInput required label="First Name" name="name.firstName" />
        <GBInput label="Middle Name" name="name.middleName" />
        <GBInput required label="Last Name" name="name.lastName" />
        <GBInput required label="Email" name="email" type="email" />
        <GBInput required label="Phone" name="phone" />
        <GBInput required label="Address" name="address" />

        <Button
          className="mt-3"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
        >
          {isPending ? "Loading..." : "Signup"}
        </Button>
      </GBForm>
    </div>
  );
}
