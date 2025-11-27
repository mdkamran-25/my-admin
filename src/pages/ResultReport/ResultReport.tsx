// Result & Report Page - displays game results

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface GameResult {
  id: string;
  name: string;
  date: string;
  openTime: string;
  closeTime: string;
  openResult: string;
  closeResult?: string;
}

export const ResultReport = memo(() => {
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  // Mock data - replace with API call
  const games: GameResult[] = [
    {
      id: "1",
      name: "SRIDEVI",
      date: "25/11/2025",
      openTime: "09:15 PM",
      closeTime: "11:15 PM",
      openResult: "578-1",
      closeResult: "",
    },
    {
      id: "2",
      name: "TIME BAZAR",
      date: "25/11/2025",
      openTime: "09:25 PM",
      closeTime: "11:25 PM",
      openResult: "689-3",
      closeResult: "",
    },
    {
      id: "3",
      name: "MADHUR DAY",
      date: "25/11/2025",
      openTime: "09:10 PM",
      closeTime: "11:10 PM",
      openResult: "456-5",
      closeResult: "",
    },
    {
      id: "4",
      name: "MILAN DAY",
      date: "25/11/2025",
      openTime: "09:00 PM",
      closeTime: "11:00 PM",
      openResult: "234-9",
      closeResult: "",
    },
    {
      id: "5",
      name: "MILAN NIGHT",
      date: "25/11/2025",
      openTime: "09:20 PM",
      closeTime: "11:20 PM",
      openResult: "579-1",
      closeResult: "",
    },
    {
      id: "6",
      name: "KALYAN NIGHT",
      date: "25/11/2025",
      openTime: "09:20 PM",
      closeTime: "11:20 PM",
      openResult: "579-1",
      closeResult: "",
    },
    {
      id: "7",
      name: "RAJDHANI NIGHT",
      date: "25/11/2025",
      openTime: "09:30 PM",
      closeTime: "11:45 PM",
      openResult: "689-3",
      closeResult: "",
    },
    {
      id: "8",
      name: "MAIN BAZAR",
      date: "25/11/2025",
      openTime: "09:50 PM",
      closeTime: "11:59 PM",
      openResult: "468-8",
      closeResult: "",
    },
  ];

  const handleGameClick = useCallback((gameId: string) => {
    setExpandedGameId((prev) => (prev === gameId ? null : gameId));
  }, []);

  const handleBidReverse = useCallback((gameName: string) => {
    console.log(`Bid Reverse for ${gameName}`);
  }, []);

  const handleAddCloseResult = useCallback((gameName: string) => {
    console.log(`Add Close Result for ${gameName}`);
  }, []);

  const handleCloseReport = useCallback((gameName: string) => {
    console.log(`Close Report for ${gameName}`);
  }, []);

  return (
    <Layout>
      <BackButton />
      
      {/* Date Filter */}
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Games List */}
      <div className="space-y-3">
        {games.map((game) => {
          const isExpanded = expandedGameId === game.id;
          return (
            <div
              key={game.id}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              {/* Game Header - Clickable */}
              <button
                onClick={() => handleGameClick(game.id)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 rounded-t-2xl p-5 transition-all active:scale-98"
              >
                <h3 className="text-gray-800 text-xl font-bold mb-1">
                  {game.name}
                </h3>
                <p className="text-gray-700 text-base font-semibold">
                  {game.date}
                </p>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="bg-white">
                  {/* Open/Close Header */}
                  <div className="grid grid-cols-2 bg-gray-700 text-white text-center font-semibold py-2">
                    <div>Open</div>
                    <div>Close</div>
                  </div>

                  {/* Times and Results */}
                  <div className="grid grid-cols-2 divide-x divide-gray-200">
                    {/* Open Section */}
                    <div className="p-4 text-center">
                      <p className="text-gray-800 text-lg font-semibold mb-3">
                        {game.openTime}
                      </p>
                      <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-base font-semibold mb-3">
                        {game.openResult}
                      </button>
                      <button
                        onClick={() => handleBidReverse(game.name)}
                        className="w-full px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-semibold hover:bg-pink-600"
                      >
                        Bid Reverse
                      </button>
                    </div>

                    {/* Close Section */}
                    <div className="p-4 text-center">
                      <p className="text-gray-800 text-lg font-semibold mb-3">
                        {game.closeTime}
                      </p>
                      {game.closeResult ? (
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-base font-semibold mb-3">
                          {game.closeResult}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddCloseResult(game.name)}
                          className="w-full px-4 py-2 bg-cyan-500 text-white rounded-full text-sm font-semibold mb-3 hover:bg-cyan-600"
                        >
                          Add Close Result
                        </button>
                      )}
                      <button
                        onClick={() => handleCloseReport(game.name)}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600"
                      >
                        Close Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
});

ResultReport.displayName = "ResultReport";
