import { VerifyBadgeIcon } from "@/src/components/icons";
import PostCard from "@/src/components/posts/PostCard";
import ActionButtons from "@/src/components/UI/Profile/ActionButtons";
import ChangeCoverPhoto from "@/src/components/UI/Profile/ChangeCoverPhoto";
import ChangeProfile from "@/src/components/UI/Profile/ChangeProfile";
import DisplayFlowerFlowing from "@/src/components/UI/Profile/DisplayFlowerFlowing";
import { getUserPosts } from "@/src/services/Post";
import { getUsersFollower } from "@/src/services/User";
import { TPost, TUser } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

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
        <div className="rounded-full absolute left-1/2  bottom-0 transform -translate-x-1/2 lg:left-[200px] translate-y-1/2 border-3">
          <div className="relative">
            <div className="w-[250px] h-[250px] ">
              <Image
                src={userData.user.profilePhoto}
                alt={`Profile Photo of ${userData.user.name?.firstName} ${userData.user.name?.middleName} ${userData.user.name?.lastName}`}
                width={250}
                height={250}
                className="rounded-full w-full h-full"
              />
            </div>
            <div className="absolute bottom-4 right-4">
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
            {" "}
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
