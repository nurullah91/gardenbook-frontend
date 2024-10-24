import DisplayPosts from "@/src/components/UI/Home/DisplayPosts";
import Quotes from "@/src/components/UI/Quotes/Quotes";

export default async function Home() {
  return (
    <section className="flex gap-4">
      {/* <GBDrawer /> */}
      <div className="w-full">
        <Quotes />
        <DisplayPosts />
      </div>
    </section>
  );
}
