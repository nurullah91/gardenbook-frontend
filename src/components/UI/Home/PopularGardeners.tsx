"use client";

import { TUser } from "@/src/types";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import Link from "next/link";
import { VerifyBadgeIcon } from "../../icons";
import { getAllUsers } from "@/src/services/User";
import { useEffect, useState } from "react";
import UserLoadingSkeleton from "../UserLoadingSkeleton";

export default function PopularGardeners() {
  const [gardenersToDisplay, setGardenersToDisplay] = useState<TUser[]>([]);
  const [userLoading, setUserLoading] = useState(false);

  const getPopularGardeners = async () => {
    setUserLoading(true);
    try {
      const popularGardeners = await getAllUsers([
        { name: "page", value: 1 },
        { name: "limit", value: 5 },
        { name: "sort", value: "-totalFollowers" },
      ]);

      setGardenersToDisplay(popularGardeners?.data || []);
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getPopularGardeners();
  }, []);

  return (
    <div>
      {userLoading ? (
        <UserLoadingSkeleton />
      ) : gardenersToDisplay.length ? (
        <div className="flex flex-col gap-2">
          {gardenersToDisplay.map((user) => (
            <div className="flex items-center" key={user._id}>
              <Link href={`/profile/${user?._id}`}>
                <Image
                  width={48}
                  height={48}
                  className="rounded-full"
                  src={user?.profilePhoto}
                  alt={`${user?.name.firstName} ${user?.name.lastName}`}
                />
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
                  <span className="font-bold">{user?.totalFollowers}</span>{" "}
                  Followers
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
