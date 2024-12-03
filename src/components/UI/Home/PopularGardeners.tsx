import { TUser } from "@/src/types";
import { getAllUsers } from "@/src/services/User";
import UserCard from "./UserCard";

export default async function PopularGardeners() {
  const gardeners = await getAllUsers([
    { name: "page", value: 1 },
    { name: "limit", value: 3 },
    { name: "sort", value: "-totalFollowers" },
  ]);
  const gardenersToDisplay: TUser[] = gardeners?.data || [];

  return (
    <div>
      <div className="flex flex-col gap-2">
        {gardenersToDisplay?.map((user) => (
          //@ts-ignore
          <UserCard user={user} key={user._id} cardType="general" />
        ))}
      </div>
    </div>
  );
}
