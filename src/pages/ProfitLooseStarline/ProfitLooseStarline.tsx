// Profit Loose Starline Page - displays starline game profit and loss data

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";

interface StarlineGame {
  id: string;
  time: string;
  result: string;
  bids: number;
  win: number;
  profitLoss: number;
  isProfit: boolean;
}

export const ProfitLooseStarline = memo(() => {
  const [selectedGame, setSelectedGame] = useState("starline");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with API call
  const games: StarlineGame[] = [
    {
      id: "1",
      time: "10:00 AM (133-7)",
      bids: 2369,
      win: 1770,
      profitLoss: 599,
      isProfit: true,
      result: "133-7",
    },
    {
      id: "2",
      time: "11:00 AM (358-6)",
      bids: 4006,
      win: 2990,
      profitLoss: 1016,
      isProfit: true,
      result: "358-6",
    },
    {
      id: "3",
      time: "12:00 PM (300-3)",
      bids: 3022,
      win: 2640,
      profitLoss: 382,
      isProfit: true,
      result: "300-3",
    },
    {
      id: "4",
      time: "01:00 PM (280-0)",
      bids: 2531,
      win: 1950,
      profitLoss: 581,
      isProfit: true,
      result: "280-0",
    },
    {
      id: "5",
      time: "02:00 PM (239-4)",
      bids: 2690,
      win: 2150,
      profitLoss: 540,
      isProfit: true,
      result: "239-4",
    },
    {
      id: "6",
      time: "03:00 PM (880-6)",
      bids: 2359,
      win: 1840,
      profitLoss: 519,
      isProfit: true,
      result: "880-6",
    },
    {
      id: "7",
      time: "04:00 PM (447-5)",
      bids: 1100,
      win: 810,
      profitLoss: 290,
      isProfit: true,
      result: "447-5",
    },
    {
      id: "8",
      time: "05:00 PM (469-9)",
      bids: 1213,
      win: 860,
      profitLoss: 353,
      isProfit: true,
      result: "469-9",
    },
    {
      id: "9",
      time: "06:00 PM (237-2)",
      bids: 2417,
      win: 1840,
      profitLoss: 577,
      isProfit: true,
      result: "237-2",
    },
    {
      id: "10",
      time: "07:00 PM (159-5)",
      bids: 3118,
      win: 2450,
      profitLoss: 668,
      isProfit: true,
      result: "159-5",
    },
    {
      id: "11",
      time: "08:00 PM (190-0)",
      bids: 2409,
      win: 1750,
      profitLoss: 659,
      isProfit: true,
      result: "190-0",
    },
  ];

  const totalBids = games.reduce((sum, game) => sum + game.bids, 0);
  const totalWin = games.reduce((sum, game) => sum + game.win, 0);
  const totalProfitLoss = totalBids - totalWin;

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      game: selectedGame,
      date: selectedDate,
      search: searchQuery,
    });
  }, [selectedGame, selectedDate, searchQuery]);

  return (
    <Layout>
      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Game List */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game List
            </label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="starline">starline</option>
            </select>
          </div>

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
        </div>

        <div className="mb-3">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a u..."
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

      {/* Game List Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="bg-yellow-500 grid grid-cols-4 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Market</div>
              <div className="text-center">Bids</div>
              <div className="text-center">Win</div>
              <div className="text-center">PL</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="grid grid-cols-4 gap-2 p-3 items-center text-sm font-semibold bg-green-500 text-white"
                >
                  {/* Time/Result */}
                  <div className="text-left pl-3">{game.time}</div>

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

              {/* Total Row */}
              <div className="grid grid-cols-4 gap-2 p-3 items-center text-sm font-bold bg-green-600 text-white">
                <div className="text-left pl-3">Total</div>
                <div className="text-center">{totalBids.toLocaleString()}</div>
                <div className="text-center">{totalWin.toLocaleString()}</div>
                <div className="text-center">
                  {totalProfitLoss.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

ProfitLooseStarline.displayName = "ProfitLooseStarline";
