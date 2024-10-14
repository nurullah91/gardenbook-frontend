import { TPost } from "@/src/types";

import ImageGallery from "../ImageGallery/ImageGallery";
import PostContent from "./PostContent";
import Image from "next/image";
import moment from "moment";
import styles from "./postContent.module.css";
import { VerifyBadgeIcon } from "../icons";
import PostCardButtons from "./PostCardButtons";

interface PostCardProps {
  postData: TPost;
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  const { post, postPhotos, user, category, createdAt } = postData;
  const formattedDate = moment(createdAt).format("Do MMM YY, h:mm a");

  return (
    <div className="shadow-md rounded-lg overflow-hidden mb-6 px-10 py-8">
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
      <PostCardButtons post={postData} />
    </div>
  );
};

export default PostCard;
