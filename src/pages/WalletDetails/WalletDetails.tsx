// Wallet Details Page - User Statistics and Registration Data

import { memo, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";

export const WalletDetails = memo(() => {
  const [dateFilter, setDateFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("2025");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Mock data - replace with actual API call
  const walletData = {
    totalUsers: 18917,
    todayRegister: 5,
    yesterdayRegister: 96,
    currentWeekRegister: 5,
    dailyRegistration: {
      date: "24/11/2025",
      count: 5,
    },
    monthlyRegistration: {
      month: "Nov",
      year: 2025,
      count: 2675,
    },
    playActiveUsers: 48,
    playInactiveUsers: 18869,
    blockDevices: 27,
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = ["2023", "2024", "2025", "2026"];

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
        Metric: "Monthly Registration",
        Value: walletData.monthlyRegistration.count,
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
      { metric: "Today Register", value: walletData.todayRegister.toString() },
      {
        metric: "Yesterday Register",
        value: walletData.yesterdayRegister.toString(),
      },
      {
        metric: "Current Week Register",
        value: walletData.currentWeekRegister.toString(),
      },
      {
        metric: "Monthly Registration",
        value: walletData.monthlyRegistration.count.toString(),
      },
      {
        metric: "Play Active Users",
        value: walletData.playActiveUsers.toString(),
      },
      {
        metric: "Play Inactive Users",
        value: walletData.playInactiveUsers.toString(),
      },
      { metric: "Block Devices", value: walletData.blockDevices.toString() },
    ];
    exportToPDF({
      title: "Wallet Details Report",
      filename: "wallet_details",
      columns,
      data,
    });
    showToastNotification("✅ Exported to PDF");
  };

  return (
    <Layout>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-blue-600 text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-semibold">Wallet Details</h1>
        <p className="text-sm opacity-90 mt-1">
          User Statistics & Registration
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="relative">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="relative">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="relative">
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-3 pb-6">
        {/* Top Stats - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border-2 border-green-500 rounded-xl overflow-hidden shadow-sm">
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

        {/* Daily Registration Card */}
        <div className="bg-white border-2 border-blue-500 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-blue-500 text-white px-4 py-2">
            <h3 className="font-semibold">Daily Registration</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="text-gray-700">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{walletData.dailyRegistration.date}</p>
            </div>
            <p className="text-blue-600 text-3xl font-bold">
              {walletData.dailyRegistration.count}
            </p>
          </div>
        </div>

        {/* Monthly Registration Card */}
        <div className="bg-white border-2 border-purple-500 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-purple-500 text-white px-4 py-2">
            <h3 className="font-semibold">Monthly Registration</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="text-gray-700">
              <p className="text-sm text-gray-500">Period</p>
              <p className="font-medium">
                {walletData.monthlyRegistration.month}{" "}
                {walletData.monthlyRegistration.year}
              </p>
            </div>
            <p className="text-purple-600 text-3xl font-bold">
              {walletData.monthlyRegistration.count.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="bg-white border-2 border-green-500 rounded-xl overflow-hidden shadow-sm">
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

        <div className="bg-white border-2 border-red-500 rounded-xl overflow-hidden shadow-sm">
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

        <div className="bg-white border-2 border-gray-500 rounded-xl overflow-hidden shadow-sm">
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
