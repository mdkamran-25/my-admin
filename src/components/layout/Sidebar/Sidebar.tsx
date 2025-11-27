// Sidebar navigation component

import { memo, useState, useEffect } from "react";
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
} from "react-icons/md";
import { SettingsModal } from "../../common/SettingsModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/" },
  { icon: MdList, label: "User List", path: "/users" },
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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

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
        className={`fixed left-0 w-64 pb-20 lg:pb-0 bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
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
                      if (isSettingsButton) {
                        setIsSettingsModalOpen(true);
                      } else {
                        if (item.path) {
                          navigate(item.path);
                        }
                        onClose();
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isLogoutButton
                        ? "bg-blue-900 text-white hover:bg-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
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
