"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const signupUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    console.log(data);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
