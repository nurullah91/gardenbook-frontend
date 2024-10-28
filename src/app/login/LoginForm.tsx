"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { loginUser } from "@/src/services/Auth";
import { loginSchema } from "@/src/schema";
import GBInput from "@/src/components/form/GBInput";
import GBForm from "@/src/components/form/GBForm";
import { useUser } from "@/src/context/user.provider";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "@nextui-org/link";

export interface ILoginFormProps {}
export default function LoginForm({}: ILoginFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { setIsLoading: userLoading } = useUser();
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
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleLogin(data);
    userLoading(true);
  };

  return (
    <div>
      <GBForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <GBInput required label="Email" name="email" type="email" />
        <div className="relative">
          <GBInput
            required
            label="Password"
            name="password"
            type={`${show ? "text" : "password"}`}
          />

          <button
            type="button"
            className="absolute top-5 right-2"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p className="mt-1">
          <Link
            href="/forget-password"
            className="text-sm font-bold hover:underline"
          >
            Forget Password?
          </Link>
        </p>

        <Button
          className="mt-2"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </GBForm>
    </div>
  );
}
