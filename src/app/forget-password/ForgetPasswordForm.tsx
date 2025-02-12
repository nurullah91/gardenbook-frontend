"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { forgetPasswordSchema } from "@/src/schema";
import GBInput from "@/src/components/form/GBInput";
import GBForm from "@/src/components/form/GBForm";
import { useForgetPassword } from "@/src/hooks/user.hooks";
import { useEffect } from "react";

export interface IForgetPasswordFormProps {}
export default function ForgetPasswordForm({}: IForgetPasswordFormProps) {
  const {
    mutate: handleEmailSend,
    isPending,
    isSuccess,
    data,
  } = useForgetPassword();

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string);
    } else if (data && data?.success) {
      toast.success(data.message);
    }
  }, [data]);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleEmailSend(JSON.stringify(data));
  };

  return (
    <div>
      <GBForm
        onSubmit={handleSubmit}
        resolver={zodResolver(forgetPasswordSchema)}
      >
        <GBInput required label="Email" name="email" type="email" />

        <Button
          className="my-3"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isPending ? "Sending..." : "Send Email"}
        </Button>
      </GBForm>
      <div>
        {!isPending && isSuccess && (
          <p className="text-red-500 text-xs my-2">
            An email sent to your email with reset password link
          </p>
        )}
      </div>
    </div>
  );
}
