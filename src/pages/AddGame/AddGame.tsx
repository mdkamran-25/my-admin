// Add Game Page - allows admin to add new games to the system

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { FaEdit } from "react-icons/fa";

interface Game {
  id: string;
  name: string;
  open: string;
  close: string;
  play: string;
  playDays: string;
}

export const AddGame = memo(() => {
  const [gameName, setGameName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [gamePlay, setGamePlay] = useState("Game Play On");
  const [selectedDays, setSelectedDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  // Mock data - replace with API call
  const games: Game[] = [
    {
      id: "1",
      name: "SRIDEVI",
      open: "11:30 AM",
      close: "12:30 PM",
      play: "yes",
      playDays: "1-2-3-4-5-6-0-",
    },
    {
      id: "2",
      name: "TIME BAZAR",
      open: "12:55 PM",
      close: "01:55 PM",
      play: "yes",
      playDays: "1-2-3-4-5-6-",
    },
    {
      id: "3",
      name: "MADHUR DAY",
      open: "01:25 PM",
      close: "02:25 PM",
      play: "yes",
      playDays: "1-2-3-4-5-6-0-",
    },
    {
      id: "4",
      name: "MILAN DAY",
      open: "02:50 PM",
      close: "04:55 PM",
      play: "yes",
      playDays: "1-2-3-4-5-6-",
    },
    {
      id: "5",
      name: "RAJDHANI DAY",
      open: "03:05 PM",
      close: "05:05 PM",
      play: "yes",
      playDays: "1-2-3-4-5-6-0-",
    },
  ];

  const handleAddGame = useCallback(() => {
    if (gameName.trim()) {
      console.log("Adding new game:", {
        name: gameName,
        openTime,
        closeTime,
        gamePlay,
        selectedDays,
      });
      // API call to add game
      setGameName("");
      setOpenTime("");
      setCloseTime("");
      setGamePlay("Game Play On");
      setSelectedDays({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      });
    }
  }, [gameName, openTime, closeTime, gamePlay, selectedDays]);

  const handleDayToggle = useCallback((day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  }, []);

  const handleEditGame = useCallback((gameId: string) => {
    console.log("Edit game:", gameId);
    // Navigate to edit page or open modal
  }, []);

  return (
    <Layout>
      <BackButton />

      {/* Add New Game Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add new Game
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-3">
            Game Name
          </label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Time night"
            className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-3">
            Open Time
          </label>
          <input
            type="time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-3">
            Close Time
          </label>
          <input
            type="time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-3">
            Game Play
          </label>
          <select
            value={gamePlay}
            onChange={(e) => setGamePlay(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Game Play On">Game Play On</option>
            <option value="Game Play Off">Game Play Off</option>
          </select>
        </div>

        {/* Days Selection */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-3 mb-3">
            {/* Monday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.mon}
                onChange={() => handleDayToggle("mon")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Mon</span>
            </label>
            {/* Tuesday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.tue}
                onChange={() => handleDayToggle("tue")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Tue</span>
            </label>
            {/* Wednesday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.wed}
                onChange={() => handleDayToggle("wed")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Wed</span>
            </label>
            {/* Thursday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.thu}
                onChange={() => handleDayToggle("thu")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Thu</span>
            </label>
            {/* Friday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.fri}
                onChange={() => handleDayToggle("fri")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Fri</span>
            </label>
            {/* Saturday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.sat}
                onChange={() => handleDayToggle("sat")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Sat</span>
            </label>
            {/* Sunday */}
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.sun}
                onChange={() => handleDayToggle("sun")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-xs font-medium">Sun</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleAddGame}
          className="py-3 px-8 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Add Game
        </button>
      </div>

      {/* Games List Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Table Header */}
            <div className="bg-yellow-500 grid grid-cols-6 gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">Game Name</div>
              <div className="text-center">Open</div>
              <div className="text-center">Close</div>
              <div className="text-center">Play</div>
              <div className="text-center">Play Days</div>
              <div className="text-center">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="grid grid-cols-6 gap-2 p-4 items-center text-sm text-gray-700 hover:bg-gray-50"
                >
                  {/* Game Name */}
                  <div className="text-left pl-3 font-medium">{game.name}</div>

                  {/* Open Time */}
                  <div className="text-center">{game.open}</div>

                  {/* Close Time */}
                  <div className="text-center">{game.close}</div>

                  {/* Play Status */}
                  <div className="text-center">{game.play}</div>

                  {/* Play Days */}
                  <div className="text-center text-xs">{game.playDays}</div>

                  {/* Action */}
                  <div className="text-center">
                    <button
                      onClick={() => handleEditGame(game.id)}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <FaEdit size={18} />
                    </button>
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

AddGame.displayName = "AddGame";
