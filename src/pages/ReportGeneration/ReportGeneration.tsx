// Report Generation Page - displays bid reports with filters

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";

export const ReportGeneration = memo(() => {
  const [gameType, setGameType] = useState("Game Type");
  const [gameList, setGameList] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [openClose, setOpenClose] = useState("Both");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType,
      gameList,
      date: selectedDate,
      openClose,
      search: searchQuery,
    });
  }, [gameType, gameList, selectedDate, openClose, searchQuery]);

  const handleCopyAllBids = useCallback(() => {
    console.log("Copying all bids...");
  }, []);

  const handleCopySingleAnk = useCallback(() => {
    console.log("Copying single ank...");
  }, []);

  const handleCopyJodi = useCallback(() => {
    console.log("Copying jodi...");
  }, []);

  const handleCopySinglePana = useCallback(() => {
    console.log("Copying single pana...");
  }, []);

  const handleCopyDoublePana = useCallback(() => {
    console.log("Copying double pana...");
  }, []);

  const handleCopyTriplePana = useCallback(() => {
    console.log("Copying triple pana...");
  }, []);

  return (
    <Layout>
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              <option value="SRIDEVI">SRIDEVI</option>
              <option value="TIME BAZAR">TIME BAZAR</option>
              <option value="MADHUR DAY">MADHUR DAY</option>
              <option value="MILAN DAY">MILAN DAY</option>
              <option value="KALYAN">KALYAN</option>
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="mb-3">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a ..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Filter
        </button>
      </div>

      {/* Copy All Bids Section */}
      <div className="bg-yellow-500 rounded-2xl p-4 mb-4 shadow-lg">
        <div className="h-8"></div>
      </div>

      <button
        onClick={handleCopyAllBids}
        className="w-full mb-4 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Copy All Bids
      </button>

      {/* Yellow Divider */}
      <div className="bg-yellow-500 rounded-full h-2 mb-4"></div>

      {/* Copy Single Ank */}
      <button
        onClick={handleCopySingleAnk}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Copy Single Ank
      </button>

      {/* Single Ank Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Game</div>
              <div className="text-center">Type</div>
              <div className="text-center">Open Close</div>
              <div className="text-center">No.</div>
              <div className="text-center">Bet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Jodi */}
      <button
        onClick={handleCopyJodi}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Copy Jodi
      </button>

      {/* Jodi Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Game</div>
              <div className="text-center">Type</div>
              <div className="text-center">Open Close</div>
              <div className="text-center">No.</div>
              <div className="text-center">Bet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Single Pana */}
      <button
        onClick={handleCopySinglePana}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Copy Single Pana
      </button>

      {/* Single Pana Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Game</div>
              <div className="text-center">Type</div>
              <div className="text-center">Open Close</div>
              <div className="text-center">No.</div>
              <div className="text-center">Bet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Double Pana */}
      <button
        onClick={handleCopyDoublePana}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Copy Double Pana
      </button>

      {/* Double Pana Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Game</div>
              <div className="text-center">Type</div>
              <div className="text-center">Open Close</div>
              <div className="text-center">No.</div>
              <div className="text-center">Bet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Triple Pana */}
      <button
        onClick={handleCopyTriplePana}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Copy Triple Pana
      </button>

      {/* Triple Pana Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Game</div>
              <div className="text-center">Type</div>
              <div className="text-center">Open Close</div>
              <div className="text-center">No.</div>
              <div className="text-center">Bet</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

ReportGeneration.displayName = "ReportGeneration";
