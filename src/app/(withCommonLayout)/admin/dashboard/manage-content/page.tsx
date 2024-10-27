import ContentManagementTable from "@/src/components/UI/Dashboard/ContentManagementTable";
import { getAllPosts } from "@/src/services/Post";
import { TPost } from "@/src/types";

export interface IManageUsersProps {}
export default async function ManageContent({}: IManageUsersProps) {
  try {
    // Fetch the data from server action
    const data = await getAllPosts([
      { name: "page", value: 1 },
      { name: "limit", value: 20 },
    ]);

    const posts: TPost[] = data.data;

    return (
      <div>
        <h2 className="text-4xl text-center">Manage Content</h2>
        <ContentManagementTable posts={posts} />
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
