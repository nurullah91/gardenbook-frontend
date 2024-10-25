"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { resetPasswordSchema } from "@/src/schema";
import GBInput from "@/src/components/form/GBInput";
import GBForm from "@/src/components/form/GBForm";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useResetPassword } from "@/src/hooks/user.hooks";

export interface IResetPasswordFormProps {}
export default function ResetPasswordForm({}: IResetPasswordFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const userId = searchParams.get("id");
  const resetToken = searchParams.get("resetToken");
  const {
    mutate: handleReset,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useResetPassword(resetToken as string);

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
    const resetPasswordData = {
      ...data,
      userId,
    };

    handleReset(JSON.stringify(resetPasswordData));
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess]);

  return (
    <div>
      <GBForm
        onSubmit={handleSubmit}
        resolver={zodResolver(resetPasswordSchema)}
      >
        <div className="relative">
          <GBInput
            required
            label="New Password"
            name="newPassword"
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
        <Button
          className="mt-3"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
        >
          {isPending ? "Loading..." : "Reset password"}
        </Button>
      </GBForm>
    </div>
  );
}
