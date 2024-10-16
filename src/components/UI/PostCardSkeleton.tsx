import { Skeleton } from "@nextui-org/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      {/* User Info Skeleton */}
      <div className="flex items-center mb-4">
        <Skeleton className="rounded-full w-12 h-12" />
        <div className="ml-3 space-y-2">
          <Skeleton className="w-36 h-5 rounded-lg" />
          <Skeleton className="w-24 h-4 rounded-lg" />
          <Skeleton className="w-20 h-3 rounded-lg" />
        </div>
      </div>

      {/* Post Content Skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton className="w-full h-5 rounded-lg" />
        <Skeleton className="w-11/12 h-5 rounded-lg" />
        <Skeleton className="w-10/12 h-5 rounded-lg" />
      </div>

      {/* Post Photos Skeleton */}
      <div className="mb-4">
        <Skeleton className="w-full h-52 rounded-lg" />
      </div>

      {/* Footer Skeleton (Upvote, Downvote, etc.) */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>

        {/* Content Type Skeleton */}
        <Skeleton className="w-20 h-5 rounded-lg" />
      </div>
    </div>
  );
}
