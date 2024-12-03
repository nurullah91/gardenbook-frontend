import { VerifyBadgeIcon } from "@/src/components/icons";
import PostCard from "@/src/components/UI/PostCard/PostCard";
import ActionButtons from "@/src/components/UI/Profile/ActionButtons";
import ChangeCoverPhoto from "@/src/components/UI/Profile/ChangeCoverPhoto";
import ChangeProfile from "@/src/components/UI/Profile/ChangeProfile";
import DisplayFlowerFlowing from "@/src/components/UI/Profile/DisplayFlowerFlowing";
import { getUserPosts } from "@/src/services/Post";
import { getUsersFollower } from "@/src/services/User";
import { TPost, TUser } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import { Metadata } from "next";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Profile of a user. View details of a user and manage user's details like profile photo cover photo bio etc by the owner of the profile",
};
export interface IProfileProps {
  params: { userId: string };
}
export default async function Profile({ params }: IProfileProps) {
  const { userId } = params;

  const followerData = await getUsersFollower(userId);
  const userPosts = await getUserPosts(userId);

  const userData: { user: TUser; followers: TUser[]; following: TUser[] } = {
    user: followerData?.data?.user,
    followers: followerData?.data?.followers,
    following: followerData?.data?.following,
  };

  return (
    <div>
      <div className="relative w-full">
        <div>
          {/* Cover Photo */}
          <Image
            src={userData.user.coverPhoto}
            alt={`Cover Photo of ${userData.user.name?.firstName} ${userData.user.name?.middleName} ${userData.user.name?.lastName}`}
            width={1250}
            height={700}
            className="w-full max-h-[300px]"
          />
          <div className="absolute right-5 bottom-3">
            <ChangeCoverPhoto userData={userData.user} />
          </div>
        </div>

        {/* Profile photo */}
        <div className="rounded-full absolute left-1/2  bottom-0 transform -translate-x-1/2 lg:left-[200px] translate-y-1/2 border-3 border-default-50">
          <div className="relative">
            <div className="w-[250px] h-[250px] ">
              <Image
                src={userData.user.profilePhoto}
                alt={`Profile Photo of ${userData.user.name?.firstName} ${userData.user.name?.middleName} ${userData.user.name?.lastName}`}
                width={250}
                height={250}
                className="rounded-full w-full h-full"
              />
              {userData.user.isOnline && (
                <span className="size-6 rounded-full bg-green-600 absolute bottom-6 right-6 border-2 border-default-50 z-0" />
              )}
            </div>
            <div className="absolute bottom-4 right-4 z-10">
              <ChangeProfile userData={userData.user} />
            </div>
          </div>
        </div>
      </div>

      {/* User's Details */}

      <div className="lg:ml-[350px] mt-[150px] md:mt-[200px] lg:mt-5 ">
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-between items-start">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <h2 className="text-4xl font-bold">
                {userData.user.name?.firstName} {userData.user.name?.middleName}
                {userData.user.name?.lastName}
              </h2>
              {userData.user.plan === "premium" && (
                <span>
                  <Tooltip content="Verified premium user">
                    <button>
                      <VerifyBadgeIcon size={18} />
                    </button>
                  </Tooltip>
                </span>
              )}
            </div>
            <p className="text-bold flex items-center gap-2">
              <FaLocationDot className="text-xl" /> {userData.user.address}
            </p>
            {userData.user.bio && (
              <p className="mt-2">
                <span className="font-bold">Bio:</span>{" "}
                <span className="text-sm">{userData.user.bio}</span>
              </p>
            )}

            <DisplayFlowerFlowing userData={userData} />

            <div className="flex gap-3 items-start mt-2">
              <p className=" cursor-default text-xs">
                Total upvote gained {userData?.user.totalUpvoteGained}
              </p>
              <p className="cursor-default text-xs">
                Total downvote gained {userData.user.totalDownvoteGained}
              </p>
            </div>
          </div>
          {/* Action buttons */}
          <div>
            <ActionButtons userData={userData} />
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div>
        {userPosts?.data?.length > 0 ? (
          <div>
            <h3 className="text-2xl font-bold border-b-2 mb-6 py-2">Posts</h3>
            {userPosts?.data?.map((postData: TPost, index: number) => (
              <PostCard postData={postData} key={index} />
            ))}
          </div>
        ) : (
          <h2 className="text-2xl text-center font-bold mt-20">
            No post to show
          </h2>
        )}
      </div>
    </div>
  );
}
