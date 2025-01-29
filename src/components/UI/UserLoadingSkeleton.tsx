import { Skeleton } from "@heroui/skeleton";

export default function UserLoadingSkeleton() {
  return (
    <div>
      <div className="flex items-center mb-4 gap-2">
        <Skeleton className="rounded-full w-12 h-12" />
        <div className="ml-3 space-y-2 flex-grow">
          <Skeleton className="w-full h-5 rounded-lg" />
          <Skeleton className="w-3/4 h-4 rounded-lg" />
        </div>
      </div>
      <div className="flex items-center mb-4 gap-2">
        <Skeleton className="rounded-full w-12 h-12" />
        <div className="ml-3 space-y-2 flex-grow">
          <Skeleton className="w-full h-5 rounded-lg" />
          <Skeleton className="w-3/4 h-4 rounded-lg" />
        </div>
      </div>
      <div className="flex items-center mb-4 gap-2">
        <Skeleton className="rounded-full w-12 h-12" />
        <div className="ml-3 space-y-2 flex-grow">
          <Skeleton className="w-full h-5 rounded-lg" />
          <Skeleton className="w-3/4 h-4 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
