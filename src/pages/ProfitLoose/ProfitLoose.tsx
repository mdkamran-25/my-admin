// Profit Loose Page - displays game-wise profit and loss data

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface GameData {
  id: string;
  name: string;
  bids: number;
  win: number;
  profitLoss: number;
  isProfit: boolean;
}

export const ProfitLoose = memo(() => {
  const [selectedGame, setSelectedGame] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [selectedStatus, setSelectedStatus] = useState("Open-close");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with API call
  const games: GameData[] = [
    {
      id: "1",
      name: "SRIDEVI",
      bids: 215317,
      win: 183018,
      profitLoss: 32299,
      isProfit: true,
    },
    {
      id: "2",
      name: "TIME BAZAR",
      bids: 159495,
      win: 180591,
      profitLoss: -21096,
      isProfit: false,
    },
    {
      id: "3",
      name: "MADHUR DAY",
      bids: 96692,
      win: 109756,
      profitLoss: -13064,
      isProfit: false,
    },
    {
      id: "4",
      name: "MILAN DAY",
      bids: 167093,
      win: 139008,
      profitLoss: 28085,
      isProfit: true,
    },
    {
      id: "5",
      name: "RAJDHANI DAY",
      bids: 82766,
      win: 77953.5,
      profitLoss: 4813,
      isProfit: true,
    },
    {
      id: "6",
      name: "SUPREME DAY",
      bids: 49741,
      win: 59744,
      profitLoss: -10003,
      isProfit: false,
    },
    {
      id: "7",
      name: "KALYAN",
      bids: 406547,
      win: 286013,
      profitLoss: 120534,
      isProfit: true,
    },
    {
      id: "8",
      name: "GOLDEN DAY",
      bids: 21618,
      win: 15398.5,
      profitLoss: 6220,
      isProfit: true,
    },
    {
      id: "9",
      name: "SRIDEVI NIGHT",
      bids: 171440,
      win: 107725.5,
      profitLoss: 63715,
      isProfit: true,
    },
    {
      id: "10",
      name: "MADHUR NIGHT",
      bids: 82957,
      win: 82070.5,
      profitLoss: 887,
      isProfit: true,
    },
  ];

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      game: selectedGame,
      date: selectedDate,
      status: selectedStatus,
      search: searchQuery,
    });
  }, [selectedGame, selectedDate, selectedStatus, searchQuery]);

  return (
    <Layout>
      <BackButton />

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Game List */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Game List
            </label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              <option value="SRIDEVI">SRIDEVI</option>
              <option value="TIME BAZAR">TIME BAZAR</option>
              <option value="MADHUR DAY">MADHUR DAY</option>
              <option value="MILAN DAY">MILAN DAY</option>
              <option value="RAJDHANI DAY">RAJDHANI DAY</option>
              <option value="SUPREME DAY">SUPREME DAY</option>
              <option value="KALYAN">KALYAN</option>
              <option value="GOLDEN DAY">GOLDEN DAY</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Open-Close */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Open-close">Open-close</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a u..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Game List Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="bg-yellow-500 text-white grid grid-cols-4 gap-2 p-3 text-sm font-bold">
              <div className="text-left pl-3">Game</div>
              <div className="text-center">Bids</div>
              <div className="text-center">Win</div>
              <div className="text-center">PL</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {games.map((game) => (
                <div
                  key={game.id}
                  className={`grid grid-cols-4 gap-2 p-3 items-center text-sm font-semibold ${
                    game.isProfit
                      ? "bg-green-500 text-white"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {/* Game Name */}
                  <div className="text-left pl-3">{game.name}</div>

                  {/* Bids */}
                  <div className="text-center">
                    {game.bids.toLocaleString()}
                  </div>

                  {/* Win */}
                  <div className="text-center">{game.win.toLocaleString()}</div>

                  {/* Profit/Loss */}
                  <div className="text-center">
                    {game.profitLoss.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

ProfitLoose.displayName = "ProfitLoose";
