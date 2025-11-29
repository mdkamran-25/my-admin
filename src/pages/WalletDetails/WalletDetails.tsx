// Wallet Details Page - User Statistics and Registration Data

import { memo, useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { WalletDetailsData } from "../../types";
import {
  getTodayString,
  getYesterdayString,
  countRegistrationsByDate,
  getWeekRegistrations,
  countBlockedDevices,
  parseDate,
} from "../../utils/walletHelpers";
import { mockUsers } from "../../services/mockData";

export const WalletDetails = memo(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date") || "";

  const [dateFilter, setDateFilter] = useState(dateParam);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [walletData, setWalletData] = useState<WalletDetailsData>({
    totalUsers: 0,
    todayRegister: 0,
    yesterdayRegister: 0,
    currentWeekRegister: 0,
    playActiveUsers: 0,
    playInactiveUsers: 0,
    blockDevices: 0,
  });

  // Auto-apply filter on page load if date param exists
  useEffect(() => {
    if (dateParam) {
      setDateFilter(dateParam);
      calculateStats();
    }
  }, []); // Only run on mount

  // Calculate stats based on selected date filter
  const calculateStats = useCallback(() => {
    let filteredUsers = mockUsers;

    // Apply date filter if set
    if (dateFilter) {
      const [year, month, day] = dateFilter.split("-");
      const filterDateStr = `${day}/${month}/${year}`;
      filteredUsers = mockUsers.filter(
        (u) => u.registrationDate === filterDateStr
      );
    }

    // Calculate play active/inactive users based on last active date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activeUsers = 0;
    let inactiveUsers = 0;

    filteredUsers.forEach((user) => {
      const lastActive = parseDate(user.lastActiveDate);
      if (lastActive) {
        lastActive.setHours(0, 0, 0, 0);
        const diffDays = Math.floor(
          (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays <= 7 && user.status === "active") {
          activeUsers++;
        } else if (diffDays > 7) {
          inactiveUsers++;
        }
      }
    });

    // Calculate statistics from filtered users
    const totalUsers = filteredUsers.length;
    const blockedDevicesCount = countBlockedDevices(filteredUsers);

    // Get today and yesterday registrations (always from current date)
    const todayStr = getTodayString();
    const yesterdayStr = getYesterdayString();
    const todayCount = countRegistrationsByDate(mockUsers, todayStr);
    const yesterdayCount = countRegistrationsByDate(mockUsers, yesterdayStr);

    // Get current week registrations
    const weekUsers = getWeekRegistrations(mockUsers);
    const weekCount = weekUsers.length;

    setWalletData({
      totalUsers,
      todayRegister: todayCount,
      yesterdayRegister: yesterdayCount,
      currentWeekRegister: weekCount,
      playActiveUsers: activeUsers,
      playInactiveUsers: inactiveUsers,
      blockDevices: blockedDevicesCount,
    });
  }, [dateFilter]);

  // Manual apply/reset handlers
  const handleApplyFilter = useCallback(() => {
    setIsFiltering(true);
    calculateStats();
    // Persist date filter in URL
    if (dateFilter) {
      setSearchParams({ date: dateFilter });
    } else {
      setSearchParams({});
    }
    setIsFiltering(false);
    showToastNotification("Filter applied successfully!");
  }, [dateFilter, calculateStats, setSearchParams]);

  const handleResetFilters = useCallback(() => {
    setDateFilter("");
    setSearchParams({}); // Clear URL params
    setWalletData({
      totalUsers: 0,
      todayRegister: 0,
      yesterdayRegister: 0,
      currentWeekRegister: 0,
      playActiveUsers: 0,
      playInactiveUsers: 0,
      blockDevices: 0,
    });
    showToastNotification("Filters reset");
  }, [setSearchParams]);

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExportCSV = () => {
    const csvData = [
      {
        Metric: "Total Users",
        Value: walletData.totalUsers,
      },
      {
        Metric: "Today Register",
        Value: walletData.todayRegister,
      },
      {
        Metric: "Yesterday Register",
        Value: walletData.yesterdayRegister,
      },
      {
        Metric: "Current Week Register",
        Value: walletData.currentWeekRegister,
      },

      {
        Metric: "Play Active Users",
        Value: walletData.playActiveUsers,
      },
      {
        Metric: "Play Inactive Users",
        Value: walletData.playInactiveUsers,
      },
      {
        Metric: "Block Devices",
        Value: walletData.blockDevices,
      },
    ];
    exportToCSV(csvData, "wallet_details");
    showToastNotification("✅ Exported to CSV");
  };

  const handleExportPDF = () => {
    const columns = [
      { header: "Metric", dataKey: "metric" },
      { header: "Value", dataKey: "value" },
    ];
    const data = [
      { metric: "Total Users", value: walletData.totalUsers.toString() },
      {
        metric: "Today Register",
        value: walletData.todayRegister.toString(),
      },
      {
        metric: "Yesterday Register",
        value: walletData.yesterdayRegister.toString(),
      },
      {
        metric: "Current Week Register",
        value: walletData.currentWeekRegister.toString(),
      },

      {
        metric: "Play Active Users",
        value: walletData.playActiveUsers.toString(),
      },
      {
        metric: "Play Inactive Users",
        value: walletData.playInactiveUsers.toString(),
      },
      {
        metric: "Block Devices",
        value: walletData.blockDevices.toString(),
      },
    ];
    exportToPDF({
      title: "Wallet Details Report",
      filename: "wallet_details",
      columns,
      data,
    });
    showToastNotification("✅ Exported to PDF");
  };

  const handleRefresh = useCallback(() => {
    calculateStats();
    showToastNotification("✅ Data refreshed");
  }, [calculateStats]);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-blue-600 text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-semibold">Wallet Details</h1>
        <p className="text-sm opacity-90 mt-1">
          User Statistics & Registration
        </p>
      </div>

      {/* Date Filter */}
      <div className="mb-4">
        <div className="relative">
          {!dateFilter && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">
              dd/mm/yyyy
            </span>
          )}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !dateFilter ? "text-transparent" : ""
            }`}
          />
        </div>
      </div>

      {/* Apply & Reset Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleApplyFilter}
          disabled={isFiltering}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
        >
          {isFiltering ? "Applying..." : "Apply Filter"}
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="space-y-3 pb-6">
        {/* Top Stats - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="bg-white border-2 border-green-500 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const url = dateFilter
                ? `/user-profit-loss?date=${dateFilter}`
                : "/user-profit-loss";
              navigate(url);
            }}
          >
            <div className="p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Total Users</p>
              <p className="text-green-600 text-3xl font-bold">
                {walletData.totalUsers.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-500 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Today Register</p>
              <p className="text-orange-600 text-3xl font-bold">
                {walletData.todayRegister}
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-cyan-500 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Yesterday Register</p>
              <p className="text-cyan-600 text-3xl font-bold">
                {walletData.yesterdayRegister}
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-pink-500 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Current Week</p>
              <p className="text-pink-600 text-3xl font-bold">
                {walletData.currentWeekRegister}
              </p>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div
          className="bg-white border-2 border-green-500 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            const url = dateFilter
              ? `/user-segments?segment=play-active&date=${dateFilter}`
              : "/user-segments?segment=play-active";
            navigate(url);
          }}
        >
          <div className="bg-green-500 text-white px-4 py-2">
            <h3 className="font-semibold">Play Active Users</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-600">Currently Active</span>
            </div>
            <p className="text-green-600 text-3xl font-bold">
              {walletData.playActiveUsers}
            </p>
          </div>
        </div>

        <div
          className="bg-white border-2 border-red-500 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            const url = dateFilter
              ? `/user-segments?segment=play-inactive&date=${dateFilter}`
              : "/user-segments?segment=play-inactive";
            navigate(url);
          }}
        >
          <div className="bg-red-500 text-white px-4 py-2">
            <h3 className="font-semibold">Play Inactive Users</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-gray-600">Currently Inactive</span>
            </div>
            <p className="text-red-600 text-3xl font-bold">
              {walletData.playInactiveUsers.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          className="bg-white border-2 border-gray-500 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            const url = dateFilter
              ? `/user-segments?segment=block-devices&date=${dateFilter}`
              : "/user-segments?segment=block-devices";
            navigate(url);
          }}
        >
          <div className="bg-gray-700 text-white px-4 py-2">
            <h3 className="font-semibold">Block Devices</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Blocked</span>
            </div>
            <p className="text-gray-700 text-3xl font-bold">
              {walletData.blockDevices}
            </p>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mt-4 flex justify-center">
        <ExportButtons
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          disabled={false}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </Layout>
  );
});

WalletDetails.displayName = "WalletDetails";
