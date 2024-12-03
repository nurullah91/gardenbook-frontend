"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { TQueryParam } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async (args: TQueryParam[]): Promise<any> => {
  const params = new URLSearchParams();

  if (args) {
    args.forEach((item: TQueryParam) => {
      params.append(item.name, item.value as string);
    });
  }
  try {
    const fetchOption = {
      next: {
        tags: ["users"],
        revalidate: 3600,
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/users?${params}`,
      fetchOption
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
      data: [],
      meta: {},
    };
  }
};

export const getActiveUsers = async (): Promise<any> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const fetchOption = {
      next: {
        tags: ["activeUsers"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    // use fetch method to cache the data and pre render
    const res = await fetch(
      `${envConfig.baseApi}/users/active/get-all-users`,
      fetchOption
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to get active users data");
  }
};

export const getAllOnlineUsers = async (args: TQueryParam[]): Promise<any> => {
  const params = new URLSearchParams();

  if (args) {
    args.forEach((item: TQueryParam) => {
      params.append(item.name, item.value as string);
    });
  }
  try {
    const fetchOption = {
      next: {
        tags: ["onlineUsers"],
        revalidate: 1200,
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/users/online/all-online-users?${params}`,
      fetchOption
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getMonthlyPayments = async (): Promise<any> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const fetchOption = {
      next: {
        tags: ["monthlyPayments"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/payment/get-monthly-payments`,
      fetchOption
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to get monthly payments");
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

export const deleteUser = async (userId: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${userId}`);

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
