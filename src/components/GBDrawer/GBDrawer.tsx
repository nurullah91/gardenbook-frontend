"use client";

import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { SearchIcon, VerifyBadgeIcon } from "../icons";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { getAllPosts } from "@/src/services/Post";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { TUser } from "@/src/types";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Quotes from "../UI/Quotes/Quotes";
import GBModal from "../modal/GBModal";
import { useDisclosure } from "@nextui-org/modal";
import { getAllOnlineUsers } from "@/src/services/User";
import { Spinner } from "@nextui-org/spinner";

export interface IDrawerProps {
  onlineUsers: TUser[];
  meta: { page: number; limit: number; total: number; totalPage: number };
}

const GBDrawer = ({ onlineUsers, meta }: IDrawerProps) => {
  const { user, setPosts } = useUser();
  const [search, setSearch] = useState<string>("");
  const [onlineUserSearch, setOnlineUserSearch] = useState<string>("");
  const [contentType, setContentType] = useState<string>("free");
  const [sortOrder, setSortOrder] = useState<string>("-createdAt");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [moreOnlineUser, setMoreOnlineUser] = useState<TUser[]>([]);
  const [moreOnlineUserLoading, setMoreOnlineUserLoading] =
    useState<boolean>(false);

  // debounce the search functionality
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedOnlineUserSearch, setDebouncedOnlineUserSearch] =
    useState(onlineUserSearch);

  const {
    isOpen: isOpenForActiveUser,
    onOpen: onOpenForActiveUser,
    onClose: onCloseActiveUser,
  } = useDisclosure();

  // More online user to show on modal
  const handleMoreOnlineUser = async () => {
    setMoreOnlineUserLoading(true);
    onOpenForActiveUser();

    const moreOnlineUsers = await getAllOnlineUsers([
      { name: "page", value: 1 },
      { name: "limit", value: 20 },
      { name: "sort", value: "-updatedAt" },
    ]);

    setMoreOnlineUser(moreOnlineUsers?.data);
    setMoreOnlineUserLoading(false);
  };

  // Searched online user to show on modal
  const searchMoreOnlineUser = async () => {
    const moreOnlineUsers = await getAllOnlineUsers([
      { name: "searchTerm", value: debouncedOnlineUserSearch },
      { name: "page", value: 1 },
      { name: "limit", value: 20 },
      { name: "sort", value: "-totalUpvoteGained" },
    ]);

    setMoreOnlineUser(moreOnlineUsers?.data);
  };

  // Search on Modal for active user
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedOnlineUserSearch(onlineUserSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [onlineUserSearch]);

  useEffect(() => {
    if (debouncedOnlineUserSearch) {
      searchMoreOnlineUser();
    }
  }, [debouncedOnlineUserSearch]);

  // Post search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    // timeout cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = async () => {
    // Filter out query params undefined value
    const queryParams = [
      { name: "searchTerm", value: debouncedSearch },
      { name: "contentType", value: user?.plan === "premium" ? "all" : "free" },
      { name: "sort", value: "upvoteCount" },
    ].filter((item) => item.value !== undefined);

    const posts = await getAllPosts(queryParams);

    setPosts(posts?.data);
  };

  const handlePremiumContent = async () => {
    // Filter out query params undefined value
    const queryParams = [
      { name: "contentType", value: contentType },
      { name: "sort", value: sortOrder },
    ];

    const posts = await getAllPosts(queryParams);

    setPosts(posts?.data);
  };

  const handleReset = async () => {
    const queryParams = [
      { name: "contentType", value: user?.plan === "premium" ? "all" : "free" },
      { name: "sort", value: "-createdAt" },
    ].filter((item) => item.value !== undefined);

    const posts = await getAllPosts(queryParams);

    setPosts(posts?.data);
  };

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    handlePremiumContent();
  }, [contentType, sortOrder]);

  const basicFilter = [
    {
      key: "sortByUpvote",
      label: "Sort by upvote",
      event: () => setSortOrder("upvoteCount"),
    },
    {
      key: "reset",
      label: "Reset",
      event: () => handleReset(),
    },
  ];
  const premiumFilter = [
    {
      key: "premium",
      label: "Premium Content",
      event: () => setContentType("premium"),
    },
    {
      key: "free",
      label: "Free Content",
      event: () => setContentType("free"),
    },
    {
      key: "all",
      label: "All Content",
      event: () => setContentType("all"),
    },
  ];

  const filterItems =
    user?.plan === "premium" ? [...premiumFilter, ...basicFilter] : basicFilter;

  return (
    <div>
      {/* Modal of all active user */}
      <GBModal
        isOpen={isOpenForActiveUser}
        onClose={onCloseActiveUser}
        modalTitle="Active Users"
        footerCancelButtonText="Okay"
      >
        {moreOnlineUserLoading ? (
          <div className="flex items-center justify-center w-full min-h-full">
            <Spinner size="lg" />
          </div>
        ) : moreOnlineUser.length ? (
          <div>
            <div className="mb-5">
              <Input
                classNames={{
                  base: "w-full h-6",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                onChange={(e) => setOnlineUserSearch(e.target.value)}
                type="search"
              />
            </div>
            <div>
              {moreOnlineUser?.map((user) => (
                <div key={user._id} className="my-2">
                  <div className="flex gap-2 items-center justify-start">
                    <div className="relative">
                      <Image
                        src={user.profilePhoto}
                        width={35}
                        height={35}
                        className="rounded-full"
                        alt="user"
                      />
                      <span className="min-w-[10px] min-h-[10px] rounded-full bg-green-600 absolute bottom-0 right-0 border" />
                    </div>
                    <Link href={`/profile/${user?._id}`}>
                      <h4 className="cursor-pointer">
                        {`${user?.name.firstName} ${user?.name?.middleName} ${user?.name.lastName}`}
                      </h4>
                    </Link>
                    {user?.plan === "premium" && (
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
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full min-h-full">
            <h2 className="text-3xl text-center font-semibold">
              No one is online
            </h2>
          </div>
        )}
      </GBModal>

      {/* Main content of side bar */}
      <div className="shadow-lg p-4 shadow-blue-600/30 md:h-screen h-fit md:w-60 w-full rounded-md overflow-auto bg-default-100">
        <div className="block md:hidden">
          <button onClick={() => setOpenDrawer(!openDrawer)}>
            {openDrawer ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <HiOutlineMenuAlt1 className="text-2xl" />
            )}
          </button>
        </div>
        <div className={`md:flex flex-col ${openDrawer ? "block" : "hidden"}`}>
          <div>
            <div className="text-xl font-bold">
              <Input
                classNames={{
                  base: "w-full h-6",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
              />
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="shadow"
                    size="sm"
                    fullWidth
                    endContent={<IoIosArrowDown />}
                  >
                    Sort by
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={filterItems}>
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      color={item.key === "reset" ? "danger" : "default"}
                      className={item.key === "delete" ? "text-danger" : ""}
                      onClick={item.event}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {/* Active users */}
          <div>
            <div>
              <h4 className="font-semibold my-2">
                Active users ({meta?.total} Online)
              </h4>
              <div>
                {onlineUsers?.map((user) => (
                  <div key={user._id} className="my-2">
                    <div className="flex gap-2 items-center justify-start">
                      <div className="relative">
                        <Image
                          src={user.profilePhoto}
                          width={30}
                          height={30}
                          className="rounded-full"
                          alt="user"
                        />
                        <span className="min-w-[10px] min-h-[10px] rounded-full bg-green-600 absolute bottom-0 right-0 border" />
                      </div>
                      <Link href={`/profile/${user?._id}`}>
                        <h4 className="text-xs cursor-pointer">
                          {`${user?.name.firstName} ${user?.name?.middleName} ${user?.name.lastName}`}
                        </h4>
                      </Link>
                      {user?.plan === "premium" && (
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
                ))}
              </div>
              <button className="underline" onClick={handleMoreOnlineUser}>
                see more
              </button>
            </div>

            {/* Quote */}

            <Quotes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GBDrawer;
