import axiosInstance from "@/src/lib/AxiosInstance";
// import { getAllPosts } from "@/src/services/Post";
import PostCard from "./PostCard";
import { TPost } from "@/src/types";

export interface IPostsProps {}
export default async function Posts({}: IPostsProps) {
  const { data: posts } = await axiosInstance.get("/posts?contentType=free");

  return (
    <div>
      <h1 className="font-bold text-center text-rose-500 text-3xl">
        {posts &&
          posts?.data?.map((post: TPost, index: number) => (
            <PostCard postData={post} key={index} />
          ))}
      </h1>
    </div>
  );
}
