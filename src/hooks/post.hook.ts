import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createComment,
  createDownvote,
  createPost,
  createUpvote,
  deleteSingleComment,
  deleteSinglePost,
  updateComment,
  updatePost,
} from "../services/Post";

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
export const useUpdatePost = (postId: string) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async (postData) => await updatePost(postData, postId),

    onSuccess: () => {
      toast.success("Post updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (id) => await deleteSinglePost(id),

    onSuccess: () => {
      toast.success("Post deleted successfully");
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
export const useCreateCommentOnPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["comment"],
    mutationFn: async (commentData) => await createComment(commentData),

    onSuccess: () => {
      toast.success("Comment added successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Comment on post hooks
export const useUpdateComment = (commentId: string) => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async (commentData) =>
      await updateComment(commentData, commentId),

    onSuccess: () => {
      toast.success("Comment updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (id) => await deleteSingleComment(id),

    onSuccess: () => {
      toast.success("Comment deleted successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
