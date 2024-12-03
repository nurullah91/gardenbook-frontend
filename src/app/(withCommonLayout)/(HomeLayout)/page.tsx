import DisplayPosts from "@/src/components/UI/Home/DisplayPosts";
import PostCardSkeleton from "@/src/components/UI/PostCard/PostCardSkeleton";
import { Suspense } from "react";
export default async function Home() {
  return (
    <section className="flex gap-4 w-full">
      <div className="w-full">
        <Suspense fallback={<PostCardSkeleton />}>
          <DisplayPosts />
        </Suspense>
      </div>
    </section>
  );
}
