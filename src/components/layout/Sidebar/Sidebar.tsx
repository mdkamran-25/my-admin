// Sidebar navigation component

import { memo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdList,
  MdBookmark,
  MdBarChart,
  MdAssessment,
  MdEmojiEvents,
  MdAddCircle,
  MdCancel,
  MdSportsEsports,
  MdSettings,
  MdHistory,
  MdLogout,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { SettingsModal } from "../../common/SettingsModal";
import { useAuth } from "../../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/" },
  { icon: MdList, label: "User List", path: "/users" },
  {
    icon: MdAccountBalanceWallet,
    label: "Withdraw History",
    path: "/withdraw-history",
  },
  { icon: MdBookmark, label: "Profit Loose", path: "/profit-loose" },
  { icon: MdBarChart, label: "Result & Report", path: "/result-report" },
  {
    icon: MdAssessment,
    label: "Report Generation",
    path: "/report-generation",
  },
  { icon: MdEmojiEvents, label: "Win History", path: "/win-history" },
  {
    icon: MdEmojiEvents,
    label: "Profit Loose Starline",
    path: "/profit-loose-starline",
  },
  {
    icon: MdEmojiEvents,
    label: "Win History Starline",
    path: "/win-history-starline",
  },
  {
    icon: MdAssessment,
    label: "Report Generation Starline",
    path: "/report-generation-starline",
  },
  { icon: MdAddCircle, label: "Add New Game", path: "/add-game" },
  { icon: MdCancel, label: "Game Cancel", path: "/game-cancel" },
  { icon: MdSportsEsports, label: "Funding Player", path: "/funding-player" },
  { icon: MdHistory, label: "Activity Logs", path: "/activity-logs" },
  { icon: MdSettings, label: "Settings", path: null, isModal: true },
  { icon: MdLogout, label: "Logout", path: "/logout", isLogout: true },
];

export const Sidebar = memo(({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      onClose();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout, navigate, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll without changing position
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.touchAction = "none";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Invisible Backdrop - Only for closing sidebar on click outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20"
          style={{ top: "56px" }}
          onClick={onClose}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 w-64 pb-20 lg:pb-0 bg-amber-50 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: "56px",
          height: "calc(100vh - 56px)",
        }}
      >
        {/* All Menu Items - Scrollable Including Settings and Logout */}
        <nav className="h-full overflow-y-auto overflow-x-hidden py-4">
          <ul className="space-y-1 px-2 pb-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isLogoutButton = item.isLogout;
              const isSettingsButton = item.isModal;

              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      if (isLogoutButton) {
                        handleLogout();
                      } else if (isSettingsButton) {
                        setIsSettingsModalOpen(true);
                      } else {
                        if (item.path) {
                          navigate(item.path);
                        }
                        onClose();
                      }
                    }}
                    disabled={isLogoutButton && isLoggingOut}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isLogoutButton
                        ? "bg-black text-white hover:bg-gray-900 disabled:opacity-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {isLogoutButton && isLoggingOut ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Icon className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">
                      {isLogoutButton && isLoggingOut
                        ? "Logging out..."
                        : item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
});

Sidebar.displayName = "Sidebar";
