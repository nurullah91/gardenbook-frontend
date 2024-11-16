import Sidebar from "@/src/components/UI/Dashboard/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "About our gardenbook. Share and explore your thoughts about gardening",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
