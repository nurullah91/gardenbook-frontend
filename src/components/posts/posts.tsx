import axiosInstance from "@/src/lib/AxiosInstance";
import PostCard from "./PostCard";
import { TPost } from "@/src/types";
// import { getAllPosts } from "@/src/services/Post";

export interface IPostsProps {}
export default async function Posts({}: IPostsProps) {
  const { data: posts } = await axiosInstance.get("/posts?contentType=all");
  // const posts = await getAllPosts();
  // console.log(posts);

  return (
    <div>
      {posts &&
        posts?.data?.map((post: TPost, index: number) => (
          <PostCard postData={post} key={index} />
        ))}
    </div>
  );
}
