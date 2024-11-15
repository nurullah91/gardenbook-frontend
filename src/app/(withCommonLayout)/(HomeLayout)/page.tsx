import DisplayPosts from "@/src/components/UI/Home/DisplayPosts";
export default async function Home() {
  return (
    <section className="flex gap-4">
      {/* <GBDrawer /> */}
      <div className="w-full">
        <DisplayPosts />
      </div>
    </section>
  );
}
