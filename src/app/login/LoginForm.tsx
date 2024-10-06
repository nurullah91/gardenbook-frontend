"use client";
import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";

import GBForm from "@/src/components/form/GBForm";
import GBInput from "@/src/components/form/GBInput";
import { loginSchema } from "@/src/schema";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/src/services/Auth";

export interface ILoginFormProps {}
export default function LoginForm({}: ILoginFormProps) {
  const {
    mutate: handleLogin,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useMutation({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData: FieldValues) => await loginUser(userData),
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
    handleLogin(data);
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
        <Button
          radius="sm"
          className="mt-3"
          size="sm"
          type="submit"
          isDisabled={isPending}
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </GBForm>
    </div>
  );
}
