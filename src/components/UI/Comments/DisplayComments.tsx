import { TComment } from "@/src/types";
import { getTimeFromNow } from "@/src/utils/getTimeFromNow";
import Link from "next/link";
import CommentActionButtons from "./CommentActionButtons";

export interface IDisplayCommentsProps {
  comment: TComment;
}
export default function DisplayComments({ comment }: IDisplayCommentsProps) {
  return (
    <div key={comment._id} className="flex items-start space-x-3">
      {/* User Avatar */}
      <Link href={`/profile/${comment.user?._id}`}>
        <img
          src={comment.user.profilePhoto}
          alt={`${comment.user?.name?.firstName} ${comment.user?.name?.middleName} ${comment.user?.name?.lastName}`}
          className="w-10 h-10 rounded-full"
        />
      </Link>
      {/* Comment Content */}
      <div className="flex flex-col  px-4 py-2 rounded-xl relative">
        <div className="flex items-center space-x-2">
          <Link href={`/profile/${comment.user?._id}`}>
            <h4 className="text-sm font-semibold">
              {comment.user?.name?.firstName}
              {comment.user?.name?.middleName}
              {comment.user?.name?.lastName}
            </h4>
          </Link>
        </div>
        <p className="text-sm">{comment.comment}</p>
        {/* Comment actions */}
        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
          <span className="mr-2">{getTimeFromNow(comment.createdAt)}</span>

          <button className="hover:underline">
            Like ({comment.upVoters.length})
          </button>

          <button className="hover:underline">
            Dislike ({comment.downVoters.length})
          </button>
        </div>
      </div>
      {/* Extra options (e.g., ellipsis) */}
      <CommentActionButtons comment={comment} />
    </div>
  );
}
