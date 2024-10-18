import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="fixed left-0 top-14 border-r h-screen px-4 py-6">
        <div className="flex flex-col gap-4">
          <Link href={"/admin/dashboard/manage-users"}>Manage users</Link>
          <Link href={"/admin/dashboard/manage-content"}>Manage Content</Link>
          <Link href={"/admin/dashboard/analytics"}>Analytics</Link>
        </div>
      </div>
      <main>
        <div className="mt-20">{children}</div>
      </main>
    </div>
  );
}
