"use sever";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createComment = async (commentData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comment/create", commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("posts");
    revalidateTag("comment");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to comment on post");
  }
};

export const getSinglePostComments = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/comment/${postId}`);

    revalidateTag("posts");
    revalidateTag("comment");

    return data;
  } catch (error) {
    throw new Error("Failed to get comments of the post");
  }
};
