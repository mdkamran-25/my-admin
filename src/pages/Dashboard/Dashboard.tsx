// Dashboard page - main landing page

import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaUsers, FaWallet } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { StatCard } from "../../components/common/StatCard";
import { GameControl } from "../../components/dashboard/GameControl";
import { StatsSection } from "../../components/dashboard/StatsSection";
import { GameStatsCard } from "../../components/dashboard/GameStatsCard";
import { DashboardSkeleton } from "../../components/common/SkeletonLoaders";
import { ErrorState } from "../../components/common/ErrorState";
import { useDashboard } from "../../hooks/useDashboard";
import {
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

  const handleWithdrawClick = useCallback(() => {
    navigate("/withdraw-request");
  }, [navigate]);

  const handleDepositClick = useCallback(() => {
    navigate("/deposit-request");
  }, [navigate]);

  const handleUsersClick = useCallback(() => {
    navigate("/users");
  }, [navigate]);

  const handleWalletClick = useCallback(() => {
    navigate("/wallet-details");
  }, [navigate]);

  const handleAddMoneyClick = useCallback(() => {
    navigate("/add-money-history");
  }, [navigate]);

  const handlePlayClick = useCallback(() => {
    navigate("/game-report");
  }, [navigate]);

  const handleWinClick = useCallback(() => {
    navigate("/win-report");
  }, [navigate]);

  // Loading State
  if (loading) {
    return (
      <Layout
        onRefresh={handleRefresh}
        bgColor="bg-gray-200"
        contentPadding="px-2 py-6"
      >
        <DashboardSkeleton />
      </Layout>
    );
  }

  // Error State
  if (error || !overviewStats) {
    return (
      <Layout
        onRefresh={handleRefresh}
        bgColor="bg-gray-200"
        contentPadding="px-2 py-6"
      >
        <ErrorState message={error || undefined} onRetry={handleRefresh} />
      </Layout>
    );
  }

  // Map data using helper utilities
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
    <Layout
      onRefresh={handleRefresh}
      bgColor="bg-yellow-50"
      contentPadding="px-4 py-6 sm:px-6"
    >
      <div className="flex flex-col gap-4">
        {/* Request Banners - 2 columns on all screen sizes */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={
              <div className="flex items-center gap-1">
                <FaArrowDown className="text-sm font-extrabold" />
                <span className="text-xl text-green-400 font-bold">₹</span>
              </div>
            }
            title="Withdraw Request"
            value={overviewStats.withdrawRequests}
            color="black"
            onClick={handleWithdrawClick}
          />
          <StatCard
            icon={
              <div className="flex items-center gap-1">
                <FaArrowUp className="text-sm font-extrabold" />
                <span className="text-xl text-green-400 font-bold">₹</span>
              </div>
            }
            title="Deposit Request"
            value={overviewStats.depositRequests || 0}
            color="black"
            onClick={handleDepositClick}
          />
        </div>

        {/* Users and Wallet Amount - 2 columns matching request cards style */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<FaUsers />}
            title="Users"
            value={overviewStats.totalUsers || 0}
            color="blue"
            onClick={handleUsersClick}
          />
          <StatCard
            icon={<FaWallet />}
            title="Wallet Amount"
            value={overviewStats.walletAmount || 0}
            color="green"
            onClick={handleWalletClick}
          />
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
          collapsibleOnMobile={false}
          onClick={handlePlayClick}
        />

        {/* Win Statistics Section */}
        <div onClick={handleWinClick} className="cursor-pointer">
          <GameStatsCard
            title="Win"
            variant="win"
            stats={winStatsArray}
            totalLabel="Total Win"
            totalValue={winStats?.totalWin || 0}
            collapsibleOnMobile={false}
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
            collapsibleOnMobile={false}
          />
        </div>

        {/* Total Add Money */}
        <div onClick={handleAddMoneyClick} className="cursor-pointer">
          <GameStatsCard
            title="Total Add Money"
            variant="add"
            stats={addMoneyStatsArray}
            totalLabel="Total"
            totalValue={overviewStats.addMoney?.total || 0}
            collapsibleOnMobile={false}
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
            collapsibleOnMobile={false}
          />
        </div>

        {/* Reject Money Request */}
        <div>
          <GameStatsCard
            title="Reject Money Request"
            variant="reject"
            stats={rejectStatsArray}
            totalLabel=""
            collapsibleOnMobile={false}
          />
        </div>
      </div>
    </Layout>
  );
});

Dashboard.displayName = "Dashboard";
