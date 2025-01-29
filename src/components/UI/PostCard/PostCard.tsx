"use client";

import { TComment, TPost } from "@/src/types";
import PostCardButtons from "./PostCardButtons";
import PostCardContent from "./PostCardContent";
import GBModal from "../../modal/GBModal";
import { useDisclosure } from "@heroui/modal";
import PostDetailsCard from "../PostDetailsPage/PostDetailsCard";
import { useState } from "react";
import UserLoadingSkeleton from "../UserLoadingSkeleton";
import { getSinglePostComments } from "@/src/services/Post";
import DisplayComments from "../Comments/DisplayComments";
import { toast } from "sonner";

export interface IPostCardProps {
  postData: TPost;
}
export default function PostCard({ postData }: IPostCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comments, setComments] = useState<TComment[]>([]);
  const [commentFetching, setCommentFetching] = useState<boolean>(false);

  const handleCommentFetch = async (postId: string) => {
    setCommentFetching(true);
    try {
      const commentData = await getSinglePostComments(postId);

      setComments(commentData?.data);
    } catch (error) {
      setCommentFetching(false);
      toast.error("Failed to fetch comments");
    }
    setCommentFetching(false);
  };

  const handleComment = (postId: string) => {
    onOpen();
    handleCommentFetch(postId);
  };

  return (
    <div>
      <GBModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={`${postData.user?.name?.firstName} ${postData.user?.name?.middleName} ${postData.user?.name?.lastName}'s Post`}
        footerCancelButtonText="Close"
      >
        <div>
          <PostCardContent postData={postData} />
          <PostDetailsCard postData={postData} />

          {/* Display comments */}
          <div className="mt-12 space-y-4">
            {postData?.commentCount === 0 ? (
              <h2 className="text-center text-2xl">No Comments to show</h2>
            ) : commentFetching ? (
              <UserLoadingSkeleton />
            ) : (
              comments.map((comment: TComment) => (
                <DisplayComments comment={comment} key={comment._id} />
              ))
            )}
          </div>
        </div>
      </GBModal>

      <div
        className="shadow-md shadow-default-300 rounded-lg overflow-hidden mb-4 p-6 bg-default-100"
        id={postData._id}
      >
        <PostCardContent postData={postData} />

        {/* Post Footer with Interactions */}
        <PostCardButtons
          post={postData}
          commentHandler={() => handleComment(postData._id)}
        />
      </div>
    </div>
  );
}
