import Sidebar from "@/src/components/UI/Dashboard/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Dashboard of gardenbook for admin. Manage users, post's, show analytics",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
