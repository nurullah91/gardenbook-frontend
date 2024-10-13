import { TPost } from "@/src/types";

import ImageGallery from "../ImageGallery/ImageGallery";
import PostContent from "./PostContent";
import Image from "next/image";
import moment from "moment";
import styles from "./postContent.module.css";
import { VerifyBadgeIcon } from "../icons";

interface PostCardProps {
  postData: TPost;
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  const {
    post,
    postPhotos,
    user,
    category,
    contentType,
    upvoteCount,
    downvoteCount,
    commentCount,
    createdAt,
  } = postData;
  const formattedDate = moment(createdAt).format("Do MMM YY, h:mm a");

  return (
    <div className="shadow-md rounded-lg overflow-hidden mb-6">
      {/* User Info Section */}
      <div className="flex items-center p-4">
        <Image
          width={48}
          height={48}
          className="rounded-full"
          src={user.profilePhoto}
          alt={`${user.name.firstName} ${user.name.lastName}`}
        />
        <div className="ml-3">
          <div className="flex gap-2 items-center justify-start">
            <h4 className="text-lg font-semibold cursor-pointer">
              {`${user.name.firstName}  ${user.name?.middleName ? user.name.middleName : ""} ${user.name.lastName}`}{" "}
            </h4>
            {user.plan === "premium" && (
              <span title="Premium user">
                <VerifyBadgeIcon size={18} />
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 cursor-pointer">{category}</p>
          <p className="text-xs text-gray-500 cursor-pointer">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className={styles.postContainer}>
        <PostContent postContent={post} />
      </div>

      {/* Post Photos */}
      {postPhotos?.length && postPhotos.length > 0 && (
        <div>
          <ImageGallery images={postPhotos} />
        </div>
      )}

      {/* Post Footer with Interactions */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <span className="mr-1">👍</span>
            <span>{upvoteCount}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-red-600">
            <span className="mr-1">👎</span>
            <span>{downvoteCount}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-green-600">
            <span className="mr-1">💬</span>
            <span>{commentCount}</span>
          </button>
        </div>

        <div className="text-gray-500 text-sm">
          <span className="font-semibold">{contentType}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
