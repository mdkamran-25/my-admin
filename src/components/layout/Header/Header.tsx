// Header component with app name and refresh button

import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { useCurrentDateTime } from "../../../hooks/useCurrentDateTime";
import { useAuth } from "../../../contexts/AuthContext";

interface HeaderProps {
  onRefresh?: () => void;
  onMenuClick?: () => void;
}

const SPIN_DURATION = 2000; // milliseconds

export const Header = memo(({ onRefresh, onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { currentDate, currentTime } = useCurrentDateTime();

  const handleRefresh = useCallback(() => {
    if (isSpinning) return; // Prevent multiple clicks

    setIsSpinning(true);
    onRefresh?.();

    setTimeout(() => {
      setIsSpinning(false);
    }, SPIN_DURATION);
  }, [isSpinning, onRefresh]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout, navigate]);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center h-14 px-4 bg-black border-b border-gray-800">
      {/* Left Section */}
      <div className="flex items-center gap-1">
        <button
          className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
          aria-label="Open menu"
          type="button"
          onClick={onMenuClick}
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-light text-white hover:text-gray-300 transition-colors cursor-pointer"
          type="button"
        >
          A4 Ayan
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        {user && (
          <div className="text-sm text-gray-300 hidden md:block">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs">{user.phone}</div>
          </div>
        )}

        {/* Date and Time Display */}
        <div className="text-sm text-gray-300 text-right hidden sm:block">
          <div>{currentDate}</div>
          <div>{currentTime}</div>
        </div>

        {/* Refresh Button */}
        {onRefresh && (
          <button
            className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors disabled:opacity-50"
            onClick={handleRefresh}
            disabled={isSpinning}
            aria-label="Refresh data"
            type="button"
          >
            <FaSyncAlt
              className={`w-5 h-5 transition-transform duration-2000 ease-in-out ${
                isSpinning ? "rotate-720" : "rotate-0"
              }`}
            />
          </button>
        )}

        {/* Logout Button */}
        {user && (
          <button
            className="w-10 h-10 flex items-center justify-center text-white hover:text-red-400 transition-colors disabled:opacity-50"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="Logout"
            type="button"
            title="Logout"
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <MdLogout className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";
