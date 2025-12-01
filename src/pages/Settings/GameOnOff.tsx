// Game On Off Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface Game {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  isOn: boolean;
}

// Mock game data based on screenshot
const initialGames: Game[] = [
  {
    id: "1",
    name: "SRIDEVI",
    openTime: "11:30 AM",
    closeTime: "12:30 PM",
    isOn: true,
  },
  {
    id: "2",
    name: "TIME BAZAR",
    openTime: "12:55 PM",
    closeTime: "01:55 PM",
    isOn: true,
  },
  {
    id: "3",
    name: "MADHUR DAY",
    openTime: "01:25 PM",
    closeTime: "02:25 PM",
    isOn: true,
  },
  {
    id: "4",
    name: "MILAN DAY",
    openTime: "02:50 PM",
    closeTime: "04:55 PM",
    isOn: true,
  },
  {
    id: "5",
    name: "RAJDHANI DAY",
    openTime: "03:05 PM",
    closeTime: "05:05 PM",
    isOn: true,
  },
  {
    id: "6",
    name: "SUPREME DAY",
    openTime: "03:25 PM",
    closeTime: "05:25 PM",
    isOn: true,
  },
  {
    id: "7",
    name: "KALYAN",
    openTime: "03:45 PM",
    closeTime: "05:45 PM",
    isOn: true,
  },
  {
    id: "8",
    name: "GOLDEN DAY",
    openTime: "04:25 PM",
    closeTime: "06:25 PM",
    isOn: true,
  },
  {
    id: "9",
    name: "SRIDEVI NIGHT",
    openTime: "07:05 PM",
    closeTime: "08:05 PM",
    isOn: true,
  },
  {
    id: "10",
    name: "TIME BAZAR NIGHT",
    openTime: "08:30 PM",
    closeTime: "09:30 PM",
    isOn: true,
  },
  {
    id: "11",
    name: "MADHUR NIGHT",
    openTime: "08:55 PM",
    closeTime: "10:55 PM",
    isOn: true,
  },
  {
    id: "12",
    name: "MILAN NIGHT",
    openTime: "09:10 PM",
    closeTime: "11:10 PM",
    isOn: true,
  },
  {
    id: "13",
    name: "KALYAN NIGHT",
    openTime: "09:30 PM",
    closeTime: "11:30 PM",
    isOn: true,
  },
  {
    id: "14",
    name: "RAJDHANI NIGHT",
    openTime: "09:45 PM",
    closeTime: "11:45 PM",
    isOn: true,
  },
  {
    id: "15",
    name: "MAIN BAZAR",
    openTime: "09:50 PM",
    closeTime: "12:05 AM",
    isOn: true,
  },
];

export const GameOnOff = memo(() => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleToggle = useCallback((gameId: string) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === gameId ? { ...game, isOn: !game.isOn } : game
      )
    );
    const game = games.find((g) => g.id === gameId);
    if (game) {
      showToast(`${game.name} turned ${game.isOn ? "OFF" : "ON"}`);
    }
  }, [games]);

  const handleRefresh = useCallback(() => {
    console.log("Refreshing games...");
  }, []);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">GAME TIME TABLE</h1>
      </div>

      {/* Table Header */}
      <div className="bg-orange-400 rounded-lg p-3 mb-2 grid grid-cols-[0.5fr_1.5fr_1.5fr_0.5fr] gap-2 text-gray-800 font-bold text-sm">
        <div className="text-center">S.no.</div>
        <div className="text-center">Game Name</div>
        <div className="text-center">Time</div>
        <div className="text-center">All</div>
      </div>

      {/* Game List */}
      <div className="space-y-2">
        {games.map((game, index) => (
          <div
            key={game.id}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{game.name}</h3>
              <div className="flex gap-4 text-sm text-gray-600 mt-1">
                <span>Open Time : {game.openTime}</span>
                <span>Close time : {game.closeTime}</span>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => handleToggle(game.id)}
              className={`px-6 py-2 rounded-full font-bold text-white text-sm transition-colors ${
                game.isOn
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {game.isOn ? "On" : "Off"}
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
});

GameOnOff.displayName = "GameOnOff";
