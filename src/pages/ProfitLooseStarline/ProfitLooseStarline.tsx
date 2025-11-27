// Profit Loose Starline Page - displays starline game profit and loss data

import { memo, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";

interface StarlineGame {
  id: string;
  time: string;
  result: string;
  bids: number;
  win: number;
  profitLoss: number;
  isProfit: boolean;
}

// Mock data - in production this would be computed from starline game plays API
const mockGames: StarlineGame[] = [
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

export const ProfitLooseStarline = memo(() => {
  const [selectedGame, setSelectedGame] = useState("starline");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter games
  const filteredGames = mockGames.filter((game) => {
    if (
      searchQuery &&
      !game.time.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Calculate totals
  const totalBids = filteredGames.reduce((sum, game) => sum + game.bids, 0);
  const totalWin = filteredGames.reduce((sum, game) => sum + game.win, 0);
  const totalProfitLoss = totalBids - totalWin;

  // Export handlers
  const handleExportCSV = () => {
    const csvData = filteredGames.map((game) => ({
      Time: game.time,
      Bids: game.bids,
      Win: game.win,
      "Profit/Loss": game.profitLoss,
    }));
    exportToCSV(csvData, "profit_loss_starline_report");
  };

  const handleExportPDF = () => {
    const columns = [
      { header: "Time", dataKey: "time" },
      { header: "Bids", dataKey: "bids" },
      { header: "Win", dataKey: "win" },
      { header: "Profit/Loss", dataKey: "profitLoss" },
    ];
    const data = filteredGames.map((game) => ({
      time: game.time,
      bids: game.bids.toString(),
      win: game.win.toString(),
      profitLoss: game.profitLoss.toString(),
    }));
    exportToPDF({
      title: "Starline Profit/Loss Report",
      filename: "profit_loss_starline_report",
      columns,
      data,
    });
  };

  return (
    <Layout>
      <BackButton />

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
            placeholder="Search time..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-500 text-white rounded-xl p-4 text-center">
          <p className="text-sm opacity-90 mb-1">Total Bids</p>
          <p className="text-2xl font-bold">{totalBids.toLocaleString()}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-4 text-center">
          <p className="text-sm opacity-90 mb-1">Total Win</p>
          <p className="text-2xl font-bold">{totalWin.toLocaleString()}</p>
        </div>
        <div
          className={`${
            totalProfitLoss >= 0 ? "bg-emerald-600" : "bg-red-600"
          } text-white rounded-xl p-4 text-center`}
        >
          <p className="text-sm opacity-90 mb-1">Profit/Loss</p>
          <p className="text-2xl font-bold">
            {totalProfitLoss.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Bids
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Win
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Profit/Loss
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGames.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {game.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    {game.bids.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    {game.win.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm text-right font-semibold ${
                      game.isProfit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {game.profitLoss >= 0 ? "+" : ""}
                    {game.profitLoss.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  TOTAL
                </td>
                <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                  {totalBids.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                  {totalWin.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-3 text-sm text-right font-bold ${
                    totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totalProfitLoss >= 0 ? "+" : ""}
                  {totalProfitLoss.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mt-4">
        <ExportButtons
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          disabled={filteredGames.length === 0}
        />
      </div>
    </Layout>
  );
});

ProfitLooseStarline.displayName = "ProfitLooseStarline";
