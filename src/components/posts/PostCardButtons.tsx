"use client";

import { TPost } from "@/src/types";
import { ShareIcon } from "../icons";
import { AiTwotoneDislike } from "react-icons/ai";
import likeImage from "@/src/assets/like.svg";
import commentImage from "@/src/assets/comment.svg";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { useUser } from "@/src/context/user.provider";
import { useDisclosure } from "@nextui-org/modal";
import GBModal from "../modal/GBModal";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDownvotePost, useUpvotePost } from "@/src/hooks/post.hook";

export interface IPostCardButtonsProps {
  post: TPost;
}
export default function PostCardButtons({ post }: IPostCardButtonsProps) {
  const { upvoteCount, downvoteCount, commentCount, contentType, _id } = post;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user } = useUser();
  const { mutate: handleVotePost, isPending: upvotePending } = useUpvotePost();
  const { mutate: handleDownvotePost, isPending: downvotePending } =
    useDownvotePost();

  const handleModalOpen = () => {
    onOpen();
  };

  const handleUpvote = (id: string) => {
    if (user) {
      const voteData = {
        postId: id,
        userId: user._id,
      };

      handleVotePost(JSON.stringify(voteData));
    } else {
      handleModalOpen();
    }
  };

  const handleDownvote = (id: string) => {
    if (user) {
      const voteData = {
        postId: id,
        userId: user._id,
      };

      handleDownvotePost(JSON.stringify(voteData));
    } else {
      handleModalOpen();
    }
  };

  const handleComment = (id: string) => {
    if (user) {
      console.log(id);
    } else {
      handleModalOpen();
    }
  };

  const handleShare = (id: string) => {
    navigator.clipboard
      .writeText(`https://gardenbook-client.vercel.app/post/${id}`)
      .then(() => {
        toast.success("Post link copied to the clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy the link");
      });
  };

  const handleRedirect = () => {
    router.push("/login");
  };

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
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex space-x-4">
          {/* upvote */}
          <button
            className="flex items-center text-gray-600 hover:text-blue-600"
            onClick={() => handleUpvote(_id)}
            disabled={upvotePending}
          >
            <Tooltip content="upvote">
              <Image src={likeImage} alt="vote" width={40} height={40} />
            </Tooltip>
            <span>{upvoteCount}</span>
          </button>

          {/* Down Vote */}
          <button
            className="flex items-center text-gray-600 hover:text-red-600"
            onClick={() => handleDownvote(_id)}
          >
            <Tooltip content="downvote">
              <AiTwotoneDislike className="text-3xl" />
            </Tooltip>
            <span>{downvoteCount}</span>
          </button>

          {/* Comment */}
          <button className="flex items-center text-gray-600 hover:text-green-600">
            <Tooltip content="comment" onClick={() => handleComment(_id)}>
              <Image src={commentImage} alt="vote" width={30} height={30} />
            </Tooltip>
            <span>{commentCount}</span>
          </button>

          {/* Share */}
          <button
            className="flex items-center text-gray-600 hover:text-green-600"
            onClick={() => handleShare(_id)}
          >
            <Tooltip content="Share">
              <ShareIcon />
            </Tooltip>
          </button>
        </div>

        <Tooltip content="Free content">
          <div
            className={`text-gray-500 text-sm px-3 py-1 border-2 ${contentType === "free" ? "border-green-500" : "border-orange-500"} rounded-full`}
          >
            <span className="font-semibold">{contentType}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}