"use client";

import { TPost } from "@/src/types";
import PostCardButtons from "./PostCardButtons";
import { useRouter } from "next/navigation";
import PostCardContent from "./PostCardContent";

export interface IPostCardProps {
  postData: TPost;
}
export default function PostCard({ postData }: IPostCardProps) {
  const router = useRouter();

  const handleComment = () => {
    router.push(`/post/${postData._id}`);
  };

  return (
    <div>
      <PostCardContent postData={postData} />

      {/* Post Footer with Interactions */}
      <PostCardButtons post={postData} commentHandler={handleComment} />
    </div>
  );
}
