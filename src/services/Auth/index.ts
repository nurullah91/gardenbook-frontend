"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

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
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};
export const changePassword = async (passwordData: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      passwordData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("user");

    return data;
  } catch (error) {
    throw new Error("Failed to update password");
  }
};
