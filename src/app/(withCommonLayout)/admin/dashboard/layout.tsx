import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="fixed left-0 top-14 lg:h-screen px-4 py-6 z-20 backdrop-blur-md lg:w-60 w-full shadow-lg p-4 shadow-blue-600/30">
        <div className=" h-fit   rounded-md">
          <div className="flex flex-col gap-4">
            <Link
              href={"/admin/dashboard/manage-users"}
              className="shadow-md py-3 px-2 rounded shadow-blue-600/20"
            >
              Manage users
            </Link>
            <Link
              href={"/admin/dashboard/manage-content"}
              className="shadow-md py-3 px-2 rounded shadow-blue-600/20"
            >
              Manage Content
            </Link>
            <Link
              href={"/admin/dashboard/analytics"}
              className="shadow-md py-3 px-2 rounded shadow-blue-600/20"
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
      <main>
        <div className="lg:ml-24 w-full mt-[300px] lg:mt-16">{children}</div>
      </main>
    </div>
  );
}
