import GBDrawer from "@/src/components/GBDrawer/GBDrawer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex gap-2  flex-col md:flex-row">
      <div className="md:fixed">
        <GBDrawer />
      </div>
      <div className="md:ml-64 w-full">{children}</div>
    </div>
  );
}
