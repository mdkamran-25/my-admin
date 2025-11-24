// API service layer - centralized API calls

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Dashboard APIs
  async getDashboardStats() {
    return this.request("/dashboard/stats");
  }

  async getGamePlayStats() {
    return this.request("/dashboard/game-play");
  }

  async getGameWinStats() {
    return this.request("/dashboard/game-win");
  }
}

export const apiService = new ApiService();
