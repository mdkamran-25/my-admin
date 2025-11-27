// Custom hook for dashboard data management

import { useState, useEffect, useCallback } from "react";
import type { DashboardStats, GamePlayStats, GameWinStats } from "../types";
import { getCurrentDate } from "../utils/formatters";
// import { apiService } from '../services/api';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [playStats, setPlayStats] = useState<GamePlayStats | null>(null);
  const [winStats, setWinStats] = useState<GameWinStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // For now, using mock data until backend is ready
      setStats({
        withdrawRequests: 16,
        depositRequests: 24,
        totalUsers: 18917,
        walletAmount: 717290.5,
        gameStatus: "Active",
        currentDate: getCurrentDate(),
        addMoney: {
          upi: 0,
          gateway: 9957,
          gatewayDetails: { Imb: 0, Pride: 0 },
          manually: 0,
          total: 9957,
        },
        withdrawMoney: {
          request: 0,
          normal: 0,
          pending: 0,
          manually: 48075,
          total: 48075,
        },
        rejectRequests: {
          addMoneyReject: 0,
          withdrawMoneyReject: 0,
        },
      });

      setPlayStats({
        matkaPlay: 12843,
        starlinePlay: 1043,
        jackpotPlay: 540,
        totalPlay: 14426,
      });

      setWinStats({
        matkaWin: 0,
        starlineWin: 0,
        jackpotWin: 0,
        totalWin: 0,
      });

      // Uncomment when backend is ready:
      // const [statsData, playData, winData] = await Promise.all([
      //   apiService.getDashboardStats(),
      //   apiService.getGamePlayStats(),
      //   apiService.getGameWinStats(),
      // ]);
      // setStats({ ...statsData, currentDate: getCurrentDate() });
      // setPlayStats(playData);
      // setWinStats(winData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    playStats,
    winStats,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};
