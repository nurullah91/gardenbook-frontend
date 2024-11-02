import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser, followUser, unfollowUser } from "../services/User";
import {
  changePassword,
  forgetPassword,
  loginUser,
  resetPassword,
  signupUser,
} from "../services/Auth";
import {
  updateCoverPhoto,
  updateProfilePicture,
  updateUser,
} from "../services/User";

export const useSignupUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData: string) => await signupUser(userData),
  });
};

export const useLoginUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_SIGNIN"],
    mutationFn: async (userData: string) => await loginUser(userData),
  });
};

export const useFollowUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (followData) => await followUser(followData),

    onSuccess: () => {
      toast.success("Follow done");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnfollowUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async (followData) => await unfollowUser(followData),

    onSuccess: () => {
      toast.success("Unfollow done");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id) => await deleteUser(id),

    onSuccess: () => {
      toast.success("User deleted successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (passwordData) => await changePassword(passwordData),

    onSuccess: () => {
      toast.success("Password changed successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (passwordData) => await forgetPassword(passwordData),
  });
};

export const useResetPassword = (token: string) => {
  return useMutation<any, Error, string>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (passwordData) =>
      await resetPassword(token, passwordData),
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
