// Win History Page - displays bid history with filters

import { memo, useState, useCallback, useMemo } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

type FilterType = "All" | "Win" | "loose" | "pending" | "cancelled";
type StatusType = "win" | "loose" | "pending" | "cancelled";

interface WinHistoryRecord {
  id: string;
  username: string;
  phone: string;
  market: string;
  type: string;
  time: string;
  date: string;
  status: StatusType;
  number: string;
  amount: number;
  winAmount: number;
}

// Mock data for Win History
const mockWinHistoryData: WinHistoryRecord[] = [
  {
    id: "1",
    username: "sanjuthakur",
    phone: "8120676094",
    market: "TIME BAZAR",
    type: "SingleAnk-open",
    time: "12:54:59 PM",
    date: "2025-11-25",
    status: "win",
    number: "5",
    amount: 100,
    winAmount: 900,
  },
  {
    id: "2",
    username: "rahulkumar",
    phone: "9876543210",
    market: "KALYAN NIGHT",
    type: "Jodi",
    time: "09:30:00 PM",
    date: "2025-11-25",
    status: "win",
    number: "45",
    amount: 200,
    winAmount: 18000,
  },
  {
    id: "3",
    username: "priyasharma",
    phone: "8765432109",
    market: "MILAN DAY",
    type: "SinglePana-close",
    time: "03:15:30 PM",
    date: "2025-11-25",
    status: "loose",
    number: "123",
    amount: 150,
    winAmount: 0,
  },
  {
    id: "4",
    username: "vikassingh",
    phone: "7654321098",
    market: "SRIDEVI",
    type: "DoublePana-open",
    time: "11:45:00 AM",
    date: "2025-11-25",
    status: "pending",
    number: "112",
    amount: 300,
    winAmount: 0,
  },
  {
    id: "5",
    username: "amitpatel",
    phone: "6543210987",
    market: "MADHUR DAY",
    type: "TriplePana-close",
    time: "04:20:15 PM",
    date: "2025-11-25",
    status: "cancelled",
    number: "777",
    amount: 500,
    winAmount: 0,
  },
  {
    id: "6",
    username: "nehaverma",
    phone: "5432109876",
    market: "TIME BAZAR",
    type: "SingleAnk-close",
    time: "01:30:45 PM",
    date: "2025-11-25",
    status: "win",
    number: "3",
    amount: 50,
    winAmount: 450,
  },
  {
    id: "7",
    username: "rajeshgupta",
    phone: "4321098765",
    market: "KALYAN NIGHT",
    type: "Jodi",
    time: "10:00:00 PM",
    date: "2025-11-25",
    status: "loose",
    number: "67",
    amount: 400,
    winAmount: 0,
  },
  {
    id: "8",
    username: "sunilyadav",
    phone: "3210987654",
    market: "MILAN DAY",
    type: "SingleAnk-open",
    time: "02:45:30 PM",
    date: "2025-11-26",
    status: "win",
    number: "9",
    amount: 250,
    winAmount: 2250,
  },
  {
    id: "9",
    username: "kavitajoshi",
    phone: "2109876543",
    market: "SRIDEVI",
    type: "SinglePana-open",
    time: "10:30:00 AM",
    date: "2025-11-26",
    status: "pending",
    number: "456",
    amount: 100,
    winAmount: 0,
  },
  {
    id: "10",
    username: "manojkumar",
    phone: "1098765432",
    market: "MADHUR DAY",
    type: "Jodi",
    time: "05:15:00 PM",
    date: "2025-11-26",
    status: "loose",
    number: "23",
    amount: 350,
    winAmount: 0,
  },
];

