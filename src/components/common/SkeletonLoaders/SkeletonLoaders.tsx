// Skeleton loader components for Dashboard

export const StatCardSkeleton = () => (
  <div className="p-6 rounded-xl bg-gray-200 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>
    <div className="h-8 bg-gray-300 rounded w-32"></div>
  </div>
);

export const BannerSkeleton = () => (
  <div className="bg-gray-200 p-8 rounded-xl text-center shadow-lg animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-3"></div>
    <div className="h-12 bg-gray-300 rounded w-24 mx-auto"></div>
  </div>
);

export const GameControlSkeleton = () => (
  <div className="bg-gray-100 rounded-xl p-6 animate-pulse">
    <div className="flex items-center gap-4 p-4 bg-gray-200 rounded-lg mb-6">
      <div className="h-5 bg-gray-300 rounded w-32"></div>
      <div className="h-8 bg-gray-300 rounded-full w-20"></div>
    </div>
    <div className="flex gap-4">
      <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
      <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
    </div>
  </div>
);

export const GameStatsCardSkeleton = () => (
  <div className="rounded-xl p-6 bg-gray-200 animate-pulse">
    <div className="h-7 bg-gray-300 rounded w-24 mx-auto mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex justify-between py-3 border-b border-gray-300"
        >
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-4 pt-4 border-t-2 border-gray-300">
      <div className="h-5 bg-gray-300 rounded w-24"></div>
      <div className="h-6 bg-gray-300 rounded w-20"></div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
    <BannerSkeleton />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
    <GameControlSkeleton />
    <GameStatsCardSkeleton />
    <GameStatsCardSkeleton />
  </div>
);
