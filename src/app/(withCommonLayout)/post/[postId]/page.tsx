import PostCardContent from "@/src/components/posts/PostCardContent";
import PostDetailsCard from "@/src/components/posts/PostDetailsCard";
import { getSinglePost, getSinglePostComments } from "@/src/services/Post";

export interface IPostDetailsProps {
  params: { postId: string };
}
export default async function PostDetails({ params }: IPostDetailsProps) {
  const { postId } = params;

  const { data: postData } = await getSinglePost(postId);
  const commentData = await getSinglePostComments(postId);
  console.log(commentData);

  return (
    <div>
      <PostCardContent postData={postData} />
      <PostDetailsCard postData={postData} />
    </div>
  );
}
