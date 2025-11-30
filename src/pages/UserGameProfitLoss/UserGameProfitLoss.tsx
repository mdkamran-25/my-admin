// User Game Profit Loss Page - displays user-specific game-wise profit and loss data

import { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface GameProfitLoss {
  id: string;
  name: string;
  bids: number | null;
  win: number | null;
  profitLoss: number | string;
}

// Mock data generator for user-specific game profit/loss
const generateMockGameData = (): GameProfitLoss[] => {
  return [
    { id: "1", name: "SRIDEVI", bids: null, win: null, profitLoss: "NaN" },
    { id: "2", name: "TIME BAZAR", bids: null, win: null, profitLoss: "NaN" },
    { id: "3", name: "MADHUR DAY", bids: null, win: null, profitLoss: "NaN" },
    { id: "4", name: "MILAN DAY", bids: null, win: null, profitLoss: "NaN" },
    { id: "5", name: "RAJDHANI DAY", bids: null, win: null, profitLoss: "NaN" },
    { id: "6", name: "SUPREME DAY", bids: null, win: null, profitLoss: "NaN" },
    { id: "7", name: "KALYAN", bids: null, win: null, profitLoss: "NaN" },
    { id: "8", name: "GOLDEN DAY", bids: null, win: null, profitLoss: "NaN" },
    {
      id: "9",
      name: "SRIDEVI NIGHT",
      bids: null,
      win: null,
      profitLoss: "NaN",
    },
    {
      id: "10",
      name: "MADHUR NIGHT",
      bids: null,
      win: null,
      profitLoss: "NaN",
    },
  ];
};

export const UserGameProfitLoss = memo(() => {
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const usernameParam = searchParams.get("username");

  const [selectedGameList, setSelectedGameList] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("25/11/2025");
  const [selectedOpenClose, setSelectedOpenClose] = useState("Open-close");
  const [searchUser, setSearchUser] = useState(usernameParam || "");
  const [gameData, setGameData] = useState<GameProfitLoss[]>([]);

  useEffect(() => {
    // Load game data
    const data = generateMockGameData();
    setGameData(data);
  }, []);

  useEffect(() => {
    // Pre-populate search field if username is in URL
    if (usernameParam) {
      setSearchUser(usernameParam);
    }
  }, [usernameParam]);

  const handleFilter = () => {
    console.log("Applying filter...", {
      gameList: selectedGameList,
      date: selectedDate,
      openClose: selectedOpenClose,
      user: searchUser,
    });
    // In production, fetch filtered data from API
  };

  const gameList = [
    "All Game",
    "SRIDEVI",
    "TIME BAZAR",
    "MADHUR DAY",
    "MILAN DAY",
    "RAJDHANI DAY",
    "SUPREME DAY",
    "KALYAN",
    "GOLDEN DAY",
    "SRIDEVI NIGHT",
    "MADHUR NIGHT",
  ];

  const openCloseOptions = ["Open-close", "Open", "Close", "Both"];

  return (
    <Layout>
      <BackButton />

      {/* Filtered User Banner */}
      {usernameParam && (
        <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3 mb-4 rounded">
          <p className="text-blue-800 font-medium">
            Showing profit/loss for:{" "}
            <span className="font-bold">{usernameParam}</span>
          </p>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-gray-100 rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
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
              {gameList.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25/11/2025"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Open/Close */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Open-close
            </label>
            <select
              value={selectedOpenClose}
              onChange={(e) => setSelectedOpenClose(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {openCloseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* User Search */}
          <div>
            <div className="relative">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="satya"
                className="w-full px-4 py-2.5 mt-7 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchUser && (
                <button
                  onClick={() => !userIdParam && setSearchUser("")}
                  className="absolute right-3 top-1/2 translate-y-1 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold text-lg transition-colors shadow-md"
        >
          Filter
        </button>
      </div>

      {/* Game Data Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-yellow-500">
                <th className="px-4 py-3 text-left text-black font-bold text-sm">
                  Game
                </th>
                <th className="px-4 py-3 text-center text-black font-bold text-sm">
                  Bids
                </th>
                <th className="px-4 py-3 text-center text-black font-bold text-sm">
                  Win
                </th>
                <th className="px-4 py-3 text-center text-black font-bold text-sm">
                  PL
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {gameData.map((game) => (
                <tr
                  key={game.id}
                  className="bg-red-400 border-b-2 border-white hover:bg-red-500 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-bold text-sm">
                    {game.name}
                  </td>
                  <td className="px-4 py-3 text-center text-white font-semibold text-sm">
                    {game.bids ?? "null"}
                  </td>
                  <td className="px-4 py-3 text-center text-white font-semibold text-sm">
                    {game.win ?? "null"}
                  </td>
                  <td className="px-4 py-3 text-center text-white font-bold text-sm">
                    {game.profitLoss}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
});

UserGameProfitLoss.displayName = "UserGameProfitLoss";
