// Dashboard page - main landing page

import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { StatCard } from "../../components/common/StatCard";
import { GameControl } from "../../components/dashboard/GameControl";
import { StatsSection } from "../../components/dashboard/StatsSection";
import { GameStatsCard } from "../../components/dashboard/GameStatsCard";
import { DashboardSkeleton } from "../../components/common/SkeletonLoaders";
import { ErrorState } from "../../components/common/ErrorState";
import { useDashboard } from "../../hooks/useDashboard";
import {
  mapOverviewToStatCards,
  mapPlayStats,
  mapProfitStats,
  mapAddMoneyStats,
  mapWithdrawMoneyStats,
  mapRejectStats,
  mapWinStats,
  getDashboardDate,
} from "../../utils/dashboardHelpers";

/**
 * Main Dashboard Page Component
 * Displays overview stats, game controls, and play/win statistics
 */
export const Dashboard = memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleWithdrawClick = useCallback(() => {
    navigate("/withdraw-request");
  }, [navigate]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200">
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <Header onRefresh={handleRefresh} onMenuClick={handleMenuClick} />
        <DashboardSkeleton />
      </div>
    );
  }

  // Error State
  if (error || !overviewStats) {
    return (
      <div className="min-h-screen bg-gray-200">
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <Header onRefresh={handleRefresh} onMenuClick={handleMenuClick} />
        <ErrorState message={error || undefined} onRetry={handleRefresh} />
      </div>
    );
  }

  // Map data using helper utilities
  const statCards = mapOverviewToStatCards(overviewStats);
  const playStatsArray = mapPlayStats(playStats);
  const winStatsArray = mapWinStats(winStats);
  const profitStatsArray = mapProfitStats(playStats, winStats);
  const profitTotal = (playStats?.totalPlay || 0) - (winStats?.totalWin || 0);
  const addMoneyStatsArray = mapAddMoneyStats(overviewStats?.addMoney);
  const withdrawMoneyStatsArray = mapWithdrawMoneyStats(
    overviewStats?.withdrawMoney
  );
  const rejectStatsArray = mapRejectStats(overviewStats?.rejectRequests);
  const dashboardDate = getDashboardDate(overviewStats.currentDate);

  // Main Dashboard Content
  return (
    <div className="min-h-screen bg-gray-200">
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Header onRefresh={handleRefresh} onMenuClick={handleMenuClick} />

      <main className="max-w-7xl mx-auto px-2 py-6 flex flex-col gap-4">
        {/* Withdrawal Request Banner */}
        <button
          onClick={handleWithdrawClick}
          className="bg-black text-white p-3 rounded-xl text-center shadow-lg hover:bg-gray-800 transition-colors w-full cursor-pointer active:scale-95"
          type="button"
        >
          <h2 className="text-lg font-light mb-1 opacity-95">
            Withdraw Request
          </h2>
          <p className="text-3xl font-bold">{overviewStats.withdrawRequests}</p>
        </button>

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
        <div>
          <GameStatsCard
            title="Win"
            variant="win"
            stats={winStatsArray}
            totalLabel="Total Win"
            totalValue={winStats?.totalWin || 0}
          />
        </div>

        {/* Profit - Loss */}
        <div>
          <GameStatsCard
            title="Profit - Loss"
            variant="profit"
            stats={profitStatsArray}
            totalLabel="total Profit"
            totalValue={profitTotal}
          />
        </div>

        {/* Total Add Money */}
        <div>
          <GameStatsCard
            title="Total Add Money"
            variant="add"
            stats={addMoneyStatsArray}
            totalLabel="Total"
            totalValue={overviewStats.addMoney?.total || 0}
          />
        </div>

        {/* Total Withdraw Money */}
        <div>
          <GameStatsCard
            title="Total Withdraw Money"
            variant="withdraw"
            stats={withdrawMoneyStatsArray}
            totalLabel="Total"
            totalValue={overviewStats.withdrawMoney?.total || 0}
          />
        </div>

        {/* Reject Money Request */}
        <div>
          <GameStatsCard
            title="Reject Money Request"
            variant="reject"
            stats={rejectStatsArray}
            totalLabel=""
          />
        </div>
      </main>
    </div>
  );
});

Dashboard.displayName = "Dashboard";
