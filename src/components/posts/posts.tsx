import axiosInstance from "@/src/lib/AxiosInstance";
import { getAllPosts } from "@/src/services/Post";

export interface IPostsProps {}
export default async function Posts({}: IPostsProps) {
  const { data: posts } = await axiosInstance.get("/posts?contentType=free");
  console.log(posts);

  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        Total free post{posts?.data?.length}
      </h1>
    </div>
  );
}
