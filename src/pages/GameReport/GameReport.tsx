// Game Report Page - Shows bids and wins by game type

import { memo, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";
import { useGlobalStore } from "../../store/useGlobalStore";

interface GameTypeData {
  gameType: string;
  bids: number;
  win: number;
}

// Mock data generator
const generateMockGameData = (): GameTypeData[] => {
  return [
    { gameType: "Single Ank", bids: 0, win: 0 },
    { gameType: "Jodi", bids: 0, win: 0 },
    { gameType: "Single Pana", bids: 0, win: 0 },
    { gameType: "Double Pana", bids: 0, win: 0 },
    { gameType: "Triple Pana", bids: 0, win: 0 },
    { gameType: "Half Sangam", bids: 0, win: 0 },
    { gameType: "Full Sangam", bids: 0, win: 0 },
  ];
};

export const GameReport = memo(() => {
  const addToast = useGlobalStore((state) => state.addToast);
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date") || "";

  const [gameData] = useState<GameTypeData[]>(generateMockGameData());
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    gameType: "all",
    gameName: "all",
    marketType: "both",
    date: dateParam,
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, []);

  const handleSubmit = () => {
    addToast({ message: "Filters applied", type: "success" });
  };

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast({ message: "Data refreshed", type: "success" });
    }, 500);
  }, [addToast]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "24/11/2025";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const displayDate = filters.date ? formatDate(filters.date) : "24/11/2025";

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Game Type */}
          <select
            value={filters.gameType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, gameType: e.target.value }))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="all">Game Type</option>
            <option value="matka">Matka</option>
            <option value="starline">Starline</option>
          </select>

          {/* Game Name */}
          <select
            value={filters.gameName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, gameName: e.target.value }))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="all">All Game</option>
            <option value="kalyan">Kalyan</option>
            <option value="milan">Milan</option>
            <option value="rajdhani">Rajdhani</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Market Type */}
          <select
            value={filters.marketType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, marketType: e.target.value }))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="both">Both</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>

          {/* Date */}
          <div className="relative">
            {!filters.date && (
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">
                dd/mm/yyyy
              </span>
            )}
            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, date: e.target.value }))
              }
              className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                !filters.date ? "text-transparent" : "text-gray-600"
              }`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>

      {/* Summary Banner */}
      <div className="bg-yellow-400 text-black p-3 rounded-lg mb-4 font-semibold text-center">
        Game: {filters.gameName},Market:{filters.marketType} Date :{" "}
        {displayDate.replace(/\//g, "/")}
      </div>

      {/* Loading State */}
      {loading && <TableRowSkeleton count={5} />}

      {/* Empty State */}
      {!loading && gameData.length === 0 && (
        <EmptyState message="No data found" />
      )}

      {/* Game Data Table */}
      {!loading && gameData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Game Type
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Bids
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Win
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {gameData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Game Type */}
                    <td className="px-4 py-4 text-gray-900 font-medium text-center">
                      {item.gameType}
                    </td>

                    {/* Bids */}
                    <td className="px-4 py-4 text-center text-gray-900 font-semibold">
                      {item.bids}
                    </td>

                    {/* Win */}
                    <td className="px-4 py-4 text-center text-gray-900 font-semibold">
                      {item.win}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
});

GameReport.displayName = "GameReport";
