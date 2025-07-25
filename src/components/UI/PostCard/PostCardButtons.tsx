"use client";

import { TPost, TUser } from "@/src/types";
import likeImage from "@/src/assets/like.svg";
import likedImage from "@/src/assets/liked.svg";
import commentImage from "@/src/assets/comment.svg";
import Image from "next/image";
import { RiShareForwardLine } from "react-icons/ri";
import { Tooltip } from "@heroui/tooltip";
import { useUser } from "@/src/context/user.provider";
import { useDisclosure } from "@heroui/modal";
import GBModal from "../../modal/GBModal";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDownvotePost, useUpvotePost } from "@/src/hooks/post.hook";
import { generatePDF } from "@/src/utils/generatePDF";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getSinglePostVoter } from "@/src/services/Post";

export interface IPostCardButtonsProps {
  post: TPost;
  commentHandler: () => void;
}

export type TVoters = {
  upVoters: TUser[];
  downVoters: TUser[];
};

export default function PostCardButtons({
  post,
  commentHandler,
}: IPostCardButtonsProps) {
  // get comment Handler as props so that it can be handled for redirect or comment.
  const [voters, setVoters] = useState<TVoters | null>(null);

  const upvoteCount = post?.upvoteCount;
  const downvoteCount = post?.downvoteCount;
  const commentCount = post?.commentCount;
  const _id = post?._id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { user } = useUser();
  const { mutate: handleVotePost, isPending: isUpvotePending } =
    useUpvotePost();
  const { mutate: handleDownvotePost, isPending: isDownvotePending } =
    useDownvotePost();

  const handleModalOpen = () => {
    onOpen();
  };

  const handleFetchVoters = async () => {
    const votersData = await getSinglePostVoter(post?._id);

    if (votersData?.data) {
      setVoters(votersData?.data as TVoters);
    }
  };

  useEffect(() => {
    handleFetchVoters();
  }, []);

  const isUpvoted = voters?.upVoters.some((voter) => voter._id === user?._id);
  const isDownvoted = voters?.downVoters.some(
    (voter) => voter._id === user?._id
  );

  const handleRedirect = () => {
    router.push("/login");
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
      <div className="flex justify-between items-center pt-2 border-t mt-4">
        <div className="flex space-x-4">
          {/* upvote */}
          <Tooltip content="Upvote">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleUpvote(_id)}
              disabled={isUpvotePending}
            >
              <Image
                src={isUpvoted ? likedImage : likeImage}
                alt="vote"
                width={40}
                height={40}
              />
              <span>{upvoteCount}</span>
            </button>
          </Tooltip>

          {/* Down Vote */}
          <Tooltip content="Downvote">
            <button
              className="flex items-center text-gray-600 hover:text-red-600"
              onClick={() => handleDownvote(_id)}
              disabled={isDownvotePending}
            >
              <Image
                src={isDownvoted ? likedImage : likeImage}
                alt="vote"
                width={40}
                height={40}
                className="transform scale-y-[-1]"
              />
              <span>{downvoteCount}</span>
            </button>
          </Tooltip>

          {/* Comment */}
          <Tooltip content="comment">
            <button
              className="flex items-center text-gray-600 hover:text-green-600"
              onClick={commentHandler}
            >
              <Image src={commentImage} alt="comment" width={30} height={30} />
              <span>{commentCount}</span>
            </button>
          </Tooltip>
        </div>
        <div className="flex gap-3 items-center">
          {/* Share */}
          <Tooltip content="Share">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => handleShare(_id)}
            >
              <RiShareForwardLine className="text-3xl" />
            </button>
          </Tooltip>

          {/* PDF */}
          <Tooltip content="Download pdf">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => generatePDF(_id)}
            >
              <FaFilePdf className="text-2xl" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
