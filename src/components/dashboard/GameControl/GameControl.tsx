// GameControl component for managing game status and date

import { useState, useEffect } from "react";

interface GameControlProps {
  currentStatus: "Active" | "Inactive";
  currentDate: string;
  onDateChange?: (date: string) => void;
}

export const GameControl = ({
  currentStatus,
  currentDate,
  onDateChange,
}: GameControlProps) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Update selected date when currentDate prop changes
  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSetDate = () => {
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Game Status */}
      <div className="flex items-center justify-center gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm">
        <span className="text-sm sm:text-lg font-semibold text-gray-600">
          Game Status :
        </span>
        <span
          className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-sm ${
            currentStatus === "Active"
              ? "bg-green-700 text-white"
              : "bg-red-500 text-white"
          }`}
          aria-label={`Game status: ${currentStatus}`}
        >
          {currentStatus}
        </span>
      </div>

      {/* Date Selector */}
      <div className="flex flex-row gap-2 items-center bg-white rounded-xl p-3 sm:p-4 shadow-sm">
        <input
          type="date"
          className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button
          className="px-3 sm:px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold transition-all active:scale-95 whitespace-nowrap"
          onClick={handleSetDate}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
