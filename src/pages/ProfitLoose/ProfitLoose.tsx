// Profit Loose Page - displays game-wise profit and loss data

import { memo, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";

interface GameData {
  id: string;
  name: string;
  bids: number;
  win: number;
  profitLoss: number;
  isProfit: boolean;
}

// Mock data - in production this would be computed from game plays API
const mockGames: GameData[] = [
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

export const ProfitLoose = memo(() => {
  const [selectedGame, setSelectedGame] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [selectedStatus, setSelectedStatus] = useState("Open-close");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter games
  const filteredGames = mockGames.filter((game) => {
    if (selectedGame !== "All Game" && game.name !== selectedGame) return false;
    if (
      searchQuery &&
      !game.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      Game: game.name,
      Bids: game.bids,
      Win: game.win,
      "Profit/Loss": game.profitLoss,
    }));
    exportToCSV(csvData, "profit_loss_report");
  };

  const handleExportPDF = () => {
    const columns = [
      { header: "Game", dataKey: "game" },
      { header: "Bids", dataKey: "bids" },
      { header: "Win", dataKey: "win" },
      { header: "Profit/Loss", dataKey: "profitLoss" },
    ];
    const data = filteredGames.map((game) => ({
      game: game.name,
      bids: game.bids.toString(),
      win: game.win.toString(),
      profitLoss: game.profitLoss.toString(),
    }));
    exportToPDF({
      title: "Profit/Loss Report",
      filename: "profit_loss_report",
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
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Game List
            </label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              {mockGames.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
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

        <div className="grid grid-cols-2 gap-3">
          {/* Status */}
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
              placeholder="Search game..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-500 text-white rounded-xl p-4 text-center">
          <p className="text-sm opacity-90 mb-1">Total Bids</p>
          <p className="text-2xl font-bold">{totalBids.toFixed(1)}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-4 text-center">
          <p className="text-sm opacity-90 mb-1">Total Win</p>
          <p className="text-2xl font-bold">{totalWin.toFixed(1)}</p>
        </div>
        <div
          className={`${
            totalProfitLoss >= 0 ? "bg-emerald-600" : "bg-red-600"
          } text-white rounded-xl p-4 text-center`}
        >
          <p className="text-sm opacity-90 mb-1">Profit/Loss</p>
          <p className="text-2xl font-bold">{totalProfitLoss.toFixed(1)}</p>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Game
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
                    {game.name}
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

ProfitLoose.displayName = "ProfitLoose";
