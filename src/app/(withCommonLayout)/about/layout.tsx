import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-11/12 mx-auto max-w-screen-xl">
        {children}
      </div>
    </section>
  );
}
