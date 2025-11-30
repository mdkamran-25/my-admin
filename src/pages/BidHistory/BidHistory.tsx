// Bid History Page - displays filtered bid history for a user

import { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface BidRecord {
  id: string;
  username: string;
  phone: string;
  market: string;
  type: string;
  time: string;
  status: "loose" | "Win" | "pending" | "cancelled";
  number: string;
  amount: number;
  winAmount: number;
  openClose: "open" | "close";
}

const matkaGames = [
  "SRIDEVI",
  "TIME BAZAR",
  "MADHUR DAY",
  "MILAN DAY",
  "RAJDHANI DAY",
  "SUPREME DAY",
  "KALYAN",
  "MAIN BAZAR",
  "MADHUR NIGHT",
  "MILAN NIGHT",
  "RAJDHANI NIGHT",
  "SUPREME NIGHT",
];

const starlineGames = [
  "STARLINE 1",
  "STARLINE 2",
  "STARLINE 3",
  "STARLINE 4",
  "STARLINE 5",
  "STARLINE 6",
  "STARLINE 7",
  "STARLINE 8",
];

// Mock data generator
const generateMockBidHistory = (): BidRecord[] => {
  const games = [
    "SRIDEVI",
    "TIME BAZAR",
    "MADHUR DAY",
    "MILAN DAY",
    "RAJDHANI DAY",
    "SUPREME DAY",
    "KALYAN",
    "MAIN BAZAR",
  ];
  const types = [
    "SinglePana-open",
    "DoublePana-open",
    "TriplePana-close",
    "Jodi-close",
    "SingleDigit-open",
  ];
  const statuses: Array<"loose" | "Win" | "pending" | "cancelled"> = [
    "loose",
    "Win",
    "pending",
    "cancelled",
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    username: `${i % 2 === 0 ? "JyotiKumari" : "RahulSharma"}`,
    phone: `${9408158331 + i}`,
    market: games[i % games.length],
    type: types[i % types.length],
    time: `11:${20 + (i % 40)}:${10 + (i % 50)} AM\n25-11-2025`,
    status: statuses[i % statuses.length],
    number: `${200 + i}`,
    amount: i % 3 === 0 ? 10 : 5,
    winAmount: i % 4 === 0 ? 50 : 0,
    openClose: i % 2 === 0 ? "open" : "close",
  }));
};

