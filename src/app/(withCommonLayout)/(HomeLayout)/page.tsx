import DisplayPosts from "@/src/components/UI/Home/DisplayPosts";
import Quotes from "@/src/components/UI/Quotes/Quotes";

export default async function Home() {
  return (
    <section className="flex gap-4">
      {/* <div className="w-[250px] px-4 py-6 bg-gray-400 h-screen ">
        Search sort filter
      </div> */}
      {/* <GBDrawer /> */}
      <div className="w-full">
        <Quotes />
        <DisplayPosts />
      </div>
    </section>
  );
}
