import Posts from "@/src/components/posts/posts";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {/* @ts-ignore */}
      <Posts />
    </section>
  );
}
