// Core types for the admin panel

export type UserStatus = "active" | "inactive";

export interface MockUser {
  id: string;
  sn: number;
  username: string;
  name: string;
  phone: string;
  email: string;
  points: number;
  wallet: number;
  registrationDate: string;
  lastActiveDate: string;
  status: UserStatus;
  inactiveDays: number;
  hasWhatsapp: boolean;
  city: string;
  state: string;
  deviceBlocked: boolean;
}

export interface MockWithdrawRequest {
  id: string;
  userId: string;
  phone: string;
  name: string;
  username: string;
  amount: number;
  wallet: number;
  requestDate: string;
  status: "Pending" | "Processing" | "Approved" | "Rejected";
  type: "bank" | "upi";
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upiId?: string;
  notes?: string;
  rejectedReason?: string;
  processedAt?: string;
  processedBy?: string;
}

export interface MockDepositRequest {
  id: string;
  userId: string;
  phone: string;
  name: string;
  username: string;
  amount: number;
  wallet: number;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
  paymentMethod: "upi" | "bank" | "card";
  transactionId: string;
  upiId?: string;
}

export interface MockGamePlay {
  id: string;
  userId: string;
  username: string;
  phone: string;
  gameType: "main" | "starline";
  gameName: string;
  marketType: string;
  bidNumber: string;
  bidAmount: number;
  winAmount: number;
  playDate: string;
  playTime: string;
  status: "win" | "lose" | "pending";
}

export interface MockActivityLog {
  id: string;
  userId: string;
  username: string;
  phone: string;
  activity: string;
  timestamp: string;
  ipAddress: string;
  device: string;
}

export type LoginRole = "Super" | "Admin" | "Manager" | "User";

export interface BankDetails {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
}

export interface DeviceInfo {
  brand: string;
  model: string;
  deviceId: string;
  lastLoginTime: string;
  status: "active" | "blocked";
}

export interface UserProfile extends MockUser {
  password: string;
  loginRole: LoginRole;
  walletPointValue: number;
  bankDetails: BankDetails;
  deviceInfo: DeviceInfo;
  blockedGames: string[];
}

export type UserProfileExtras = Pick<
  UserProfile,
  | "password"
  | "loginRole"
  | "walletPointValue"
  | "bankDetails"
  | "deviceInfo"
  | "blockedGames"
>;

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
  bonus?: BonusStats;
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

export interface BonusStats {
  welcomeBonus: number;
  firstRechargeBonus: number;
}

export interface AddMoneyTransaction {
  id: string;
  userId: string;
  username: string;
  phone: string;
  amount: number;
  method: "upi" | "gateway" | "gateway-manually" | "manually";
  status: "pending" | "completed" | "rejected";
  transactionId?: string;
  upiId?: string;
  note?: string;
  acceptTime: string;
  createdAt: string;
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

export interface WalletDetailsData {
  totalUsers: number;
  todayRegister: number;
  yesterdayRegister: number;
  currentWeekRegister: number;
  playActiveUsers: number;
  playInactiveUsers: number;
  blockDevices: number;
}

export interface UserProfitLossData {
  id: string;
  sn: number;
  username: string;
  play: number;
  win: number;
  profitLoss: number;
  addMoney: number;
  withdrawMoney: number;
  points: number;
  userId: string;
}
