// Mock API service to simulate backend calls with realistic delays

import {
  mockUsers,
  mockWithdrawRequests,
  mockGamePlays,
  mockActivityLogs,
  getUserById,
  getUserWithdrawRequests,
  getUserGamePlays,
  getUserActivityLogs,
  type MockUser,
  type MockWithdrawRequest,
  type MockGamePlay,
  type MockActivityLog,
} from "./mockData";

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
  getUserById: async (id: string): Promise<ApiResponse<MockUser>> => {
    await delay(300);

    const user = getUserById(id);
    if (user) {
      return { success: true, data: user };
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

  // Update user
  updateUser: async (
    id: string,
    updates: Partial<MockUser>
  ): Promise<ApiResponse<MockUser>> => {
    await delay(600);

    const user = getUserById(id);
    if (user) {
      const updatedUser = { ...user, ...updates };
      return {
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      };
    }

    return { success: false, error: "User not found" };
  },

  // Block/Unblock user
  toggleUserStatus: async (id: string): Promise<ApiResponse<MockUser>> => {
    await delay(500);

    const user = getUserById(id);
    if (user) {
      const updatedUser = {
        ...user,
        status:
          user.status === "active"
            ? ("inactive" as const)
            : ("active" as const),
      };
      return {
        success: true,
        data: updatedUser,
        message: "User status updated",
      };
    }

    return { success: false, error: "User not found" };
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
