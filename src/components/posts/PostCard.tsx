import React from "react";

interface Post {
  title: string;
  content: string;
  category: string;
  contentType: string;
  postPhotos: string[];
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={post.postPhotos[0]}
        alt={post.title}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.content}</p>
        <div className="mt-4">
          <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold rounded-full px-3 py-1">
            {post.category}
          </span>
          <span
            className={`ml-2 inline-block text-xs font-semibold rounded-full px-3 py-1 ${
              post.contentType === "free"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {post.contentType.charAt(0).toUpperCase() +
              post.contentType.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
