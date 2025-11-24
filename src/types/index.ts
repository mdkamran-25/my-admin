// Core types for the admin panel

export interface DashboardStats {
  withdrawRequests: number;
  totalUsers: number;
  walletAmount: number;
  gameStatus: "Active" | "Inactive";
  currentDate?: string;
}

export interface GamePlayStats {
  matkaPlay: number;
  starlinePlay: number;
  jackpotPlay: number;
  totalPlay: number;
}

export interface GameWinStats {
  matkaWin: number;
  starlineWin: number;
  jackpotWin: number;
  totalWin: number;
}

export interface GameStatItem {
  label: string;
  value: number;
}
