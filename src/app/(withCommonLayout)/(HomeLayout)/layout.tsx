import GBDrawer from "@/src/components/GBDrawer/GBDrawer";
import BestGardeners from "@/src/components/UI/Home/BestGardeners";
import PopularGardeners from "@/src/components/UI/Home/PopularGardeners";
import UserLoadingSkeleton from "@/src/components/UI/UserLoadingSkeleton";
import { getAllOnlineUsers } from "@/src/services/User";
import { Suspense } from "react";

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
        <div className="h-[calc(100vh-64px)] lg:block hidden bg-default-100 min-w-60 sticky top-16 rounded-lg shadow-lg p-4 shadow-blue-600/30 overflow-auto">
          <div>
            {/* Best user */}
            <h1 className="font-bold mb-2 text-lg">Best Gardeners</h1>
            <Suspense fallback={<UserLoadingSkeleton />}>
              {/* @ts-ignore */}
              <BestGardeners />
            </Suspense>

            {/* Popular user's */}
            <h1 className="font-bold mb-2 mt-6 text-lg">Popular Gardeners</h1>
            <Suspense fallback={<UserLoadingSkeleton />}>
              {/* @ts-ignore */}
              <PopularGardeners />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
