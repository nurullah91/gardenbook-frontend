"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteComment } from "@/src/hooks/post.hook";
import { TComment } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Dispatch, SetStateAction } from "react";
export interface ICommentActionButtonsProps {
  comment: TComment;
  setCommentFocus: Dispatch<SetStateAction<boolean>>;
}
export default function CommentActionButtons({
  comment,
  setCommentFocus,
}: ICommentActionButtonsProps) {
  const { mutate: handleDeleteComment, isPending: isDeletePending } =
    useDeleteComment();
  const { user } = useUser();

  const handleDelete = (commentId: string) => {
    handleDeleteComment(commentId);
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
    </div>
  );
}
