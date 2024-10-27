import Sidebar from "@/src/components/UI/Dashboard/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Sidebar />
      <main>
        <div className="lg:ml-24 w-full mt-[300px] lg:mt-16">{children}</div>
      </main>
    </div>
  );
}
