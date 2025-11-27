// Game Cancel History Page - allows admin to view and cancel game bids

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

export const GameCancel = memo(() => {
  const [selectedGameList, setSelectedGameList] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [selectedOpenClose, setSelectedOpenClose] = useState("Both");
  const [searchUser, setSearchUser] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameList: selectedGameList,
      date: selectedDate,
      openClose: selectedOpenClose,
      user: searchUser,
    });
  }, [selectedGameList, selectedDate, selectedOpenClose, searchUser]);

  const handleSelectAll = useCallback(() => {
    setSelectAll(!selectAll);
    console.log("Select all toggled:", !selectAll);
  }, [selectAll]);

  const handleSelectCancel = useCallback(() => {
    console.log("Canceling selected bids");
    // API call to cancel selected bids
  }, []);

  return (
    <Layout>
      <BackButton />
      
      {/* Title Button */}
      <button className="w-full py-4 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-700 transition-colors shadow-md mb-4">
        Game Cancel History
      </button>

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
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

          {/* Game List */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game List
            </label>
            <select
              value={selectedGameList}
              onChange={(e) => setSelectedGameList(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              <option value="SRIDEVI">SRIDEVI</option>
              <option value="TIME BAZAR">TIME BAZAR</option>
              <option value="MADHUR DAY">MADHUR DAY</option>
              <option value="MILAN DAY">MILAN DAY</option>
              <option value="RAJDHANI DAY">RAJDHANI DAY</option>
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
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Search for a ..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Open/Close */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Open / Close
            </label>
            <select
              value={selectedOpenClose}
              onChange={(e) => setSelectedOpenClose(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Both">Both</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
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

      {/* Select All and Cancel Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        {/* Select All Checkbox */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <span className="text-gray-800 text-lg font-semibold">
            Select All
          </span>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Select Cancel Button */}
        <button
          onClick={handleSelectCancel}
          className="py-2.5 px-8 bg-red-500 text-white rounded-full text-base font-semibold hover:bg-red-600 transition-colors shadow-md"
        >
          Select Cancel
        </button>
      </div>
    </Layout>
  );
});

GameCancel.displayName = "GameCancel";
