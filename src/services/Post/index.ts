"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { TComment } from "@/src/types";
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

export const getSinglePost = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["post"],
    },
  };
  const res = await fetch(`${envConfig.baseApi}/posts/${id}`, fetchOption);

  return res.json();
};

export const getSinglePostVoter = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["voters"],
    },
  };
  const res = await fetch(`${envConfig.baseApi}/vote/${id}`, fetchOption);

  return res.json();
};

export const createUpvote = async (votingData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/vote/upvote", votingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("posts");
    revalidateTag("voters");

    return data;
  } catch (error) {
    throw new Error("Failed to vote on post");
  }
};
export const createDownvote = async (votingData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/vote/downvote", votingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("posts");
    revalidateTag("voters");

    return data;
  } catch (error) {
    throw new Error("Failed to vote on post");
  }
};

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
