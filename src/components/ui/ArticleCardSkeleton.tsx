"use client";

interface ArticleCardSkeletonProps {
  delay?: number;
}

export default function ArticleCardSkeleton({ delay = 0 }: ArticleCardSkeletonProps) {
  return (
    <div 
      className="flex flex-col w-full h-auto gap-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image skeleton with border */}
      <div className="relative w-full h-[350px] overflow-hidden rounded-xl bg-[#171717] animate-pulse"></div>
      {/* Text content skeleton */}
      <div className="flex flex-col gap-1">
        {/* Title skeleton */}
        <div className="h-6 bg-[#171717] animate-pulse rounded w-4/5"></div>
      </div>
    </div>
  );
}