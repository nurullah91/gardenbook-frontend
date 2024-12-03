"use client";

import { TPost } from "@/src/types";
import PostCard from "../PostCard/PostCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllPosts } from "@/src/services/Post";
import { toast } from "sonner";
import PostCardSkeleton from "../PostCard/PostCardSkeleton";
import { useUser } from "@/src/context/user.provider";

export default function DisplayPosts() {
  const { user, posts, setPosts, postMeta } = useUser();

  const [currentPage, setCurrentPage] = useState(postMeta.page);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if more posts are available
  const [meta, setMeta] = useState(postMeta);

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);

    const queries = [
      { name: "page", value: currentPage + 1 },
      { name: "limit", value: 2 },
      { name: "contentType", value: user?.plan === "premium" ? "all" : "free" },
      { name: "sort", value: "-createdAt" },
    ];

    try {
      // fetch next page post
      const response = await getAllPosts(queries);
      const newPosts = response.data;
      const newMeta = response.meta;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);

      setMeta(newMeta);
      setCurrentPage(newMeta.page);

      // Stop fetching if we've loaded all pages
      if (newMeta.page >= meta.totalPage) {
        setHasMorePosts(false);
      }
    } catch (error) {
      toast.error("Failed to load more posts");
    } finally {
      setLoading(false);
    }
  };

  // Restart fetching from the first page after all posts have been loaded
  const restartFetching = async () => {
    setLoading(true);
    try {
      const response = await getAllPosts([
        { name: "page", value: 1 },
        { name: "limit", value: 2 },
        {
          name: "contentType",
          value: user?.plan === "premium" ? "all" : "free",
        },
        { name: "sort", value: "-createdAt" },
      ]);

      setPosts(response.data);
      setMeta(response.meta);
      setCurrentPage(1);
      setHasMorePosts(true);
    } catch (error) {
      toast.error("Failed to restart loading posts");
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll logic
  useEffect(() => {
    if (inView && !loading) {
      if (hasMorePosts) {
        loadMorePosts();
      } else {
        restartFetching();
      }
    }
  }, [inView]);

  return (
    <div className="w-full">
      {posts &&
        posts.map((post: TPost) => <PostCard postData={post} key={post._id} />)}

      {/* The div that triggers infinite scroll */}
      <div ref={ref} className="mb-20 w-full">
        <PostCardSkeleton />
      </div>
    </div>
  );
}
