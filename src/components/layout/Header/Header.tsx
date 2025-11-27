// Header component with app name and refresh button

import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCurrentDateTime } from "../../../hooks/useCurrentDateTime";

interface HeaderProps {
  onRefresh?: () => void;
  onMenuClick?: () => void;
}

const SPIN_DURATION = 2000; // milliseconds

export const Header = memo(({ onRefresh, onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const { currentDate, currentTime } = useCurrentDateTime();

  const handleRefresh = useCallback(() => {
    if (isSpinning) return; // Prevent multiple clicks

    setIsSpinning(true);
    onRefresh?.();

    setTimeout(() => {
      setIsSpinning(false);
    }, SPIN_DURATION);
  }, [isSpinning, onRefresh]);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center h-14 px-4 bg-white border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-1">
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-purple-600 transition-colors"
          aria-label="Open menu"
          type="button"
          onClick={onMenuClick}
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-light text-gray-900 hover:text-purple-600 transition-colors cursor-pointer"
          type="button"
        >
          A23 Admin
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Date and Time Display */}
        <div className="text-sm text-gray-600 text-right">
          <div>{currentDate}</div>
          <div>{currentTime}</div>
        </div>

        {/* Refresh Button */}
        {onRefresh && (
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-purple-600 transition-colors disabled:opacity-50"
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
      </div>
    </header>
  );
});

Header.displayName = "Header";
