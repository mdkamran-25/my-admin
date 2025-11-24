// Dashboard page - main landing page

import { memo, useCallback } from "react";
import { Header } from "../../components/layout/Header";
import { StatCard } from "../../components/common/StatCard";
import { GameControl } from "../../components/dashboard/GameControl";
import { StatsSection } from "../../components/dashboard/StatsSection";
import { DashboardSkeleton } from "../../components/common/SkeletonLoaders";
import { ErrorState } from "../../components/common/ErrorState";
import { useDashboard } from "../../hooks/useDashboard";
import {
  mapOverviewToStatCards,
  mapPlayStats,
  mapWinStats,
  getDashboardDate,
} from "../../utils/dashboardHelpers";

/**
 * Main Dashboard Page Component
 * Displays overview stats, game controls, and play/win statistics
 */
export const Dashboard = memo(() => {
  const {
    stats: overviewStats,
    playStats,
    winStats,
    loading,
    error,
    refetch,
  } = useDashboard();

  // Memoize refetch callback to prevent unnecessary Header re-renders
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200">
        <Header onRefresh={handleRefresh} />
        <DashboardSkeleton />
      </div>
    );
  }

  // Error State
  if (error || !overviewStats) {
    return (
      <div className="min-h-screen bg-gray-200">
        <Header onRefresh={handleRefresh} />
        <ErrorState message={error || undefined} onRetry={handleRefresh} />
      </div>
    );
  }

  // Map data using helper utilities
  const statCards = mapOverviewToStatCards(overviewStats);
  const playStatsArray = mapPlayStats(playStats);
  const winStatsArray = mapWinStats(winStats);
  const dashboardDate = getDashboardDate(overviewStats.currentDate);

  // Main Dashboard Content
  return (
    <div className="min-h-screen bg-gray-200">
      <Header onRefresh={handleRefresh} />

      <main className="max-w-7xl mx-auto px-2 py-6 flex flex-col gap-4">
        {/* Withdrawal Request Banner */}
        <div className="bg-black text-white p-3 rounded-xl text-center shadow-lg">
          <h2 className="text-lg font-light mb-1 opacity-95">
            Withdraw Request
          </h2>
          <p className="text-3xl font-bold">{overviewStats.withdrawRequests}</p>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              color={card.color}
            />
          ))}
        </div>

        {/* Game Control Section */}
        <GameControl
          currentStatus={overviewStats.gameStatus}
          currentDate={dashboardDate}
        />

        {/* Play Statistics Section */}
        <StatsSection
          title="Play"
          stats={playStatsArray}
          total={playStats?.totalPlay || 0}
        />

        {/* Win Statistics Section */}
        <StatsSection
          title="Win"
          stats={winStatsArray}
          total={winStats?.totalWin || 0}
        />
      </main>
    </div>
  );
});

Dashboard.displayName = "Dashboard";
