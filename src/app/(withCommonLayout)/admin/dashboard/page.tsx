import PaymentChart from "@/src/components/Analytics/PaymentChart";
import PostActivityCart from "@/src/components/Analytics/PostActivity";
import UserActivityChart from "@/src/components/Analytics/UserActivity";
import { getMonthlyPosts } from "@/src/services/Post";
import { getActiveUsers, getMonthlyPayments } from "@/src/services/User";

export interface IAnalyticsProps {}
export interface IActiveUser {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  postCount: number;
}

export default async function Dashboard({}: IAnalyticsProps) {
  try {
    // Fetch the data from server action
    const monthlyPayments = await getMonthlyPayments();
    const monthlyPosts = await getMonthlyPosts();
    const activeUsers = await getActiveUsers();

    const activeUsersData: IActiveUser[] = activeUsers?.data?.map(
      (item: any) => ({
        user: `${item._id?.email}`,
        postCount: item.postCount,
      })
    );
    const monthlyPaymentData = monthlyPayments.data;
    const monthlyPostData = monthlyPosts.data;

    return (
      <div>
        <h2 className="text-2xl font-bold text-center">
          Monthly Payment activity
        </h2>
        <PaymentChart data={monthlyPaymentData} />
        <h2 className="text-2xl font-bold text-center">Active user</h2>
        <UserActivityChart data={activeUsersData} />
        <h2 className="text-2xl font-bold text-center">Post activity</h2>
        <PostActivityCart data={monthlyPostData} />
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
