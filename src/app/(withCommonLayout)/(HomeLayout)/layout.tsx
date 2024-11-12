import GBDrawer from "@/src/components/GBDrawer/GBDrawer";
import { getAllOnlineUsers } from "@/src/services/User";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onlineUsers = await getAllOnlineUsers([
    { name: "page", value: 1 },
    { name: "limit", value: 8 },
    { name: "sort", value: "-updatedAt" },
  ]);

  return (
    <div className="relative flex gap-2  flex-col md:flex-row">
      <div className="md:fixed">
        <GBDrawer onlineUsers={onlineUsers?.data} />
      </div>
      <div className="md:ml-64 w-full">{children}</div>
    </div>
  );
}
