import { Navbar } from "@/src/components/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>
        <div className="mt-20">{children}</div>
      </main>
    </div>
  );
}
