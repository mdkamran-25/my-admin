// User Profile Page - displays detailed user information

import { memo, useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ErrorState } from "../../components/common/ErrorState";
import { ProfileDetailSkeleton } from "../../components/common/SkeletonLoaders";
import { userApi } from "../../services/mockApi";
import { useGlobalStore } from "../../store/useGlobalStore";
import { LOGIN_ROLES, GAME_BLOCK_OPTIONS } from "../../constants";
import type { UserProfile as UserProfileData, UserStatus } from "../../types";
import { FaUser } from "react-icons/fa";

export const UserProfile = memo(() => {
  const { userId } = useParams();
  const addToast = useGlobalStore((state) => state.addToast);

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [formState, setFormState] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
      setFormState(response.data);
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

  const updateBaseField = useCallback(
    <K extends keyof UserProfileData>(key: K, value: UserProfileData[K]) => {
      setFormState((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    []
  );

  const updateBankField = useCallback(
    <K extends keyof UserProfileData["bankDetails"]>(
      key: K,
      value: UserProfileData["bankDetails"][K]
    ) => {
      setFormState((prev) =>
        prev
          ? {
              ...prev,
              bankDetails: { ...prev.bankDetails, [key]: value },
            }
          : prev
      );
    },
    []
  );

  const updateDeviceField = useCallback(
    <K extends keyof UserProfileData["deviceInfo"]>(
      key: K,
      value: UserProfileData["deviceInfo"][K]
    ) => {
      setFormState((prev) =>
        prev
          ? {
              ...prev,
              deviceInfo: { ...prev.deviceInfo, [key]: value },
              deviceBlocked:
                key === "status"
                  ? (value as UserProfileData["deviceInfo"]["status"]) ===
                    "blocked"
                  : prev.deviceBlocked,
            }
          : prev
      );
    },
    []
  );

  const handleToggleGame = useCallback((game: string) => {
    setFormState((prev) => {
      if (!prev) return prev;
      const exists = prev.blockedGames.includes(game);
      const nextGames = exists
        ? prev.blockedGames.filter((item) => item !== game)
        : [...prev.blockedGames, game];
      return { ...prev, blockedGames: nextGames };
    });
  }, []);

  const handleCopy = useCallback(
    (text: string, message: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => addToast({ message, type: "success" }))
        .catch(() =>
          addToast({ message: "Unable to copy to clipboard", type: "error" })
        );
    },
    [addToast]
  );

  const handleCopyCredentials = useCallback(() => {
    if (!formState) return;
    const payload = `Phone: ${formState.phone}\nUsername: ${formState.username}`;
    handleCopy(payload, "Phone & username copied");
  }, [formState, handleCopy]);

  const handleCopyPhonePassword = useCallback(() => {
    if (!formState) return;
    const payload = `Phone: ${formState.phone}\nPassword: ${formState.password}`;
    handleCopy(payload, "Phone & password copied");
  }, [formState, handleCopy]);

  const handleCopyBankDetail = useCallback(() => {
    if (!formState) return;
    const { bankDetails } = formState;
    const payload = `Account Holder: ${bankDetails.accountHolder}\nBank: ${bankDetails.bankName}\nAccount: ${bankDetails.accountNumber}\nIFSC: ${bankDetails.ifsc}`;
    handleCopy(payload, "Bank details copied");
  }, [formState, handleCopy]);

  const handleBankHistory = useCallback(() => {
    addToast({
      message: "Bank change history feature coming soon",
      type: "info",
    });
  }, [addToast]);

  const isDirty = useMemo(() => {
    if (!userProfile || !formState) return false;
    return JSON.stringify(formState) !== JSON.stringify(userProfile);
  }, [formState, userProfile]);

  const handleReset = useCallback(() => {
    setFormState(userProfile);
  }, [userProfile]);

  const handleSave = useCallback(async () => {
    if (!userId || !formState || !isDirty) return;
    setIsSaving(true);
    try {
      const response = await userApi.updateUserProfile(userId, formState);
      if (!response.data) {
        throw new Error(response.error || "Failed to update profile");
      }
      setUserProfile(response.data);
      setFormState(response.data);
      addToast({
        message: response.message || "User profile updated",
        type: "success",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to save profile";
      addToast({ message, type: "error" });
    } finally {
      setIsSaving(false);
    }
  }, [userId, formState, isDirty, addToast]);

  const statusOptions: UserStatus[] = ["active", "inactive"];

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Loading State */}
      {loading && <ProfileDetailSkeleton />}

      {/* Error State */}
      {error && !loading && (
        <ErrorState message={error} onRetry={fetchUserProfile} />
      )}

      {!loading && !error && formState && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 text-center text-white">
              <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
                <FaUser className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold capitalize">
                {formState.name || formState.username}
              </h2>
              <p className="text-sm opacity-90">
                User since {formState.registrationDate}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Account Controls */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Account Controls
                  </h3>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <button
                      onClick={handleCopyCredentials}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-cyan-500 text-white hover:bg-cyan-600"
                    >
                      Copy Phone & Username
                    </button>
                    <button
                      onClick={handleCopyPhonePassword}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      Copy Phone & Password
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-gray-600">
                    Username
                    <input
                      value={formState.username}
                      onChange={(e) =>
                        updateBaseField("username", e.target.value)
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Password
                    <input
                      value={formState.password}
                      onChange={(e) =>
                        updateBaseField("password", e.target.value)
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Contact Number
                    <input
                      value={formState.phone}
                      onChange={(e) => updateBaseField("phone", e.target.value)}
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Email
                    <input
                      value={formState.email}
                      onChange={(e) => updateBaseField("email", e.target.value)}
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Wallet Balance (₹)
                    <input
                      type="number"
                      value={formState.wallet}
                      onChange={(e) =>
                        updateBaseField("wallet", Number(e.target.value))
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Points
                    <input
                      type="number"
                      value={formState.points}
                      onChange={(e) =>
                        updateBaseField("points", Number(e.target.value))
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Wallet Point Rate (₹)
                    <input
                      type="number"
                      step="0.1"
                      value={formState.walletPointValue}
                      onChange={(e) =>
                        updateBaseField(
                          "walletPointValue",
                          Number(e.target.value)
                        )
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Login With
                    <select
                      value={formState.loginRole}
                      onChange={(e) =>
                        updateBaseField(
                          "loginRole",
                          e.target.value as UserProfileData["loginRole"]
                        )
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {LOGIN_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Status
                    <select
                      value={formState.status}
                      onChange={(e) =>
                        updateBaseField("status", e.target.value as UserStatus)
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </section>

              {/* Bank Details */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Bank Details
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={handleCopyBankDetail}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-200 text-gray-700 hover:bg-slate-300"
                    >
                      Copy Bank Detail
                    </button>
                    <button
                      onClick={handleBankHistory}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-green-500 text-white hover:bg-green-600"
                    >
                      Bank Change History
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-gray-600">
                    Account Holder
                    <input
                      value={formState.bankDetails.accountHolder}
                      onChange={(e) =>
                        updateBankField("accountHolder", e.target.value)
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Bank Name
                    <input
                      value={formState.bankDetails.bankName}
                      onChange={(e) =>
                        updateBankField("bankName", e.target.value)
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    Account Number
                    <input
                      value={formState.bankDetails.accountNumber}
                      onChange={(e) =>
                        updateBankField("accountNumber", e.target.value)
                      }
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600">
                    IFSC Code
                    <input
                      value={formState.bankDetails.ifsc}
                      onChange={(e) => updateBankField("ifsc", e.target.value)}
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                  className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white font-semibold disabled:bg-gray-400"
                >
                  {isSaving ? "Saving..." : "Save Bank Detail"}
                </button>
              </section>

              {/* Device + Games */}
              <div className="grid gap-6 lg:grid-cols-2">
                <section className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Device Info
                  </h3>
                  <div className="space-y-3">
                    <label className="flex flex-col text-sm text-gray-600">
                      Brand
                      <input
                        value={formState.deviceInfo.brand}
                        onChange={(e) =>
                          updateDeviceField("brand", e.target.value)
                        }
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm text-gray-600">
                      Model
                      <input
                        value={formState.deviceInfo.model}
                        onChange={(e) =>
                          updateDeviceField("model", e.target.value)
                        }
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm text-gray-600">
                      Device ID
                      <input
                        value={formState.deviceInfo.deviceId}
                        onChange={(e) =>
                          updateDeviceField("deviceId", e.target.value)
                        }
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm text-gray-600">
                      Last Login Time
                      <input
                        value={formState.deviceInfo.lastLoginTime}
                        onChange={(e) =>
                          updateDeviceField("lastLoginTime", e.target.value)
                        }
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex flex-col text-sm text-gray-600">
                      Device Status
                      <select
                        value={formState.deviceInfo.status}
                        onChange={(e) =>
                          updateDeviceField(
                            "status",
                            e.target
                              .value as UserProfileData["deviceInfo"]["status"]
                          )
                        }
                        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </label>
                  </div>
                </section>

                <section className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Game Block List
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {GAME_BLOCK_OPTIONS.map((game) => {
                      const isBlocked = formState.blockedGames.includes(game);
                      return (
                        <button
                          type="button"
                          key={game}
                          onClick={() => handleToggleGame(game)}
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                            isBlocked
                              ? "bg-orange-500 border-orange-500 text-white"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        >
                          {game}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Footer actions */}
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={handleReset}
                  disabled={!isDirty || isSaving}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Reset Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isSaving ? "Saving..." : "Save All Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
});

UserProfile.displayName = "UserProfile";
