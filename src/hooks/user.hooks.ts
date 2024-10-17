import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { followUser, unfollowUser } from "../services/User";

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
