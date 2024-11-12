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
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

export interface IDrawerProps {
  onlineUsers: TUser[];
}

const GBDrawer = ({ onlineUsers }: IDrawerProps) => {
  const { user, setPosts } = useUser();
  const [search, setSearch] = useState<string>("");
  const [contentType, setContentType] = useState<string>("free");
  const [sortOrder, setSortOrder] = useState<string>("-createdAt");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // debounce the search functionality
  const [debouncedSearch, setDebouncedSearch] = useState(search);

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

  // {user?.plan === "premium" && (
  //   <div className="flex flex-row md:flex-col gap-3 flex-wrap sm:flex-nowrap">
  //     <Button
  //       variant="shadow"
  //       size="sm"
  //       fullWidth
  //       onClick={}
  //     >
  //       Premium content
  //     </Button>
  //     <Button
  //       variant="shadow"
  //       size="sm"
  //       fullWidth
  //       onClick={() => setContentType("free")}
  //     >
  //       Free content
  //     </Button>
  //
  //   </div>
  // )}

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
    <div className="shadow-lg p-4 shadow-blue-600/30 md:h-screen h-fit md:w-60 w-full rounded-md">
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
              <Button variant="shadow" size="sm" fullWidth>
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

      <div>
        <h4 className="font-semibold my-2">Active users</h4>
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
      </div>
    </div>
  );
};

export default GBDrawer;
