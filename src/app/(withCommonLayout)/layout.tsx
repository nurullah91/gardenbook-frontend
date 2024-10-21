import { Navbar } from "@/src/components/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="mt-20">{children}</main>
    </div>
  );
}
