"use client";

import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { getAllPosts } from "@/src/services/Post";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const GBDrawer: React.FC = () => {
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
  }, [contentType]);

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
          <div>
            <Button
              size="sm"
              fullWidth
              onClick={() => setSortOrder("upvoteCount")}
            >
              Sort by upvote
            </Button>
          </div>
          {user?.plan === "premium" && (
            <div className="flex flex-row md:flex-col gap-3 flex-wrap sm:flex-nowrap">
              <Button
                variant="shadow"
                size="sm"
                fullWidth
                onClick={() => setContentType("premium")}
              >
                Premium content
              </Button>
              <Button
                variant="shadow"
                size="sm"
                fullWidth
                onClick={() => setContentType("free")}
              >
                Free content
              </Button>
              <Button
                variant="shadow"
                size="sm"
                fullWidth
                onClick={() => setContentType("all")}
              >
                All content
              </Button>
            </div>
          )}

          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default GBDrawer;
