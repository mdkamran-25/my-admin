// Dashboard helper utilities

import type {
  DashboardStats,
  GamePlayStats,
  GameWinStats,
  GameStatItem,
} from "../types";
import {
  formatNumber,
  formatCurrency,
  convertToInputFormat,
} from "./formatters";

/**
 * Maps overview stats to stat card configuration
 */
export const mapOverviewToStatCards = (stats: DashboardStats | null) => {
  if (!stats) return [];

  return [
    {
      title: "Users",
      value: formatNumber(stats.totalUsers),
      color: "blue" as const,
    },
    {
      title: "Wallet Amount",
      value: formatCurrency(stats.walletAmount),
      color: "pink" as const,
    },
  ];
};

/**
 * Maps play stats to game stat items array
 */
export const mapPlayStats = (
  playStats: GamePlayStats | null
): GameStatItem[] => {
  if (!playStats) return [];

  return [
    { label: "Matka Play", value: playStats.matkaPlay },
    { label: "Starline Play", value: playStats.starlinePlay },
    { label: "Jackpot Play", value: playStats.jackpotPlay },
  ];
};

/**
 * Maps win stats to game stat items array
 */
export const mapWinStats = (winStats: GameWinStats | null): GameStatItem[] => {
  if (!winStats) return [];

  return [
    { label: "Matka Win", value: winStats.matkaWin },
    { label: "Starline Win", value: winStats.starlineWin },
    { label: "Jackpot Win", value: winStats.jackpotWin },
  ];
};

/**
 * Gets the date in YYYY-MM-DD format for date input
 */
export const getDashboardDate = (date?: string): string => {
  return convertToInputFormat(date || "");
};

/**
 * Maps play & win stats to profit items (play - win per category)
 */
export const mapProfitStats = (
  playStats: GamePlayStats | null,
  winStats: GameWinStats | null
): { label: string; value: number }[] => {
  if (!playStats) return [];

  const matkaProfit = (playStats.matkaPlay || 0) - (winStats?.matkaWin || 0);
  const starlineProfit =
    (playStats.starlinePlay || 0) - (winStats?.starlineWin || 0);
  const jackpotProfit =
    (playStats.jackpotPlay || 0) - (winStats?.jackpotWin || 0);

  return [
    { label: "matka Profit", value: matkaProfit },
    { label: "starline Profit", value: starlineProfit },
    { label: "jackpot Profit", value: jackpotProfit },
  ];
};

export const mapAddMoneyStats = (addMoney?: any) => {
  if (!addMoney) return [];

  return [
    { label: "UPI", value: addMoney.upi || 0 },
    { label: "Gateway", value: addMoney.gateway || 0 },
    ...(addMoney.gatewayDetails
      ? Object.entries(addMoney.gatewayDetails).map(([k, v]) => ({
          label: `${k} (${v})`,
          value: Number(v) || 0,
        }))
      : []),
    { label: "Gateway Manually", value: addMoney.manually || 0 },
  ];
};

export const mapWithdrawMoneyStats = (withdraw?: any) => {
  if (!withdraw) return [];

  return [
    { label: "Request", value: withdraw.request || 0 },
    { label: "Normal :", value: withdraw.normal || 0 },
    { label: "Pending :", value: withdraw.pending || 0 },
    { label: "Manually", value: withdraw.manually || 0 },
  ];
};

export const mapRejectStats = (rejects?: any) => {
  if (!rejects) return [];

  return [
    { label: "Add Money Reject", value: rejects.addMoneyReject || 0 },
    { label: "Withdraw Money Reject", value: rejects.withdrawMoneyReject || 0 },
  ];
};
