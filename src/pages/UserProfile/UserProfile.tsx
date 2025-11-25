// User Profile Page - displays detailed user information

import { memo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { FaUser, FaEdit } from "react-icons/fa";

interface UserProfile {
  id: string;
  username: string;
  password: string;
  walletPoint: number;
  contactNumber: string;
  loginWith: string;
  status: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  deviceInfo: {
    brand: string;
    model: string;
    deviceId: string;
    loginTime: string;
    status: string;
  };
  gameBlockList: string[];
}

export const UserProfile = memo(() => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data - replace with API call based on userId
  const userProfile: UserProfile = {
    id: userId || "1",
    username: "sonu",
    password: "81838",
    walletPoint: 0.5,
    contactNumber: "7974937487",
    loginWith: "Super",
    status: "active",
    accountHolder: "shakun",
    bankName: "Bank of Maharash",
    accountNumber: "60050885054",
    ifsc: "MAHB0000545",
    deviceInfo: {
      brand: "realme",
      model: "RMX3771",
      deviceId: "AP3A.240617.008RMX3771",
      loginTime: "31/10/2025 06:34 PM",
      status: "Active",
    },
    gameBlockList: [
      "SHRIDEVI",
      "TIME BAZAR",
      "MADHUR DAY",
      "MILAN DAY",
      "RAJDHANI DAY",
      "SUPREME DAY",
      "KALYAN",
      "GOLDEN DAY",
      "SHRIDEVI NIGHT",
      "MADHUR NIGHT",
      "SUPREME NIGHT",
      "MILAN NIGHT",
      "KALYAN NIGHT",
      "RAJDHANI NIGHT",
      "MAIN BAZAR",
    ],
  };

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleRefresh = useCallback(() => {
    console.log("Refreshing user profile...");
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Header onRefresh={handleRefresh} onMenuClick={handleMenuClick} />

      <main className="max-w-7xl mx-auto px-3 py-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Back
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 p-4 text-center">
            <div className="w-20 h-20 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
              <FaUser className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          {/* User Info Section */}
          <div className="p-4 space-y-3">
            {/* Username */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Username :</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {userProfile.username}
                </span>
                <button className="text-gray-400 hover:text-blue-500">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Password :</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {userProfile.password}
                </span>
                <button className="text-gray-400 hover:text-blue-500">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Wallet Point */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Wallet Point :</span>
              <span className="text-gray-900 font-medium">
                Rs {userProfile.walletPoint} /-
              </span>
            </div>

            {/* Contact Number */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Contact number :</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {userProfile.contactNumber}
                </span>
                <button className="text-gray-400 hover:text-blue-500">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Login With */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Login With :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.loginWith}
              </span>
            </div>

            {/* User Info Button */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">User Info :</span>
              <button className="px-4 py-1 bg-cyan-400 text-white rounded-full text-sm font-medium hover:bg-cyan-500">
                Copy Phone Password
              </button>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Status :</span>
              <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                {userProfile.status}
              </span>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-700 font-semibold">Account detail</h3>
              <button className="px-4 py-1 bg-cyan-400 text-white rounded-full text-sm font-medium hover:bg-cyan-500">
                Copy Bank Detail
              </button>
            </div>

            <div className="bg-white rounded-lg p-3 mb-3">
              <button className="w-full px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 mb-3">
                Bank change History
              </button>

              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600 text-sm">A/c Holder :</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {userProfile.accountHolder}
                    </span>
                    <button className="text-gray-400 hover:text-blue-500">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600 text-sm">Bank :</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {userProfile.bankName}
                    </span>
                    <button className="text-gray-400 hover:text-blue-500">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600 text-sm">A/c No. :</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {userProfile.accountNumber}
                    </span>
                    <button className="text-gray-400 hover:text-blue-500">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600 text-sm">IFSC :</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {userProfile.ifsc}
                    </span>
                    <button className="text-gray-400 hover:text-blue-500">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full mt-3 px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600">
                Save Bank Detail
              </button>
            </div>
          </div>

          {/* Device Info Section */}
          <div className="p-4 bg-white border-t">
            <h3 className="text-center text-gray-700 font-bold text-lg mb-3">
              Device Info
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600 text-sm">Brand :</span>
                <span className="text-gray-900 font-medium">
                  {userProfile.deviceInfo.brand}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600 text-sm">Model :</span>
                <span className="text-gray-900 font-medium">
                  {userProfile.deviceInfo.model}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600 text-sm">Device ID :</span>
                <span className="text-gray-900 font-medium text-xs">
                  {userProfile.deviceInfo.deviceId}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600 text-sm">Login Time :</span>
                <span className="text-gray-900 font-medium text-xs">
                  {userProfile.deviceInfo.loginTime}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600 text-sm">Device Status :</span>
                <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                  {userProfile.deviceInfo.status}
                </span>
              </div>
            </div>
          </div>

          {/* Game Block List Section */}
          <div className="p-4 bg-gray-50 border-t">
            <h3 className="text-center text-gray-700 font-bold text-lg mb-3">
              Game Block List
            </h3>

            <div className="space-y-2">
              {userProfile.gameBlockList.map((game, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2.5 rounded-lg font-medium"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">{game}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

UserProfile.displayName = "UserProfile";
