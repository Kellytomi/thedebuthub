export default function ArticleCardSkeleton() {
  return (
    <div className="group flex flex-col items-center justify-between bg-[#0D0D0D] w-full h-[444px] rounded-lg p-4 animate-pulse">
      <div className="relative w-full h-[250px] mb-4 overflow-hidden rounded-md bg-gray-700"></div>
      <div className="flex flex-col items-start w-full">
        <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-700 rounded mt-1"></div>
      </div>
    </div>
  );
}
