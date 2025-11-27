// Skeleton loader components with optimized shimmer animations

export const StatCardSkeleton = () => (
  <div className="p-6 rounded-xl bg-white animate-skeleton-shimmer shadow-sm">
    <div className="h-4 bg-slate-200 rounded w-20 mb-3"></div>
    <div className="h-8 bg-slate-200 rounded w-32"></div>
  </div>
);

export const BannerSkeleton = () => (
  <div className="bg-white p-8 rounded-xl text-center shadow-lg animate-skeleton-shimmer">
    <div className="h-6 bg-slate-200 rounded w-48 mx-auto mb-3"></div>
    <div className="h-12 bg-slate-200 rounded w-24 mx-auto"></div>
  </div>
);

export const GameControlSkeleton = () => (
  <div className="bg-white rounded-xl p-6 animate-skeleton-shimmer shadow-sm">
    <div className="flex items-center gap-4 p-4 bg-slate-100 rounded-lg mb-6">
      <div className="h-5 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded-full w-20"></div>
    </div>
    <div className="flex gap-4">
      <div className="flex-1 h-12 bg-slate-100 rounded-lg"></div>
      <div className="h-12 bg-slate-200 rounded-lg w-32"></div>
    </div>
  </div>
);

export const GameStatsCardSkeleton = () => (
  <div className="rounded-xl p-6 bg-white animate-skeleton-shimmer shadow-sm">
    <div className="h-7 bg-slate-200 rounded w-24 mx-auto mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex justify-between py-3 border-b border-slate-100"
        >
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-4 pt-4 border-t-2 border-slate-100">
      <div className="h-5 bg-slate-200 rounded w-24"></div>
      <div className="h-6 bg-slate-200 rounded w-20"></div>
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

// Table Row Skeleton - for UserList, FundingPlayer
export const TableRowSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="divide-y divide-slate-100">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[50px_60px_1fr_80px_120px_80px_100px_80px] gap-2 p-3 items-center animate-skeleton-shimmer"
        >
          <div className="h-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
          <div className="h-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded"></div>
          <div className="h-5 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// Activity Card Skeleton - for ActivityLogs
export const ActivityCardSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-4 animate-skeleton-shimmer shadow-sm"
      >
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-slate-200 rounded-lg shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// List Item Skeleton - for DepositRequest, WithdrawRequest, WithdrawHistory
export const ListItemSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-4 animate-skeleton-shimmer shadow-sm"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-5 bg-slate-200 rounded w-1/3"></div>
            <div className="h-6 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// Request Card Skeleton - detailed version for request pages
export const RequestCardSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-4 animate-skeleton-shimmer shadow-sm border border-slate-100"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-5 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
            <div>
              <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
            <div>
              <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Profile Detail Skeleton - for UserProfile
export const ProfileDetailSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-skeleton-shimmer">
    <div className="bg-slate-200 h-32"></div>
    <div className="p-6 space-y-4">
      <div className="h-10 w-10 bg-slate-200 rounded-full mx-auto -mt-12"></div>
      <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto"></div>
      <div className="space-y-3 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
