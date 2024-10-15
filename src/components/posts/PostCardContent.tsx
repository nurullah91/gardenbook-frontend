import { TPost } from "@/src/types";

import ImageGallery from "../ImageGallery/ImageGallery";
import PostText from "./PostText";
import Image from "next/image";
import moment from "moment";
import styles from "./postContent.module.css";
import { VerifyBadgeIcon } from "../icons";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";

interface PostCardContentProps {
  postData: TPost;
}

const PostCardContent: React.FC<PostCardContentProps> = ({ postData }) => {
  const { post, postPhotos, user, category, createdAt } = postData;
  const formattedDate = moment(createdAt).format("Do MMM YY, h:mm a");

  return (
    <div>
      {/* User Info Section */}
      <div className="flex items-center p-4">
        <Link href={`/profile/${user._id}`}>
          <Image
            width={48}
            height={48}
            className="rounded-full"
            src={user.profilePhoto}
            alt={`${user.name.firstName} ${user.name.lastName}`}
          />
        </Link>
        <div className="ml-3">
          <div className="flex gap-2 items-center justify-start">
            <Link href={`/profile/${user._id}`}>
              <h4 className="text-lg font-semibold cursor-pointer">
                {`${user.name.firstName} ${user.name?.middleName} ${user.name.lastName}`}
              </h4>
            </Link>
            {user.plan === "premium" && (
              <span>
                <Tooltip content="Verified premium user">
                  <button>
                    <VerifyBadgeIcon size={18} />
                  </button>
                </Tooltip>
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
        <PostText postContent={post} />
      </div>

      {/* Post Photos */}
      {postPhotos?.length && postPhotos.length > 0 && (
        <div>
          <ImageGallery images={postPhotos} />
        </div>
      )}
    </div>
  );
};

export default PostCardContent;
