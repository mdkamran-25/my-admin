// Win History Page - displays bid history with filters

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

type FilterType = "All" | "Win" | "loose" | "pending" | "cancelled";

export const WinHistory = memo(() => {
  const [gameType, setGameType] = useState("Game Type");
  const [gameList, setGameList] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [openClose, setOpenClose] = useState("Both");
  const [userSearch, setUserSearch] = useState("");
  const [numberSearch, setNumberSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType,
      gameList,
      date: selectedDate,
      openClose,
      userSearch,
      numberSearch,
    });
  }, [gameType, gameList, selectedDate, openClose, userSearch, numberSearch]);

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

  return (
    <Layout>
      <BackButton />

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Game Type */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game Type
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Game Type">Game Type</option>
              <option value="Main">Main</option>
              <option value="Starline">Starline</option>
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              <option value="KALYAN NIGHT">KALYAN NIGHT</option>
              <option value="SRIDEVI">SRIDEVI</option>
              <option value="TIME BAZAR">TIME BAZAR</option>
              <option value="MADHUR DAY">MADHUR DAY</option>
              <option value="MILAN DAY">MILAN DAY</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Date */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Open/Close */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Open / Close
            </label>
            <select
              value={openClose}
              onChange={(e) => setOpenClose(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Both">Both</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* User Search */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              User
            </label>
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search for a ..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number Search */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Number
            </label>
            <input
              type="text"
              value={numberSearch}
              onChange={(e) => setNumberSearch(e.target.value)}
              placeholder=""
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Filter
        </button>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterClick("All")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "All"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterClick("Win")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "Win"
              ? "bg-green-600 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Win
        </button>
        <button
          onClick={() => handleFilterClick("loose")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "loose"
              ? "bg-pink-600 text-white"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          loose
        </button>
        <button
          onClick={() => handleFilterClick("pending")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          pending
        </button>
        <button
          onClick={() => handleFilterClick("cancelled")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "cancelled"
              ? "bg-cyan-600 text-white"
              : "bg-cyan-500 text-white hover:bg-cyan-600"
          }`}
        >
          cancelled
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="bg-yellow-500 grid grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_1fr] gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">
                Username
                <br />
                Phone
              </div>
              <div className="text-center">
                Market
                <br />
                Type
                <br />
                Time
              </div>
              <div className="text-center">Status</div>
              <div className="text-center">No.</div>
              <div className="text-center">Amount</div>
              <div className="text-center">
                Win
                <br />
                Amt
              </div>
            </div>

            {/* Empty State - No data to display */}
            <div className="p-8 text-center text-gray-400">
              No records found
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrevious}
          className="flex-1 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          PERVS
        </button>
        <div className="px-6 py-3 bg-gray-600 text-white rounded-full text-base font-semibold">
          0/0
        </div>
        <button
          onClick={handleNext}
          className="flex-1 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          NEXT
        </button>
      </div>
    </Layout>
  );
});

WinHistory.displayName = "WinHistory";
