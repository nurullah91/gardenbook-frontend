"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

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

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return decodedToken;
    // return {
    //   _id: decodedToken._id,
    //   name: decodedToken.name,
    //   email: decodedToken.email,
    //   mobileNumber: decodedToken.mobileNumber,
    //   role: decodedToken.role,
    //   status: decodedToken.status,
    //   profilePhoto: decodedToken.profilePhoto,
    // };
  }

  return decodedToken;
};
