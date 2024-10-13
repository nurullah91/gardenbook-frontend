"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};

export const getAllPosts = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(`${envConfig.baseApi}/posts`, fetchOption);

  return res.json();
};
