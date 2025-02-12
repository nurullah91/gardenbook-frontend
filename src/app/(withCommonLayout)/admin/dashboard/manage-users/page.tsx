import UserManagementTable from "@/src/components/UI/Dashboard/UserManagementTable";
import { getAllUsers } from "@/src/services/User";
import { TUser } from "@/src/types";

export interface IManageUsersProps {}
export default async function ManageUsers({}: IManageUsersProps) {
  try {
    const data = await getAllUsers([
      { name: "page", value: 1 },
      { name: "limit", value: 20 },
      { name: "sort", value: "-createdAt" },
    ]);
    const users: TUser[] = data?.data;

    return (
      <div>
        <div className="text-3xl text-center font-semibold mb-3">
          Manage users
          <span className="text-xl font-bold ml-1">
            (Total: {data?.meta?.total})
          </span>
        </div>

        <UserManagementTable users={users} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full backdrop-blur-sm">
        <div className="text-center p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold  mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg mb-6">
            We encountered an unexpected error.May be your login has been
            expired. Please logout and try again after login
          </p>

          <div className="mt-4">
            <a href="/" className="text-blue-600 hover:underline">
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
