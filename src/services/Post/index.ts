"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");
    revalidateTag("photos");
    revalidateTag("usersPosts");

    return data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};

export const updatePost = async (
  formData: FormData,
  postId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/update-post/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("posts");
    revalidateTag("photos");
    revalidateTag("usersPosts");

    return data;
  } catch (error) {
    throw new Error("Failed to update post");
  }
};

export const getLatestPhotos = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/posts/photos/latest-photos`,
    fetchOption
  );

  return res.json();
};

export const getAllPosts = async (page: number, limit: number) => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/posts?page=${page}&limit=${limit}`,
    fetchOption
  );

  return res.json();
};

export const getUserPosts = async (userId: string): Promise<any> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const fetchOption = {
      next: {
        tags: ["usersPosts"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/posts/user/${userId}`,
      fetchOption
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to get the user's follower");
  }
};

export const getMonthlyPosts = async (): Promise<any> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const fetchOption = {
      next: {
        tags: ["monthlyPosts"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${envConfig.baseApi}/posts/get-monthly-posts`,
      fetchOption
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to get monthly posts");
  }
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

export const deleteSinglePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${id}`);

    revalidateTag("posts");
    revalidateTag("usersPosts");

    return data;
  } catch (error) {
    throw new Error("Failed to delete post");
  }
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
export const updateComment = async (
  commentData: string,
  commentId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/comment/update/${commentId}`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("comment");

    return data;
  } catch (error) {
    throw new Error("Failed to update comment");
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

export const deleteSingleComment = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/comment/${id}`);

    revalidateTag("comment");

    return data;
  } catch (error) {
    throw new Error("Failed to delete comment");
  }
};
