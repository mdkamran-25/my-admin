// User Profile Page - displays detailed user information

import { memo, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ErrorState } from "../../components/common/ErrorState";
import { ProfileDetailSkeleton } from "../../components/common/SkeletonLoaders";
import { userApi } from "../../services/mockApi";
import { useGlobalStore } from "../../store/useGlobalStore";
import type { MockUser } from "../../services/mockData";
import { FaUser, FaEdit } from "react-icons/fa";

export const UserProfile = memo(() => {
  const { userId } = useParams();
  const addToast = useGlobalStore((state) => state.addToast);

  const [userProfile, setUserProfile] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const response = await userApi.getUserById(userId);
      if (!response.data) {
        throw new Error("User not found");
      }
      setUserProfile(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load user profile";
      setError(errorMessage);
      addToast({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  }, [userId, addToast]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleRefresh = useCallback(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Loading State */}
      {loading && <ProfileDetailSkeleton />}

      {/* Error State */}
      {error && !loading && (
        <ErrorState message={error} onRetry={fetchUserProfile} />
      )}

      {/* Profile Content */}
      {!loading && !error && userProfile && (
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

            {/* Name */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Name :</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {userProfile.name}
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
                Rs {userProfile.wallet.toFixed(2)} /-
              </span>
            </div>

            {/* Points */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Points :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.points}
              </span>
            </div>

            {/* Contact Number */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Contact number :</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {userProfile.phone}
                </span>
                <button className="text-gray-400 hover:text-blue-500">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Email :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.email || "N/A"}
              </span>
            </div>

            {/* User Info Button */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">User Info :</span>
              <button
                onClick={() => {
                  const info = `Phone: ${userProfile.phone}\nUsername: ${userProfile.username}`;
                  navigator.clipboard.writeText(info);
                  addToast({
                    message: "Phone & Username copied!",
                    type: "success",
                  });
                }}
                className="px-4 py-1 bg-cyan-400 text-white rounded-full text-sm font-medium hover:bg-cyan-500"
              >
                Copy Phone & Username
              </button>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Status :</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  userProfile.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {userProfile.status}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Location :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.city}, {userProfile.state}
              </span>
            </div>

            {/* Registration Date */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Registration Date :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.registrationDate}
              </span>
            </div>

            {/* Last Active Date */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Last Active :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.lastActiveDate}
              </span>
            </div>

            {/* Inactive Days */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Inactive Days :</span>
              <span className="text-gray-900 font-medium">
                {userProfile.inactiveDays} days
              </span>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">WhatsApp :</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  userProfile.hasWhatsapp
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {userProfile.hasWhatsapp ? "Available" : "Not Available"}
              </span>
            </div>

            {/* Device Status */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600 text-sm">Device Status :</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  userProfile.deviceBlocked
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {userProfile.deviceBlocked ? "Blocked" : "Active"}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
});

UserProfile.displayName = "UserProfile";
