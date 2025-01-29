import { TUser } from "@/src/types";
import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { VerifyBadgeIcon } from "../../icons";
import FollowUnfollowButton from "../FollowUnfollowButton";

export interface IUserCardProps {
  user: TUser;
  cardType: "general" | "upvoteGained";
}
export default function UserCard({ user, cardType }: IUserCardProps) {
  return (
    <div className="flex items-start mb-1" key={user._id}>
      <Link href={`/profile/${user?._id}`} className="relative">
        <Image
          width={48}
          height={48}
          className="rounded-full"
          src={user?.profilePhoto}
          alt={`${user?.name.firstName} ${user?.name.lastName}`}
        />
        {user.isOnline && (
          <span className="size-3 rounded-full bg-green-600 absolute bottom-0 right-0 border" />
        )}
      </Link>
      <div className="ml-3">
        <div>
          <div className="">
            <Link href={`/profile/${user?._id}`}>
              <span className="text-sm font-semibold cursor-pointer">
                {" "}
                {`${user?.name.firstName} ${user?.name?.middleName} ${user?.name.lastName}`}{" "}
              </span>
            </Link>
            {user?.plan === "premium" && (
              <span>
                <Tooltip content="Verified premium user">
                  <button>
                    <VerifyBadgeIcon size={15} />
                  </button>
                </Tooltip>
              </span>
            )}

            <FollowUnfollowButton userId={user._id} />
          </div>
        </div>

        {cardType === "upvoteGained" ? (
          <p className="text-xs text-gray-500">
            <span className="font-bold">{user?.totalUpvoteGained}</span> Upvote
            gained
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            <span className="font-bold">{user?.totalFollowers}</span> Followers
          </p>
        )}
      </div>
    </div>
  );
}
