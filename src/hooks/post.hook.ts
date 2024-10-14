import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createComment,
  createDownvote,
  createPost,
  createUpvote,
} from "../services/Post";
import { TComment } from "../types";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),

    onSuccess: () => {
      toast.success("Post created successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpvotePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["upvote"],
    mutationFn: async (voteData) => await createUpvote(voteData),

    onSuccess: () => {
      toast.success("vote added successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDownvotePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["upvote"],
    mutationFn: async (voteData) => await createDownvote(voteData),

    onSuccess: () => {
      toast.success("vote added successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useCommentPost = () => {
  return useMutation<any, Error, TComment>({
    mutationKey: ["upvote"],
    mutationFn: async (commentData) => await createComment(commentData),

    onSuccess: () => {
      toast.success("Comment added successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
