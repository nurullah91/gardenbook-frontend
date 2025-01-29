import { Spinner } from "@heroui/spinner";

export default function LoadingAnimation() {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div className="text-center">
        <Spinner size="lg" />
        <h2 className="mt-4 text-lg font-semibold text-gray-700">
          Loading, please wait...
        </h2>
      </div>
    </div>
  );
}
