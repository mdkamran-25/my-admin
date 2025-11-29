// Mock API service to simulate backend calls with realistic delays

import {
  mockUsers,
  mockWithdrawRequests,
  mockDepositRequests,
  mockGamePlays,
  mockActivityLogs,
  getUserById,
  getUserWithdrawRequests,
  getUserGamePlays,
  getUserActivityLogs,
  getUserProfileDetails,
  updateUserProfileDetails,
} from "./mockData";
import type {
  MockUser,
  MockWithdrawRequest,
  MockDepositRequest,
  MockGamePlay,
  MockActivityLog,
  UserProfile,
} from "../types";

// Simulate network delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

// User API
type UpdateUserProfileFn = (
  id: string,
  updates: Partial<UserProfile>
) => Promise<ApiResponse<UserProfile>>;

const updateUserProfileHandler: UpdateUserProfileFn = async (id, updates) => {
  await delay(600);

  const updatedProfile = updateUserProfileDetails(id, updates);
  if (updatedProfile) {
    return {
      success: true,
      data: updatedProfile,
      message: "User updated successfully",
    };
  }

  return { success: false, error: "User not found" };
};

export const userApi = {
  // Get all users
  getUsers: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MockUser>> => {
    await delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockUsers.slice(start, end);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockUsers.length / limit),
        itemsPerPage: limit,
        totalItems: mockUsers.length,
      },
    };
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<UserProfile>> => {
    await delay(300);

    const profile = getUserProfileDetails(id);
    if (profile) {
      return { success: true, data: profile };
    }

    return { success: false, error: "User not found" };
  },

  // Search users
  searchUsers: async (query: string): Promise<ApiResponse<MockUser[]>> => {
    await delay(400);

    const searchTerm = query.toLowerCase();
    const results = mockUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.name.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    return { success: true, data: results };
  },

  // Update user profile
  updateUserProfile: updateUserProfileHandler,

  updateUser: updateUserProfileHandler,

  // Block/Unblock user
  toggleUserStatus: async (id: string): Promise<ApiResponse<UserProfile>> => {
    await delay(500);

    const baseUser = getUserById(id);
    if (!baseUser) {
      return { success: false, error: "User not found" };
    }

    const nextStatus =
      baseUser.status === "active"
        ? ("inactive" as const)
        : ("active" as const);

    const updatedProfile = updateUserProfileDetails(id, { status: nextStatus });
    if (!updatedProfile) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      data: updatedProfile,
      message: "User status updated",
    };
  },
};

// Withdrawal API
export const withdrawalApi = {
  // Get all withdrawal requests
  getWithdrawals: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MockWithdrawRequest>> => {
    await delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockWithdrawRequests.slice(start, end);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockWithdrawRequests.length / limit),
        itemsPerPage: limit,
        totalItems: mockWithdrawRequests.length,
      },
    };
  },

  // Get withdrawal by ID
  getWithdrawalById: async (
    id: string
  ): Promise<ApiResponse<MockWithdrawRequest>> => {
    await delay(300);

    const withdrawal = mockWithdrawRequests.find((w) => w.id === id);
    if (withdrawal) {
      return { success: true, data: withdrawal };
    }

    return { success: false, error: "Withdrawal request not found" };
  },

  // Get user withdrawals
  getUserWithdrawals: async (
    userId: string
  ): Promise<ApiResponse<MockWithdrawRequest[]>> => {
    await delay(400);

    const withdrawals = getUserWithdrawRequests(userId);
    return { success: true, data: withdrawals };
  },

  // Update withdrawal status
  updateWithdrawalStatus: async (
    id: string,
    status: "Pending" | "Approved" | "Rejected"
  ): Promise<ApiResponse<MockWithdrawRequest>> => {
    await delay(600);

    const withdrawal = mockWithdrawRequests.find((w) => w.id === id);
    if (withdrawal) {
      const updated = { ...withdrawal, status };
      return {
        success: true,
        data: updated,
        message: `Withdrawal ${status.toLowerCase()}`,
      };
    }

    return { success: false, error: "Withdrawal request not found" };
  },

  // Update withdrawal status with notes
  updateWithdrawalWithNotes: async (
    id: string,
    status: "Pending" | "Processing" | "Approved" | "Rejected",
    notes?: string,
    rejectedReason?: string
  ): Promise<ApiResponse<MockWithdrawRequest>> => {
    await delay(600);

    const withdrawal = mockWithdrawRequests.find((w) => w.id === id);
    if (withdrawal) {
      const updated: MockWithdrawRequest = {
        ...withdrawal,
        status,
        notes: notes || withdrawal.notes,
        rejectedReason: rejectedReason || withdrawal.rejectedReason,
        processedAt: new Date().toISOString(),
        processedBy: "Admin", // In real app, would be current logged-in admin
      };
      return {
        success: true,
        data: updated,
        message: `Withdrawal ${status.toLowerCase()}`,
      };
    }

    return { success: false, error: "Withdrawal request not found" };
  },
};

