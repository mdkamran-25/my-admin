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
