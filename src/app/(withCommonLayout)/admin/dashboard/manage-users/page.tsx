import UserManagementTable from "@/src/components/UI/Dashboard/UserManagementTable";
import { getAllUsers } from "@/src/services/User";
import { TUser } from "@/src/types";

export interface IManageUsersProps {}
export default async function ManageUsers({}: IManageUsersProps) {
  let users: TUser[] = [];

  try {
    const data = await getAllUsers();

    users = data?.data || [];
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h2 className="text-4xl text-center">Manage users</h2>
      {/* @ts-ignore*/}
      <UserManagementTable users={users} />
    </div>
  );
}
