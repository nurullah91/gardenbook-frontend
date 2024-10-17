"use client";

import { TPost } from "@/src/types";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllPosts } from "@/src/services/Post";
import { toast } from "sonner";
import PostCardSkeleton from "../UI/PostCardSkeleton";

export interface IPostsProps {
  initialPosts: TPost[];
  initialMeta: {
    total: number;
    totalPage: number;
    limit: number;
    page: number;
  };
}

const NUMBER_OF_POSTS_TO_FETCH = 2;

export default function DisplayPosts({
  initialPosts,
  initialMeta,
}: IPostsProps) {
  const [currentPage, setCurrentPage] = useState(initialMeta.page);
  const [postToDisplay, setPostToDisplay] = useState<TPost[]>(initialPosts);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if more posts are available
  const [meta, setMeta] = useState(initialMeta);

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // fetch next page post
      const response = await getAllPosts(
        currentPage + 1,
        NUMBER_OF_POSTS_TO_FETCH
      );
      const newPosts = response.data;
      const newMeta = response.meta;

      setPostToDisplay((prevPosts) => [...prevPosts, ...newPosts]);

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
      const response = await getAllPosts(1, NUMBER_OF_POSTS_TO_FETCH);

      setPostToDisplay(response.data);
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
    <div>
      {postToDisplay &&
        postToDisplay.map((post: TPost, index: number) => (
          <PostCard postData={post} key={index} />
        ))}

      {/* The div that triggers infinite scroll */}
      <div ref={ref} className="mb-20">
        <PostCardSkeleton />
      </div>
    </div>
  );
}
