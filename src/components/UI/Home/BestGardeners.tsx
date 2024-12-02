"use client";

import { TUser } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import Link from "next/link";
import { VerifyBadgeIcon } from "../../icons";
import { getAllUsers } from "@/src/services/User";
import { useEffect, useState } from "react";
import UserLoadingSkeleton from "../UserLoadingSkeleton";

export default function BestGardeners() {
  const [gardenersToDisplay, setGardenersToDisplay] = useState<TUser[]>([]);
  const [userLoading, setUserLoading] = useState(false);

  const getBestGardeners = async () => {
    setUserLoading(true);
    try {
      const bestGardeners = await getAllUsers([
        { name: "page", value: 1 },
        { name: "limit", value: 3 },
        { name: "sort", value: "-totalUpvoteGained" },
      ]);

      setGardenersToDisplay(bestGardeners?.data || []);
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getBestGardeners();
  }, []);

  return (
    <div>
      {userLoading ? (
        <UserLoadingSkeleton />
      ) : gardenersToDisplay.length ? (
        <div className="flex flex-col gap-2">
          {gardenersToDisplay.map((user) => (
            <div className="flex items-center" key={user._id}>
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
                  <Link href={`/profile/${user?._id}`}>
                    <h4 className="text-sm font-semibold cursor-pointer">
                      {`${user?.name.firstName} ${user?.name?.middleName} ${user?.name.lastName}`}
                      {user?.plan === "premium" && (
                        <span>
                          <Tooltip content="Verified premium user">
                            <button>
                              <VerifyBadgeIcon size={15} />
                            </button>
                          </Tooltip>
                        </span>
                      )}
                    </h4>
                  </Link>
                </div>

                <p className="text-xs text-gray-500 cursor-pointer">
                  <span className="font-bold">{user?.totalUpvoteGained}</span>{" "}
                  Upvote gained
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="font-bold text-center">
          <h2>No Gardeners to show</h2>
        </div>
      )}
    </div>
  );
}