export const WinHistory = memo(() => {
  const [gameType, setGameType] = useState("Game Type");
  const [gameList, setGameList] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [openClose, setOpenClose] = useState("Both");
  const [userSearch, setUserSearch] = useState("");
  const [numberSearch, setNumberSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return mockWinHistoryData.filter((record) => {
      // Filter by date
      if (record.date !== selectedDate) return false;

      // Filter by status
      if (
        activeFilter !== "All" &&
        record.status !== activeFilter.toLowerCase()
      )
        return false;

      // Filter by game list
      if (gameList !== "All Game" && record.market !== gameList) return false;

      // Filter by open/close
      if (openClose !== "Both") {
        const isOpen = record.type.toLowerCase().includes("open");
        const isClose = record.type.toLowerCase().includes("close");
        if (openClose === "Open" && !isOpen) return false;
        if (openClose === "Close" && !isClose) return false;
      }

      // Filter by user search
      if (
        userSearch &&
        !record.username.toLowerCase().includes(userSearch.toLowerCase()) &&
        !record.phone.includes(userSearch)
      )
        return false;

      // Filter by number search
      if (numberSearch && !record.number.includes(numberSearch)) return false;

      return true;
    });
  }, [
    selectedDate,
    activeFilter,
    gameList,
    openClose,
    userSearch,
    numberSearch,
  ]);

  // Get status color
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "win":
        return "bg-green-500 text-white";
      case "loose":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType,
      gameList,
      date: selectedDate,
      openClose,
      userSearch,
      numberSearch,
    });
  }, [gameType, gameList, selectedDate, openClose, userSearch, numberSearch]);

  const handleFilterClick = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
    console.log(`Filter changed to: ${filter}`);
  }, []);

  const handlePrevious = useCallback(() => {
    console.log("Navigate to previous page");
  }, []);

  const handleNext = useCallback(() => {
    console.log("Navigate to next page");
  }, []);

  return (
    <Layout>
      <BackButton />

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Game Type */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game Type
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Game Type">Game Type</option>
              <option value="Main">Main</option>
              <option value="Starline">Starline</option>
            </select>
          </div>

          {/* Game List */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Game List
            </label>
            <select
              value={gameList}
              onChange={(e) => setGameList(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              <option value="KALYAN NIGHT">KALYAN NIGHT</option>
              <option value="SRIDEVI">SRIDEVI</option>
              <option value="TIME BAZAR">TIME BAZAR</option>
              <option value="MADHUR DAY">MADHUR DAY</option>
              <option value="MILAN DAY">MILAN DAY</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
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

          {/* Open/Close */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Open / Close
            </label>
            <select
              value={openClose}
              onChange={(e) => setOpenClose(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Both">Both</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* User Search */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              User
            </label>
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search for a ..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number Search */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Number
            </label>
            <input
              type="text"
              value={numberSearch}
              onChange={(e) => setNumberSearch(e.target.value)}
              placeholder=""
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Filter
        </button>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterClick("All")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "All"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterClick("Win")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "Win"
              ? "bg-green-600 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Win
        </button>
        <button
          onClick={() => handleFilterClick("loose")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "loose"
              ? "bg-pink-600 text-white"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          loose
        </button>
        <button
          onClick={() => handleFilterClick("pending")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          pending
        </button>
        <button
          onClick={() => handleFilterClick("cancelled")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "cancelled"
              ? "bg-cyan-600 text-white"
              : "bg-cyan-500 text-white hover:bg-cyan-600"
          }`}
        >
          cancelled
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="bg-yellow-500 grid grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_1fr] gap-2 p-3 text-sm font-bold text-gray-800">
              <div className="text-left pl-3">
                Username
                <br />
                Phone
              </div>
              <div className="text-center">
                Market
                <br />
                Type
                <br />
                Time
              </div>
              <div className="text-center">Status</div>
              <div className="text-center">No.</div>
              <div className="text-center">Amount</div>
              <div className="text-center">
                Win
                <br />
                Amt
              </div>
            </div>

            {/* Data Rows */}
            {filteredData.length > 0 ? (
              filteredData.map((record) => (
                <div
                  key={record.id}
                  className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_1fr] gap-2 p-3 border-b border-gray-100 text-sm items-center hover:bg-gray-50"
                >
                  <div className="text-left pl-3">
                    <div className="font-medium text-gray-800">
                      {record.username}
                    </div>
                    <div className="text-gray-500 text-xs">{record.phone}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800">
                      {record.market}
                    </div>
                    <div className="text-gray-600 text-xs">{record.type}</div>
                    <div className="text-gray-400 text-xs">{record.time}</div>
                  </div>
                  <div className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </div>
                  <div className="text-center font-medium text-gray-700">
                    {record.number}
                  </div>
                  <div className="text-center font-medium text-gray-700">
                    ₹{record.amount}
                  </div>
                  <div className="text-center font-bold text-green-600">
                    {record.winAmount > 0 ? `₹${record.winAmount}` : "-"}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                No records found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrevious}
          className="flex-1 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          PERVS
        </button>
        <div className="px-6 py-3 bg-gray-600 text-white rounded-full text-base font-semibold">
          {filteredData.length}/{mockWinHistoryData.length}
        </div>
        <button
          onClick={handleNext}
          className="flex-1 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          NEXT
        </button>
      </div>
    </Layout>
  );
});

WinHistory.displayName = "WinHistory";