// Deposit API
export const depositApi = {
  // Get all deposit requests
  getDeposits: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MockDepositRequest>> => {
    await delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockDepositRequests.slice(start, end);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockDepositRequests.length / limit),
        itemsPerPage: limit,
        totalItems: mockDepositRequests.length,
      },
    };
  },

  // Get deposit by ID
  getDepositById: async (
    id: string
  ): Promise<ApiResponse<MockDepositRequest>> => {
    await delay(300);

    const deposit = mockDepositRequests.find((d) => d.id === id);
    if (deposit) {
      return { success: true, data: deposit };
    }

    return { success: false, error: "Deposit request not found" };
  },

  // Update deposit status
  updateDepositStatus: async (
    id: string,
    status: "Pending" | "Approved" | "Rejected"
  ): Promise<ApiResponse<MockDepositRequest>> => {
    await delay(600);

    const deposit = mockDepositRequests.find((d) => d.id === id);
    if (deposit) {
      const updated = { ...deposit, status };
      return {
        success: true,
        data: updated,
        message: `Deposit ${status.toLowerCase()}`,
      };
    }

    return { success: false, error: "Deposit request not found" };
  },
};

// Game API
export const gameApi = {
  // Get all game plays
  getGamePlays: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MockGamePlay>> => {
    await delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockGamePlays.slice(start, end);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockGamePlays.length / limit),
        itemsPerPage: limit,
        totalItems: mockGamePlays.length,
      },
    };
  },

  // Get user game plays
  getUserGamePlays: async (
    userId: string
  ): Promise<ApiResponse<MockGamePlay[]>> => {
    await delay(400);

    const plays = getUserGamePlays(userId);
    return { success: true, data: plays };
  },

  // Get games by type
  getGamesByType: async (
    gameType: "main" | "starline"
  ): Promise<ApiResponse<MockGamePlay[]>> => {
    await delay(400);

    const games = mockGamePlays.filter((play) => play.gameType === gameType);
    return { success: true, data: games };
  },
};

// Activity Log API
export const activityApi = {
  // Get all activity logs
  getActivityLogs: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MockActivityLog>> => {
    await delay();

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockActivityLogs.slice(start, end);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockActivityLogs.length / limit),
        itemsPerPage: limit,
        totalItems: mockActivityLogs.length,
      },
    };
  },

  // Get user activity logs
  getUserActivityLogs: async (
    userId: string
  ): Promise<ApiResponse<MockActivityLog[]>> => {
    await delay(400);

    const logs = getUserActivityLogs(userId);
    return { success: true, data: logs };
  },

  // Add activity log
  addActivityLog: async (
    log: Omit<MockActivityLog, "id">
  ): Promise<ApiResponse<MockActivityLog>> => {
    await delay(300);

    const newLog: MockActivityLog = {
      id: `al-${Date.now()}`,
      ...log,
    };

    return { success: true, data: newLog, message: "Activity logged" };
  },
};

// Statistics API
export const statsApi = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    await delay(500);

    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter((u) => u.status === "active").length;
    const totalWithdrawals = mockWithdrawRequests.reduce(
      (sum, req) => sum + req.amount,
      0
    );
    const pendingWithdrawals = mockWithdrawRequests.filter(
      (req) => req.status === "Pending"
    ).length;
    const totalGames = mockGamePlays.length;
    const totalWins = mockGamePlays.filter(
      (play) => play.status === "win"
    ).length;
    const totalWinAmount = mockGamePlays
      .filter((play) => play.status === "win")
      .reduce((sum, play) => sum + play.winAmount, 0);

    return {
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: totalUsers - activeUsers,
          growthRate: 12.5,
        },
        withdrawals: {
          total: totalWithdrawals,
          pending: pendingWithdrawals,
          approved: mockWithdrawRequests.filter(
            (req) => req.status === "Approved"
          ).length,
          rejected: mockWithdrawRequests.filter(
            (req) => req.status === "Rejected"
          ).length,
        },
        games: {
          total: totalGames,
          wins: totalWins,
          losses: mockGamePlays.filter((play) => play.status === "lose").length,
          pending: mockGamePlays.filter((play) => play.status === "pending")
            .length,
          totalWinAmount,
        },
      },
    };
  },

  // Get recent activities
  getRecentActivities: async (limit: number = 10) => {
    await delay(300);

    const recentLogs = mockActivityLogs.slice(0, limit);
    return { success: true, data: recentLogs };
  },
};

// Error simulation (for testing error handling)
export const simulateError = async (
  errorMessage: string = "Network error"
): Promise<ApiResponse<never>> => {
  await delay(1000);
  return { success: false, error: errorMessage };
};
