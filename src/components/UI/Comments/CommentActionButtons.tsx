"use client";

import { useUser } from "@/src/context/user.provider";
import { TComment } from "@/src/types";
export interface ICommentActionButtonsProps {
  comment: TComment;
}
export default function CommentActionButtons({
  comment,
}: ICommentActionButtonsProps) {
  const { user } = useUser();

  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        {/* Extra options (e.g., ellipsis) */}
        {user?._id === comment?.user?._id && (
          <div className="relative">
            <button className="">...</button>
          </div>
        )}
      </h1>
    </div>
  );
}
