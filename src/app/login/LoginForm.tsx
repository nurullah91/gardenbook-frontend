"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { loginSchema } from "@/src/schema";
import GBInput from "@/src/components/form/GBInput";
import GBForm from "@/src/components/form/GBForm";
import { useUser } from "@/src/context/user.provider";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "@heroui/link";
import { useLoginUser } from "@/src/hooks/user.hooks";

export interface ILoginFormProps {}
export default function LoginForm({}: ILoginFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleLogin, isPending, data } = useLoginUser();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const adminCredentials = {
    email: "admin.gardenbook@gmail.com",
    password: "admin1234",
  };

  const userCredentials = {
    email: "user.gardenbook@gmail.com",
    password: "user1234",
  };

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string);
    } else if (data && data?.success) {
      toast.success(data.message);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [data]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleLogin(JSON.stringify(data));
    userLoading(true);
  };

  return (
    <div>
      <div>
        <h3 className="text-orange-600 my-2 text-sm">
          For Testing purpose of the website, here are some credentials
        </h3>
        <Button
          size="sm"
          className="mr-2 mb-2"
          variant="bordered"
          color="primary"
          radius="lg"
          onClick={() => setLoginCredentials(adminCredentials)}
        >
          Admin credentials
        </Button>
        <Button
          size="sm"
          variant="bordered"
          color="primary"
          radius="lg"
          onClick={() => setLoginCredentials(userCredentials)}
        >
          User credentials
        </Button>
      </div>
      <GBForm
        onSubmit={handleSubmit}
        resolver={zodResolver(loginSchema)}
        defaultValues={loginCredentials}
      >
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
          fullWidth
          color="primary"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </GBForm>
    </div>
  );
}
