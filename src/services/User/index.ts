"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/users`);

    revalidateTag("users");

    return data;
  } catch (error) {
    throw new Error("Failed to get all users");
  }
};

export const getSingleUser = async (userId: string): Promise<any> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const fetchOption = {
      next: {
        tags: ["user"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/users/${userId}`,
      fetchOption
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to get the user");
  }
};
export const getUsersFollower = async (userId: string): Promise<any> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const fetchOption = {
      next: {
        tags: ["follower"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/follower/${userId}`,
      fetchOption
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to get the user's follower");
  }
};
