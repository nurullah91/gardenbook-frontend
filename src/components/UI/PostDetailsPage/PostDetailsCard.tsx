"use client";

import { TPost } from "@/src/types";
import PostCardButtons from "../PostCard/PostCardButtons";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@heroui/modal";
import { useUser } from "@/src/context/user.provider";
import GBModal from "../../modal/GBModal";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import GBForm from "../../form/GBForm";
import { FieldValues } from "react-hook-form";
import GBInput from "../../form/GBInput";
import { IoIosSend } from "react-icons/io";
import { CommentSchema } from "@/src/schema";
import { useCreateCommentOnPost } from "@/src/hooks/post.hook";
import { toast } from "sonner";

export interface IPostDetailsCardProps {
  postData: TPost;
}
export default function PostDetailsCard({ postData }: IPostDetailsCardProps) {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentFocus, setCommentFocus] = useState(false);
  const {
    mutate: handleCommentOnPost,
    isPending: isCommentOnPostPending,
    isSuccess: isCommentOnPostSuccess,
    isError,
  } = useCreateCommentOnPost();

  const handleModalOpen = () => {
    onOpen();
  };
  const handleRedirect = () => {
    router.push("/login");
  };

  const handleComment = () => {
    if (user) {
      setCommentFocus(true);
    } else {
      handleModalOpen();
    }
  };
  const handleCommentPost = (value: FieldValues) => {
    const commentData = {
      user: user?._id,
      post: postData._id,
      comment: value.comment,
    };

    handleCommentOnPost(JSON.stringify(commentData));
  };

  useEffect(() => {
    if (isCommentOnPostSuccess) {
      toast.success("Comment added");
      setCommentFocus(false);
    }
    if (isError) {
      toast.error("Failed to add comment");
    }
  }, [isCommentOnPostSuccess]);

  return (
    <div>
      <GBModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Need to sign in"
        footerCancelButtonText="Not now"
        footerExtraButton={
          <Button color="primary" onClick={handleRedirect}>
            Sign in
          </Button>
        }
      >
        To interact with post you need to sign in first
      </GBModal>

      {/* Post Footer with Interactions */}
      <PostCardButtons post={postData} commentHandler={handleComment} />
      {commentFocus && (
        <div className="mb-10 relative">
          <GBForm
            onSubmit={handleCommentPost}
            resolver={zodResolver(CommentSchema)}
          >
            <GBInput label="" name="comment" />
            <button
              type="submit"
              className="absolute right-2 top-1"
              disabled={isCommentOnPostPending}
            >
              <IoIosSend
                className={`${isCommentOnPostPending ? "text-gray-500 cursor-wait" : "text-blue-500"} text-2xl`}
              />
            </button>
          </GBForm>
        </div>
      )}
    </div>
  );
}
