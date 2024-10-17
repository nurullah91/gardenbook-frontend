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

export const updateProfilePicture = async (
  formData: FormData,
  userId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/update-profile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("follower");
    revalidateTag("user");

    return data;
  } catch (error) {
    throw new Error("Failed to update profile picture");
  }
};

export const updateCoverPhoto = async (
  formData: FormData,
  userId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/update-cover/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("follower");
    revalidateTag("user");

    return data;
  } catch (error) {
    throw new Error("Failed to update cover photo");
  }
};

export const updateUser = async (userData: any, userId: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/update-user/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("users");
    revalidateTag("followers");

    return data;
  } catch (error) {
    throw new Error("Failed to update user details");
  }
};

export const makePayment = async (userData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/payment`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("users");
    revalidateTag("followers");

    return data;
  } catch (error) {
    throw new Error("Failed to payment");
  }
};

export const followUser = async (followData: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/follower/follow-user",
      followData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("follower");

    return data;
  } catch (error) {
    throw new Error("Failed to follow");
  }
};

export const unfollowUser = async (unfollowData: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/follower/unfollow-user",
      unfollowData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("follower");

    return data;
  } catch (error) {
    throw new Error("Failed to unfollow");
  }
};
