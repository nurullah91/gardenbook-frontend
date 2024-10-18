import UserManagementTable from "@/src/components/UI/Dashboard/UserManagementTable";
import { getAllUsers } from "@/src/services/User";
import { TUser } from "@/src/types";

export interface IManageUsersProps {}
export default async function ManageUsers({}: IManageUsersProps) {
  const data = await getAllUsers();
  const users: TUser[] = data?.data;

  return (
    <div>
      <UserManagementTable users={users} />
    </div>
  );
}
