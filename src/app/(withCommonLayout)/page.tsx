import DisplayPosts from "@/src/components/UI/Home/DisplayPosts";
import Quotes from "@/src/components/UI/Quotes/Quotes";
import { getAllPosts } from "@/src/services/Post";

export default async function Home() {
  const data = await getAllPosts(1, 2);
  const posts = data?.data;

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Quotes />

      <DisplayPosts initialPosts={posts} initialMeta={data?.meta} />
    </section>
  );
}
