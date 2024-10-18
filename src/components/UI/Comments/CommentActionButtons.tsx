"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteComment, useUpdateComment } from "@/src/hooks/post.hook";
import { TComment } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import GBForm from "../../form/GBForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/src/schema";
import GBInput from "../../form/GBInput";
import { IoIosSend } from "react-icons/io";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
export interface ICommentActionButtonsProps {
  comment: TComment;
}
export default function CommentActionButtons({
  comment,
}: ICommentActionButtonsProps) {
  const [commentFocus, setCommentFocus] = useState(false);
  const { mutate: handleUpdateComment, isPending: isUpdatePending } =
    useUpdateComment(comment?._id);

  const { mutate: handleDeletePost, isPending: isDeletePending } =
    useDeleteComment();

  const { user } = useUser();

  const handleDelete = (commentId: string) => {
    handleDeletePost(commentId);
  };

  const handleCommentPost = (value: FieldValues) => {
    const commentData = {
      comment: value.comment,
    };

    handleUpdateComment(JSON.stringify(commentData));
  };

  return (
    <div>
      {user?._id === comment?.user?._id && (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" size="sm">
              ...
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="edit" onClick={() => setCommentFocus(true)}>
              Edit
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => handleDelete(comment._id)}
              isDisabled={isDeletePending}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}

      {/* Update comment field */}
      {commentFocus && (
        <div className="mb-10 relative">
          <GBForm
            onSubmit={handleCommentPost}
            resolver={zodResolver(CommentSchema)}
            defaultValues={comment}
          >
            <GBInput label="" name="comment" />
            <button
              type="submit"
              className="absolute right-2 top-1"
              disabled={isUpdatePending}
            >
              <IoIosSend
                className={`${isUpdatePending ? "text-gray-500" : "text-blue-500"} text-2xl`}
              />
            </button>
          </GBForm>
        </div>
      )}
    </div>
  );
}
