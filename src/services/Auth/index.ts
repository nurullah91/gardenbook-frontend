"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const signupUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
      return data;
    }
  } catch (error: any) {
    // Throw the error with the response from the backend
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data)); // Stringify the response for passing it as a string
    }
    throw new Error(error.message || "Something went wrong");
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
      return data;
    }
  } catch (error: any) {
    // Throw the error with the response from the backend
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data)); // Stringify the response for passing it as a string
    }
    throw new Error(error.message || "Something went wrong");
  }
};
