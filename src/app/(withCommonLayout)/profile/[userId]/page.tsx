import { VerifyBadgeIcon } from "@/src/components/icons";
import { getSingleUser, getUsersFollower } from "@/src/services/User";
import { TUser } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";

export interface IProfileProps {
  params: { userId: string };
}
export default async function Profile({ params }: IProfileProps) {
  const { userId } = params;

  const data = await getSingleUser(userId);
  const userData: TUser = data?.data;
  const followerData = await getUsersFollower(userId);

  const followers = followerData?.data?.followers;
  const following = followerData?.data?.following;

  return (
    <div>
      <div className="relative w-full">
        <div>
          <Image
            src={userData.coverPhoto}
            alt={`Cover Photo of ${userData.name?.firstName} ${userData.name?.middleName} ${userData.name?.lastName}`}
            width={1250}
            height={700}
            className="w-full max-h-[400px]"
          />
        </div>

        <div className="rounded-full absolute left-1/2  bottom-0 transform -translate-x-1/2 lg:left-[200px] translate-y-1/2 border-3">
          <Image
            src={userData.profilePhoto}
            alt={`Profile Photo of ${userData.name?.firstName} ${userData.name?.middleName} ${userData.name?.lastName}`}
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="lg:ml-[400px] mt-[150px] md:mt-[200px] lg:mt-5 ">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <h2 className="text-4xl font-bold">
            {userData.name?.firstName} {userData.name?.middleName}
            {userData.name?.lastName}
          </h2>
          {userData.plan === "premium" && (
            <span>
              <Tooltip content="Verified premium user">
                <button>
                  <VerifyBadgeIcon size={18} />
                </button>
              </Tooltip>
            </span>
          )}
        </div>
        <p className="text-bold">{userData.address}</p>
        {userData.bio && (
          <p className="mt-2">
            <span className="font-bold">Bio:</span>{" "}
            <span className="text-sm">{userData.bio}</span>
          </p>
        )}

        <div className="flex gap-3 items-start mt-2">
          <p className="hover:underline cursor-pointer">
            Followed by {followers?.length} people
          </p>
          <p className="hover:underline cursor-pointer">
            Following {following?.length} people
          </p>
        </div>
      </div>
    </div>
  );
}
