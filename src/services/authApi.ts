// Authentication API Service
// Use relative path to leverage Vercel proxy and avoid CORS issues
const API_BASE_URL = "/api";

interface LoginRequest {
  phone: string;
  name?: string;
}

interface LoginResponse {
  status: boolean;
  type: "register" | "login";
  message: string;
  userId?: string;
}

interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export interface User {
  _id: string;
  userId: number; // Auto-increment ID from backend
  serialNumber: number; // Unique serial number
  name: string;
  phone: string;
  money: number; // User's wallet balance
  isVerified: boolean; // OTP verification status
  status: "pending" | "active" | "locked"; // Account status
  role: string; // User role (e.g., "admin", "user")
  createdAt: string;
}

interface VerifyOTPResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface ProfileResponse {
  status: boolean;
  user: User;
}

interface LogoutResponse {
  status: boolean;
  message: string;
}

export const authApi = {
  // Request OTP / Login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send OTP");
    }

    const result = await response.json();
    console.log("🔐 Login Response:", result); // Log to see if OTP is included
    return result;
  },

  // Verify OTP
  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to verify OTP");
    }

    return response.json();
  },

  // Get Profile (Protected)
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch profile");
    }

    return response.json();
  },

  // Logout
  logout: async (): Promise<LogoutResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to logout");
    }

    return response.json();
  },
};

export type { LoginResponse, VerifyOTPResponse };
