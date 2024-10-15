import { Spinner } from "@nextui-org/spinner";

export interface ILoadingProps {}
export default function LoadingPage({}: ILoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full backdrop-blur-sm">
      <div className="text-center">
        <Spinner size="lg" />
        <h2 className="mt-4 text-lg font-semibold text-gray-700">
          Loading, please wait...
        </h2>
      </div>
    </div>
  );
}
