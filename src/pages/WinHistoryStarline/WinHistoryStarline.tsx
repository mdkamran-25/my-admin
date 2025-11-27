// Win History Starline Page - displays starline bid history with filters

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";

type FilterType = "All" | "Win" | "loose" | "pending";

export const WinHistoryStarline = memo(() => {
  const [gameType, setGameType] = useState("Game Type");
  const [gameList, setGameList] = useState("starline");
  const [selectedDate, setSelectedDate] = useState("24/11/2025");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [userSearch, setUserSearch] = useState("");
  const [numberSearch, setNumberSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType,
      gameList,
      date: selectedDate,
      time: selectedTime,
      userSearch,
      numberSearch,
    });
  }, [
    gameType,
    gameList,
    selectedDate,
    selectedTime,
    userSearch,
    numberSearch,
  ]);

  const handleFilterClick = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
    console.log(`Filter changed to: ${filter}`);
  }, []);

  const handlePrevious = useCallback(() => {
    console.log("Navigate to previous page");
  }, []);

  const handleNext = useCallback(() => {
    console.log("Navigate to next page");
  }, []);

  const filterButtons: Array<{
    type: FilterType;
    label: string;
    color: string;
  }> = [
    { type: "All", label: "All", color: "bg-blue-500" },
    { type: "Win", label: "Win", color: "bg-green-500" },
    { type: "loose", label: "loose", color: "bg-red-500" },
    { type: "pending", label: "pending", color: "bg-yellow-500" },
  ];

  return (
    <Layout bgColor="bg-gray-200" contentPadding="px-3 py-4">
      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Game Type */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game Type
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Game Type</option>
              <option>Matka</option>
              <option>Starline</option>
              <option>Jackpot</option>
            </select>
          </div>

          {/* Game List */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game List
            </label>
            <select
              value={gameList}
              onChange={(e) => setGameList(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>starline</option>
              <option>All Games</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
              <option>4:00 PM</option>
              <option>5:00 PM</option>
              <option>6:00 PM</option>
              <option>7:00 PM</option>
              <option>8:00 PM</option>
              <option>9:00 PM</option>
              <option>10:00 PM</option>
            </select>
          </div>

          {/* User Search */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              User
            </label>
            <input
              type="text"
              placeholder="Search for a ..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Number Search */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Number
            </label>
            <input
              type="text"
              placeholder=""
              value={numberSearch}
              onChange={(e) => setNumberSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
        >
          Filter
        </button>
      </div>

      {/* Filter Type Buttons */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => handleFilterClick(btn.type)}
            className={`px-6 py-2 rounded-full text-white font-medium text-base shadow-md whitespace-nowrap transition-all active:scale-95 ${
              activeFilter === btn.type
                ? btn.color
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-500">
                <th className="px-3 py-4 text-left text-white font-semibold text-sm border-r border-orange-400">
                  Username
                  <br />
                  Phone
                </th>
                <th className="px-3 py-4 text-left text-white font-semibold text-sm border-r border-orange-400">
                  Market
                  <br />
                  Type
                  <br />
                  Time
                </th>
                <th className="px-3 py-4 text-left text-white font-semibold text-sm border-r border-orange-400">
                  Status
                </th>
                <th className="px-3 py-4 text-left text-white font-semibold text-sm border-r border-orange-400">
                  No.
                </th>
                <th className="px-3 py-4 text-left text-white font-semibold text-sm border-r border-orange-400">
                  Amount
                </th>
                <th className="px-3 py-4 text-left text-white font-semibold text-sm">
                  Win
                  <br />
                  Amt
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state - no data */}
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrevious}
          className="flex-1 bg-blue-500 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 active:scale-95 transition-all uppercase"
        >
          PERVS
        </button>

        <div className="px-6 py-4 bg-gray-500 text-white rounded-full font-bold text-lg shadow-lg">
          0/0
        </div>

        <button
          onClick={handleNext}
          className="flex-1 bg-blue-500 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 active:scale-95 transition-all uppercase"
        >
          NEXT
        </button>
      </div>
    </Layout>
  );
});

WinHistoryStarline.displayName = "WinHistoryStarline";
