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
    <div className="relative flex gap-4  flex-col md:flex-row">
      <div className="md:fixed">
        <GBDrawer onlineUsers={onlineUsers?.data} meta={onlineUsers.meta} />
      </div>
      <div className="md:ml-64 w-full flex gap-4 relative">
        {children}

        <div className="h-[calc(100vh-64px)] lg:block hidden bg-default-100 min-w-60 sticky top-16 rounded-lg shadow-lg p-4 shadow-blue-600/30">
          <h2 className="font-bold">Popular Gardener</h2>
        </div>
      </div>
    </div>
  );
}
