import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser, followUser, unfollowUser } from "../services/User";
import {
  changePassword,
  forgetPassword,
  resetPassword,
} from "../services/Auth";

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

    onSuccess: () => {
      toast.success("Password reset successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
