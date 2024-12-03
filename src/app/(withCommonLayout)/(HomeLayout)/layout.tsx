import GBDrawer from "@/src/components/GBDrawer/GBDrawer";
import UserCard from "@/src/components/UI/Home/UserCard";
import { getAllOnlineUsers, getAllUsers } from "@/src/services/User";
import { TUser } from "@/src/types";

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

  const popularGardeners = await getAllUsers([
    { name: "page", value: 1 },
    { name: "limit", value: 3 },
    { name: "sort", value: "-totalFollowers" },
  ]);
  const popularGardenersToDisplay: TUser[] = popularGardeners?.data || [];

  const bestGardeners = await getAllUsers([
    { name: "page", value: 1 },
    { name: "limit", value: 3 },
    { name: "sort", value: "-totalUpvoteGained" },
  ]);
  const bestGardenersToDisplay: TUser[] = bestGardeners?.data || [];

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
            <div className="flex flex-col gap-2">
              {bestGardenersToDisplay.map((user) => (
                <UserCard key={user._id} user={user} cardType="upvoteGained" />
              ))}
            </div>

            {/* Popular user's */}
            <h1 className="font-bold mb-2 mt-6 text-lg">Popular Gardeners</h1>
            <div className="flex flex-col gap-2">
              {popularGardenersToDisplay?.map((user) => (
                <UserCard user={user} key={user._id} cardType="general" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
