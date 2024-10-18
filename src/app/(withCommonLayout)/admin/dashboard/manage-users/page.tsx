import UserManagementTable from "@/src/components/UI/Dashboard/UserManagementTable";
import { getAllUsers } from "@/src/services/User";
import { TUser } from "@/src/types";

export interface IManageUsersProps {}
export default async function ManageUsers({}: IManageUsersProps) {
  try {
    // Fetch the data from server action
    const data = await getAllUsers();

    const users: TUser[] = data.data;

    return (
      <div>
        <h2 className="text-4xl text-center">Manage users</h2>
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
            We encountered an unexpected error. Please try again
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
