"use client";
//import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import GBForm from "@/src/components/form/GBForm";
import GBInput from "@/src/components/form/GBInput";
import { signupSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useUser } from "@/src/context/user.provider";
import { useSignupUser } from "@/src/hooks/user.hooks";

export interface ILoginFormProps {}
export default function SignupForm({}: ILoginFormProps) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleSignup, isPending, data } = useSignupUser();

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string);
    } else if (data && data?.success) {
      toast.success(data.message);

      router.push("/");
    }
  }, [data]);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleSignup(JSON.stringify(data));
    userLoading(true);
  };

  return (
    <div>
      <GBForm resolver={zodResolver(signupSchema)} onSubmit={handleSubmit}>
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
