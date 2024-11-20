import { TPost } from "@/src/types";

import ImageGallery from "../../ImageGallery/ImageGallery";
import PostText from "./PostText";
import Image from "next/image";
import moment from "moment";
import styles from "./postContent.module.css";
import { VerifyBadgeIcon } from "../../icons";
import premiumBadge from "@/src/assets/premiumBadge.png";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import PostManagementActionButtons from "./PostManagementActionButtons";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface PostCardContentProps {
  postData: TPost;
}

const PostCardContent: React.FC<PostCardContentProps> = ({ postData }) => {
  const post = postData?.post;
  const postPhotos = postData?.postPhotos;
  const user = postData?.user;
  const category = postData?.category;
  const createdAt = postData?.createdAt;
  const contentType = postData?.contentType;
  const formattedDate = createdAt
    ? moment(createdAt).format("Do MMM YY, h:mm a")
    : "";

  return (
    <div>
      {postData ? (
        <div>
          <div className="flex justify-between items-start">
            {/* User Info Section */}
            <div className="flex items-center">
              <Link href={`/profile/${user?._id}`}>
                <Image
                  width={48}
                  height={48}
                  className="rounded-full"
                  src={user?.profilePhoto}
                  alt={`${user?.name.firstName} ${user?.name.lastName}`}
                />
              </Link>
              <div className="ml-3">
                <div className="flex gap-2 items-center justify-start">
                  <Link href={`/profile/${user?._id}`}>
                    <h4 className="text-lg font-semibold cursor-pointer">
                      {`${user?.name.firstName} ${user?.name?.middleName} ${user?.name.lastName}`}
                    </h4>
                  </Link>
                  {user?.plan === "premium" && (
                    <span>
                      <Tooltip content="Verified premium user">
                        <button>
                          <VerifyBadgeIcon size={18} />
                        </button>
                      </Tooltip>
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 cursor-pointer">
                  {category}
                </p>
                <p className="text-xs text-gray-500 cursor-pointer">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Tooltip
                content={`${contentType === "premium" ? "Premium content" : "Free content"}`}
              >
                <div>
                  {contentType === "premium" ? (
                    <Image
                      src={premiumBadge}
                      alt="Badge"
                      height={30}
                      width={30}
                    />
                  ) : (
                    <RiVerifiedBadgeFill className="text-3xl text-green-500" />
                  )}
                </div>
              </Tooltip>
              <PostManagementActionButtons postData={postData} />
            </div>
          </div>

          {/* Post Content */}
          <div className={styles.postContainer}>
            <PostText postContent={post} />
          </div>

          {/* Post Photos */}
          {postPhotos && postPhotos.length > 0 && (
            <div>
              <ImageGallery images={postPhotos} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center min-h-screen w-full backdrop-blur-sm">
            <div className="text-center p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold  mb-4">
                Oops! Post Not Found.
              </h1>
              <p className="text-lg mb-6">
                The post you are searching is unavailable or removed by the
                owner
              </p>

              <div className="mt-4">
                <a href="/" className="text-blue-600 hover:underline">
                  Go Back Home
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCardContent;
