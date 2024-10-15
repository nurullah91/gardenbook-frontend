import PostCardContent from "@/src/components/posts/PostCardContent";
import PostDetailsCard from "@/src/components/posts/PostDetailsCard";
import DisplayComments from "@/src/components/UI/Comments/DisplayComments";

import { getSinglePost, getSinglePostComments } from "@/src/services/Post";
import { TComment } from "@/src/types";

export interface IPostDetailsProps {
  params: { postId: string };
}
export default async function PostDetails({ params }: IPostDetailsProps) {
  const { postId } = params;
  const { data: postData } = await getSinglePost(postId);
  const commentData = await getSinglePostComments(postId);

  return (
    <div>
      <PostCardContent postData={postData} />
      <PostDetailsCard postData={postData} />

      <div className="mb-12 space-y-4">
        {commentData?.data?.map((comment: TComment) => (
          <DisplayComments comment={comment} key={comment._id} />
        ))}
      </div>
    </div>
  );
}
