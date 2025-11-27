// Core types for the admin panel

export interface DashboardStats {
  withdrawRequests: number;
  depositRequests?: number;
  totalUsers: number;
  walletAmount: number;
  gameStatus: "Active" | "Inactive";
  currentDate?: string;
  addMoney?: AddMoneyStats;
  withdrawMoney?: WithdrawMoneyStats;
  rejectRequests?: RejectMoneyStats;
}

export interface AddMoneyStats {
  upi: number;
  gateway: number;
  gatewayDetails?: Record<string, number>;
  manually: number;
  total: number;
}

export interface WithdrawMoneyStats {
  request: number;
  normal: number;
  pending: number;
  manually: number;
  total: number;
}

export interface RejectMoneyStats {
  addMoneyReject: number;
  withdrawMoneyReject: number;
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
