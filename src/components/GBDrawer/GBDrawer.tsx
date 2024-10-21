"use client";

import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { getAllPosts } from "@/src/services/Post";

const GBDrawer: React.FC = () => {
  const { user, setPosts } = useUser();
  const [search, setSearch] = useState<string>("");
  const [contentType, setContentType] = useState<string>("free");
  const [sortOrder, setSortOrder] = useState<string>("-createdAt");

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
    // Fetch Room Data with pagination and search

    const posts = await getAllPosts(queryParams);

    setPosts(posts?.data);
  };

  const handlePremiumContent = async () => {
    // Filter out query params undefined value
    const queryParams = [
      { name: "contentType", value: contentType },
      { name: "sort", value: sortOrder },
    ];
    // Fetch Room Data with pagination and search

    const posts = await getAllPosts(queryParams);

    setPosts(posts?.data);
  };

  const handleReset = () => {
    setContentType("free");

    setSortOrder("-createdAt");

    setSearch("");
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    handlePremiumContent();
  }, [contentType]);

  return (
    <div className="shadow-lg p-4 shadow-blue-600/30 md:h-screen h-fit md:w-60 w-full rounded-md">
      <h2 className="text-xl font-bold">
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
      </h2>
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
  );
};

export default GBDrawer;
