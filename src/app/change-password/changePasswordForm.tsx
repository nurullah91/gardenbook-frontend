"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { changePasswordSchema } from "@/src/schema";
import GBInput from "@/src/components/form/GBInput";
import GBForm from "@/src/components/form/GBForm";
import { useUser } from "@/src/context/user.provider";
import { useChangePassword } from "@/src/hooks/user.hooks";

export default function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { setIsLoading: userLoading } = useUser();
  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
  } = useChangePassword();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleChangePassword(JSON.stringify(data));
    userLoading(true);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <GBForm
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
      >
        <GBInput required label="Old Password" name="oldPassword" type="text" />
        <GBInput required label="New Password" name="newPassword" type="text" />
        <Button
          className="mt-3"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
        >
          {isPending ? "Loading..." : "Change password"}
        </Button>
      </GBForm>
    </div>
  );
}