export const BidHistory = memo(() => {
  const [searchParams] = useSearchParams();
  const usernameParam = searchParams.get("username") || "";
  const gameTypeParam = searchParams.get("gameType") || "Matka";

  const [bidRecords, setBidRecords] = useState<BidRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Filter states
  const [selectedGameType, setSelectedGameType] =
    useState<string>(gameTypeParam);
  const [selectedGame, setSelectedGame] = useState<string>("SRIDEVI");
  const [selectedDate, setSelectedDate] = useState<string>("25/11/2025");
  const [selectedOpenClose, setSelectedOpenClose] = useState<string>("Open");
  const [searchUser, setSearchUser] = useState<string>(usernameParam);
  const [searchNumber, setSearchNumber] = useState<string>("");

  const availableGames =
    selectedGameType === "Matka" ? matkaGames : starlineGames;

  useEffect(() => {
    // Load mock data
    const mockData = generateMockBidHistory();
    setBidRecords(mockData);
  }, []);

  // Apply all filters
  const filteredRecords = bidRecords.filter((record) => {
    // Status filter
    if (
      activeFilter !== "All" &&
      record.status !== activeFilter.toLowerCase()
    ) {
      return false;
    }

    // Game filter
    if (selectedGame && record.market !== selectedGame) {
      return false;
    }

    // Open/Close filter
    if (
      selectedOpenClose &&
      record.openClose !== selectedOpenClose.toLowerCase()
    ) {
      return false;
    }

    // User filter
    if (
      searchUser &&
      !record.username.toLowerCase().includes(searchUser.toLowerCase())
    ) {
      return false;
    }

    // Number filter
    if (searchNumber && !record.number.includes(searchNumber)) {
      return false;
    }

    return true;
  });

  const handleFilter = () => {
    // Re-trigger filtering by updating a state
    console.log("Filtering with:", {
      selectedGameType,
      selectedGame,
      selectedDate,
      selectedOpenClose,
      searchUser,
      searchNumber,
    });
  };

  const totalRecords = filteredRecords.length;

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Win":
        return "bg-green-500";
      case "loose":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Layout>
      <BackButton />

      {/* Filter Section */}
      <div className="bg-gray-100 rounded-xl p-4 mb-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Game Type */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Game Type
            </label>
            <select
              value={selectedGameType}
              onChange={(e) => setSelectedGameType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Matka">Matka</option>
              <option value="Starline">Starline</option>
            </select>
          </div>

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
              {availableGames.map((game) => (
                <option key={game} value={game}>
                  {game}
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
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25/11/2025"
            />
          </div>

          {/* Open / Close */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Open / Close
            </label>
            <select
              value={selectedOpenClose}
              onChange={(e) => setSelectedOpenClose(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>

          {/* User */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              User
            </label>
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for a ..."
            />
          </div>

          {/* Number */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Number
            </label>
            <input
              type="text"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full font-semibold transition-colors"
        >
          Filter
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        <button
          onClick={() => setActiveFilter("All")}
          className={`${
            activeFilter === "All" ? "bg-blue-600" : "bg-blue-500"
          } text-white px-5 py-2 rounded-full font-medium whitespace-nowrap hover:opacity-90 transition-all`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("Win")}
          className={`${
            activeFilter === "Win" ? "bg-green-600" : "bg-green-500"
          } text-white px-5 py-2 rounded-full font-medium whitespace-nowrap hover:opacity-90 transition-all`}
        >
          Win
        </button>
        <button
          onClick={() => setActiveFilter("loose")}
          className={`${
            activeFilter === "loose" ? "bg-red-600" : "bg-red-500"
          } text-white px-5 py-2 rounded-full font-medium whitespace-nowrap hover:opacity-90 transition-all`}
        >
          loose
        </button>
        <button
          onClick={() => setActiveFilter("pending")}
          className={`${
            activeFilter === "pending" ? "bg-yellow-600" : "bg-yellow-500"
          } text-white px-5 py-2 rounded-full font-medium whitespace-nowrap hover:opacity-90 transition-all`}
        >
          pending
        </button>
        <button
          onClick={() => setActiveFilter("cancelled")}
          className={`${
            activeFilter === "cancelled" ? "bg-cyan-600" : "bg-cyan-500"
          } text-white px-5 py-2 rounded-full font-medium whitespace-nowrap hover:opacity-90 transition-all`}
        >
          cancelled
        </button>
      </div>

      {/* Total Records */}
      <div className="bg-black text-center py-2 mb-4 rounded">
        <span className="text-orange-500 font-bold text-lg">
          Total Record :: {totalRecords}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="px-3 py-3 text-left font-semibold border-r border-orange-400">
                Username
                <br />
                Phone
              </th>
              <th className="px-3 py-3 text-left font-semibold border-r border-orange-400">
                Market
                <br />
                Type
                <br />
                Time
              </th>
              <th className="px-3 py-3 text-center font-semibold border-r border-orange-400">
                Status
              </th>
              <th className="px-3 py-3 text-center font-semibold border-r border-orange-400">
                No.
              </th>
              <th className="px-3 py-3 text-center font-semibold border-r border-orange-400">
                Amount
              </th>
              <th className="px-3 py-3 text-center font-semibold">
                Win
                <br />
                Amt
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr
                key={record.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors border-b border-gray-200`}
              >
                <td className="px-3 py-3 border-r border-gray-200">
                  <div className="font-medium text-gray-800">
                    {index + 1}- {record.username}
                  </div>
                  <div className="text-gray-600 text-sm">{record.phone}</div>
                </td>
                <td className="px-3 py-3 border-r border-gray-200">
                  <div className="font-semibold text-gray-800">
                    {record.market},
                  </div>
                  <div className="text-gray-700">{record.type}</div>
                  <div className="text-gray-600 text-xs whitespace-pre-line">
                    {record.time}
                  </div>
                </td>
                <td className="px-3 py-3 text-center border-r border-gray-200">
                  <span
                    className={`${getStatusBgColor(
                      record.status
                    )} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-center border-r border-gray-200">
                  <span className="font-bold text-gray-800">
                    {record.number}
                  </span>
                </td>
                <td className="px-3 py-3 text-center border-r border-gray-200">
                  <span className="font-semibold text-gray-800">
                    {record.amount}
                  </span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span
                    className={`font-semibold ${
                      record.winAmount > 0 ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {record.winAmount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500">
          No bid records found
        </div>
      )}
    </Layout>
  );
});

BidHistory.displayName = "BidHistory";
