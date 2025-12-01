// Game On Off Starline Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface StarlineGame {
  id: string;
  name: string;
  isOn: boolean;
}

// Mock starline game data based on screenshot
const initialGames: StarlineGame[] = [
  {
    id: "1",
    name: "A23 Starline",
    isOn: true,
  },
  {
    id: "2",
    name: "A23 JackPot",
    isOn: true,
  },
];

export const GameOnOffStarline = memo(() => {
  const [games, setGames] = useState<StarlineGame[]>(initialGames);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleToggle = useCallback(
    (gameId: string) => {
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === gameId ? { ...game, isOn: !game.isOn } : game
        )
      );
      const game = games.find((g) => g.id === gameId);
      if (game) {
        showToast(`${game.name} turned ${game.isOn ? "OFF" : "ON"}`);
      }
    },
    [games]
  );

  const handleRefresh = useCallback(() => {
    console.log("Refreshing starline games...");
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
      <div className="bg-orange-400 rounded-t-xl p-4 text-center">
        <h1 className="text-xl font-medium text-gray-800">
          Game Starline STATUS
        </h1>
      </div>

      {/* Table Header */}
      <div className="bg-orange-300 p-3 grid grid-cols-[0.5fr_2fr_0.5fr] gap-2 text-gray-800 font-bold text-sm">
        <div className="text-left pl-2">S.no.</div>
        <div className="text-center">Game Name</div>
        <div className="text-center">All</div>
      </div>

      {/* Game List */}
      <div className="bg-white rounded-b-xl shadow-sm">
        {games.map((game, index) => (
          <div
            key={game.id}
            className="p-4 grid grid-cols-[0.5fr_2fr_0.5fr] gap-2 items-center border-b border-gray-100 last:border-b-0"
          >
            {/* S.no */}
            <div className="text-left pl-2 font-bold text-gray-800">
              {index + 1}
            </div>

            {/* Game Name */}
            <div className="text-center text-gray-800 font-medium">
              {game.name}
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center">
              <button
                onClick={() => handleToggle(game.id)}
                className={`px-5 py-1.5 rounded-full font-bold text-white text-sm transition-colors ${
                  game.isOn
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {game.isOn ? "On" : "Off"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
});

GameOnOffStarline.displayName = "GameOnOffStarline";
