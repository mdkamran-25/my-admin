// Authentication API Service
// Use relative path to leverage Vercel proxy and avoid CORS issues
const API_BASE_URL = "/api";

// Helper function to safely parse JSON responses
const safeJsonParse = async (response: Response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    // If parsing fails, throw with the original text or a generic message
    throw new Error(text || `Server error: ${response.status}`);
  }
};

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

    const result = await safeJsonParse(response);

    if (!response.ok) {
      throw new Error(result.message || "Failed to send OTP");
    }

    console.log("🔐 Login Response:", result);
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

    const result = await safeJsonParse(response);

    if (!response.ok) {
      throw new Error(result.message || "Failed to verify OTP");
    }

    return result;
  },

  // Get Profile (Protected)
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      credentials: "include",
    });

    const result = await safeJsonParse(response);

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch profile");
    }

    return result;
  },

  // Logout
  logout: async (): Promise<LogoutResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const result = await safeJsonParse(response);

    if (!response.ok) {
      throw new Error(result.message || "Failed to logout");
    }

    return result;
  },
};

export type { LoginResponse, VerifyOTPResponse };
