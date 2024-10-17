"use client";

import { TUser } from "@/src/types";
import GBModal from "../../modal/GBModal";
import { useDisclosure } from "@nextui-org/modal";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { VerifyBadgeIcon } from "../../icons";

export interface IDisplayFlowerFlowingProps {
  userData: { user: TUser; followers: TUser[]; following: TUser[] };
}
export default function DisplayFlowerFlowing({
  userData,
}: IDisplayFlowerFlowingProps) {
  const {
    isOpen: isOpenForFollower,
    onOpen: onOpenForFollower,
    onClose: onCloseForFollower,
  } = useDisclosure();

  const {
    isOpen: isOpenForFollowing,
    onOpen: onOpenForFollowing,
    onClose: onCloseForFollowing,
  } = useDisclosure();

  const handleViewFollower = () => {
    onOpenForFollower();
  };

  const handleViewFollowing = () => {
    onOpenForFollowing();
  };

  return (
    <div>
      {/* Modal for display follower */}
      <GBModal
        isOpen={isOpenForFollower}
        onClose={onCloseForFollower}
        modalTitle="Follower"
        footerCancelButtonText="Ok"
      >
        <div>
          {userData.followers.map((follower) => (
            <div key={follower._id}>
              <div className="flex items-center p-4">
                <Link href={`/profile/${follower._id}`}>
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={follower.profilePhoto}
                    alt={`${follower.name.firstName} ${follower.name.lastName}`}
                  />
                </Link>
                <div className="ml-3">
                  <div className="flex gap-2 items-center justify-start">
                    <Link href={`/profile/${follower._id}`}>
                      <h4 className="text-lg font-semibold cursor-pointer">
                        {`${follower.name.firstName} ${follower.name?.middleName} ${follower.name.lastName}`}
                      </h4>
                    </Link>
                    {follower.plan === "premium" && (
                      <span>
                        <Tooltip content="Verified premium user">
                          <button>
                            <VerifyBadgeIcon size={18} />
                          </button>
                        </Tooltip>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GBModal>

      {/* Modal for display following */}
      <GBModal
        isOpen={isOpenForFollowing}
        onClose={onCloseForFollowing}
        modalTitle="Following"
        footerCancelButtonText="Ok"
      >
        <div>
          {userData.following.map((follower) => (
            <div key={follower._id}>
              <div className="flex items-center p-4">
                <Link href={`/profile/${follower._id}`}>
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={follower.profilePhoto}
                    alt={`${follower.name.firstName} ${follower.name.lastName}`}
                  />
                </Link>
                <div className="ml-3">
                  <div className="flex gap-2 items-center justify-start">
                    <Link href={`/profile/${follower._id}`}>
                      <h4 className="text-lg font-semibold cursor-pointer">
                        {`${follower.name.firstName} ${follower.name?.middleName} ${follower.name.lastName}`}
                      </h4>
                    </Link>
                    {follower.plan === "premium" && (
                      <span>
                        <Tooltip content="Verified premium user">
                          <button>
                            <VerifyBadgeIcon size={18} />
                          </button>
                        </Tooltip>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GBModal>

      <div className="flex gap-3 items-start mt-2">
        <button
          onClick={handleViewFollower}
          className="hover:underline cursor-pointer text-xs"
        >
          Followed by {userData.followers?.length} people
        </button>
        <button
          onClick={handleViewFollowing}
          className="hover:underline cursor-pointer text-xs"
        >
          Following {userData.following?.length} people
        </button>
      </div>
    </div>
  );
}
