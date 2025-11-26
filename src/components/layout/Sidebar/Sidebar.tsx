// Sidebar navigation component

import { memo } from "react";
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
  { icon: MdSportsEsports, label: "Funting Player", path: "/funting-player" },
  { icon: MdSettings, label: "Setting", path: "/setting" },
  { icon: MdHistory, label: "Activity Logs", path: "/activity-logs" },
  { icon: MdLogout, label: "Logout", path: "/logout" },
];

export const Sidebar = memo(({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "56px", height: "calc(100vh - 56px)" }}
      >
        {/* Menu Items - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.slice(0, -1).map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button at Bottom - Fixed */}
        <div className="px-2 pb-4 border-t border-gray-200 pt-2">
          <button
            onClick={() => {
              // Add logout logic here
              console.log("Logout clicked");
              navigate("/logout");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-900 text-white hover:bg-blue-800 rounded-lg transition-colors text-left"
          >
            <MdLogout className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
