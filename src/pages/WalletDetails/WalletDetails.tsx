// Wallet Details Page - User Statistics and Registration Data

import { memo } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

export const WalletDetails = memo(() => {
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

  return (
    <Layout bgColor="bg-gray-100" contentPadding="px-3 py-4">
      <BackButton />

      <div className="space-y-3">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-600 text-white p-5 rounded-2xl shadow-md">
            <h3 className="text-base font-normal mb-2">Total user</h3>
            <p className="text-3xl font-bold">
              {walletData.totalUsers.toLocaleString()}
            </p>
          </div>

          <div className="bg-orange-500 text-white p-5 rounded-2xl shadow-md">
            <h3 className="text-base font-normal mb-2">Today Register</h3>
            <p className="text-3xl font-bold">{walletData.todayRegister}</p>
          </div>

          <div className="bg-cyan-500 text-white p-5 rounded-2xl shadow-md">
            <h3 className="text-base font-normal mb-2">
              Yesterday
              <br />
              Register
            </h3>
            <p className="text-3xl font-bold">{walletData.yesterdayRegister}</p>
          </div>

          <div className="bg-pink-600 text-white p-5 rounded-2xl shadow-md">
            <h3 className="text-base font-normal mb-2">Current Week</h3>
            <p className="text-3xl font-bold">
              {walletData.currentWeekRegister}
            </p>
          </div>
        </div>

        {/* Daily Registration Card */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={walletData.dailyRegistration.date}
                readOnly
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-4xl font-bold text-blue-600 ml-4">
              {walletData.dailyRegistration.count}
            </div>
          </div>
        </div>

        {/* Monthly Registration Card */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <select className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none">
                <option>{walletData.monthlyRegistration.month}</option>
              </select>
              <select className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none">
                <option>{walletData.monthlyRegistration.year}</option>
              </select>
            </div>
            <div className="text-4xl font-bold text-blue-600">
              {walletData.monthlyRegistration.count.toLocaleString()}
            </div>
          </div>
        </div>

        {/* User Activity Stats */}
        <div className="bg-green-100 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-blue-700">
              Play Active User
            </h3>
            <p className="text-4xl font-bold text-blue-700">
              {walletData.playActiveUsers}
            </p>
          </div>
        </div>

        <div className="bg-pink-100 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-blue-700">
              Play Inactive User
            </h3>
            <p className="text-4xl font-bold text-blue-700">
              {walletData.playInactiveUsers.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-pink-100 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-blue-700">Block Device</h3>
            <p className="text-4xl font-bold text-blue-700">
              {walletData.blockDevices}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
});

WalletDetails.displayName = "WalletDetails";
