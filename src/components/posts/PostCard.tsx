import { TPost } from "@/src/types";

import ImageGallery from "../ImageGallery/ImageGallery";
import PostContent from "./PostContent";
import Image from "next/image";
import styles from "./postContent.module.css";

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
  } = postData;

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
          <h4 className="text-lg font-semibold">{`${user.name.firstName}  ${user.name?.middleName ? user.name.middleName : ""} ${user.name.lastName}`}</h4>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className={styles.postContainer}>
        <PostContent postContent={post} />
      </div>

      {/* Post Photos */}
      {postPhotos?.length && postPhotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
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
