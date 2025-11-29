// Win Report Page - Shows wins by game type

import { memo, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";

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

export const WinReport = memo(() => {
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
    // Apply filters
  };

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
            <option value="sridevi">SRIDEVI</option>
            <option value="time-bazar">TIME BAZAR</option>
            <option value="madhur-day">MADHUR DAY</option>
            <option value="milan-day">MILAN DAY</option>
            <option value="rajdhani-day">RAJDHANI DAY</option>
            <option value="supreme-day">SUPREME DAY</option>
            <option value="kalyan">KALYAN</option>
            <option value="golden-day">GOLDEN DAY</option>
            <option value="sridevi-night">SRIDEVI NIGHT</option>
            <option value="madhur-night">MADHUR NIGHT</option>
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

      {/* Data Table */}
      {!loading && gameData.length > 0 && (
        <div className="space-y-3">
          {gameData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-black text-white grid grid-cols-3 p-3 text-sm font-semibold">
                <div className="text-left">Game Type</div>
                <div className="text-center">Bids</div>
                <div className="text-center">Win</div>
              </div>
              <div className="grid grid-cols-3 p-3 items-center text-sm">
                <div className="text-left font-medium">{item.gameType}</div>
                <div className="text-center font-semibold">{item.bids}</div>
                <div className="text-center font-semibold">{item.win}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
});

WinReport.displayName = "WinReport";
