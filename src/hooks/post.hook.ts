import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createComment,
  createDownvote,
  createPost,
  createUpvote,
} from "../services/Post";
import {
  updateCoverPhoto,
  updateProfilePicture,
  updateUser,
} from "../services/User";

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

export const useUpdateProfilePicture = (userId: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_PROFILE_PICTURE", userId],
    mutationFn: async (photoData) =>
      await updateProfilePicture(photoData, userId),

    onSuccess: () => {
      toast.success("Profile picture updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCoverPhoto = (userId: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_COVER_PHOTO", userId],
    mutationFn: async (photoData) => await updateCoverPhoto(photoData, userId),

    onSuccess: () => {
      toast.success("Cover photo updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateUserData = (userId: any) => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPDATE_USER_DATA", userId],
    mutationFn: async (userData) => await updateUser(userData, userId),

    onSuccess: () => {
      toast.success("User data updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
