"use client";
import { TPost } from "@/src/types";
import { Chip } from "@nextui-org/chip";
import { MdDeleteForever } from "react-icons/md";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/modal";
import GBModal from "../../modal/GBModal";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useDeletePost } from "@/src/hooks/post.hook";
import { FaEye } from "react-icons/fa";
import { getPlainText } from "@/src/utils/getPlainText";

export default function ContentManagementTable({ posts }: { posts: TPost[] }) {
  const [selectedPost, setSelectedPost] = useState("");

  const {
    isOpen: isOpenForDelete,
    onOpen: onOpenForDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { mutate: handleDeletePost, isPending: isDeletePostPending } =
    useDeletePost();

  //Delete Functions
  const handleDeleteModal = (postId: string) => {
    setSelectedPost(postId);
    onOpenForDelete();
  };
  const handleDelete = () => {
    handleDeletePost(selectedPost);
    onCloseDelete();
  };

  return (
    <div>
      {/* Modal for delete */}
      <GBModal
        isOpen={isOpenForDelete}
        onClose={onCloseDelete}
        modalTitle="Are you sure?"
        footerCancelButtonText="No"
        footerExtraButton={
          <Button
            color="danger"
            onClick={handleDelete}
            isDisabled={isDeletePostPending}
          >
            Delete
          </Button>
        }
      >
        You want to delete this post? You cannot undone this.
      </GBModal>

      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>CONTENT</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {posts?.map((post: TPost) => (
            <TableRow key={post?._id}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar src={post?.user?.profilePhoto} size="sm" />
                  </div>
                  <Link href={`/profile/${post?.user?._id}`}>
                    <p className="font-semibold">
                      {post?.user?.name?.firstName}{" "}
                      {post?.user?.name?.middleName}{" "}
                      {post?.user?.name?.lastName}
                    </p>
                    <p className="text-xs">{post?.user?.email}</p>
                  </Link>
                </div>{" "}
              </TableCell>
              <TableCell>{getPlainText(post.post, 10)}</TableCell>

              <TableCell>
                <p>{post.category}</p>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={post.contentType === "free" ? "success" : "warning"}
                  size="sm"
                  variant="flat"
                >
                  {post.contentType}
                </Chip>
              </TableCell>

              <TableCell>
                <div className="relative flex items-center gap-4">
                  <Tooltip content="View Post">
                    <Link
                      href={`/post/${post._id}`}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <FaEye className="text-2xl" />
                    </Link>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete post">
                    <button
                      onClick={() => handleDeleteModal(post._id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <MdDeleteForever className="text-3xl" />
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
