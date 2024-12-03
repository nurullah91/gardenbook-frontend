"use client";

import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hooks";
import { getUsersFollower } from "@/src/services/User";
import { TUser } from "@/src/types";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

export interface IFollowUnfollowButtonProps {
  userId: string;
}
export default function FollowUnfollowButton({
  userId,
}: IFollowUnfollowButtonProps) {
  const { mutate: followUser, isPending: followIsPending } = useFollowUser();
  const { mutate: unfollowUser, isPending: unfollowIsPending } =
    useUnfollowUser();
  const { user } = useUser();
  const [userData, setUserData] = useState<{
    user: TUser;
    followers: TUser[];
    following: TUser[];
  } | null>(null);

  const handleFetchFollower = async () => {
    const followerData = await getUsersFollower(userId);

    const userFollowerData: {
      user: TUser;
      followers: TUser[];
      following: TUser[];
    } = {
      user: followerData?.data?.user,
      followers: followerData?.data?.followers,
      following: followerData?.data?.following,
    };

    setUserData(userFollowerData);
  };

  useEffect(() => {
    handleFetchFollower();
  }, []);

  const handleFollow = () => {
    const followData = {
      userId: user?._id,
      targetUserId: userData?.user._id,
    };

    followUser(JSON.stringify(followData));
  };

  const handleUnFollow = () => {
    const followData = {
      userId: user?._id,
      targetUserId: userData?.user._id,
    };

    unfollowUser(JSON.stringify(followData));
  };

  const isFollowingThisUser = userData?.followers?.find(
    (follower) => follower._id === user?._id
  );

  return (
    <>
      {isFollowingThisUser ? (
        <button
          className="border-2 border-default-400 text-xs px-2 py-1 rounded-2xl ml-1 mb-1"
          onClick={handleUnFollow}
          disabled={unfollowIsPending}
        >
          <FiPlus className="text-lg inline" />
          Unfollow
        </button>
      ) : (
        <button
          className="border-2 border-default-400 text-xs px-2 py-1 rounded-2xl ml-1 mb-1"
          onClick={handleFollow}
          disabled={followIsPending}
        >
          <FiPlus className="text-lg inline" />
          Follow
        </button>
      )}
    </>
  );
}
