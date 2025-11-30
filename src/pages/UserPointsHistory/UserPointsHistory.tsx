// User Points History Page - displays user's point transaction history

import { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { GameTypeModal } from "../../components/common/GameTypeModal";
import { BidHistoryFilterModal } from "../../components/common/BidHistoryFilterModal";
import type { BidHistoryFilters } from "../../components/common/BidHistoryFilterModal";
import { userApi } from "../../services/mockApi";

interface PointTransaction {
  id: string;
  description: string;
  point: number;
  balance: number;
  date: string;
  time: string;
  type: "Win" | "Bid Play" | "Add" | "Withdraw";
  game?: string;
  bidType?: string;
  bidNumber?: string;
  playTime?: string;
}

// Mock data generator with dynamic data based on username
const generateMockTransactions = (
  _username: string,
  dateFilter: string
): PointTransaction[] => {
  // Generate different data for different users (username can be used for different data in production)
  const baseTransactions = [
    {
      id: "1",
      description: "900.50",
      point: 1500.0,
      balance: 2400.5,
      date: "25-11-2025",
      time: "10:00 PM",
      type: "Win" as const,
      game: "MAIN BAZAR",
      bidType: "Single Pana",
      bidNumber: "open (468)",
      playTime: "25-11-2025 09:40 PM",
    },
    {
      id: "2",
      description: "905.50",
      point: -5.0,
      balance: 900.5,
      date: "25-11-2025",
      time: "09:49 PM",
      type: "Bid Play" as const,
      game: "MAIN BAZAR",
      bidType: "Double Pana",
      bidNumber: "open (667)",
    },
    {
      id: "3",
      description: "910.50",
      point: -5.0,
      balance: 905.5,
      date: "25-11-2025",
      time: "09:49 PM",
      type: "Bid Play" as const,
      game: "MAIN BAZAR",
      bidType: "Double Pana",
      bidNumber: "open (577)",
    },
    {
      id: "4",
      description: "915.50",
      point: -5.0,
      balance: 910.5,
      date: "25-11-2025",
      time: "09:49 PM",
      type: "Bid Play" as const,
      game: "MAIN BAZAR",
      bidType: "Double Pana",
      bidNumber: "open (559)",
    },
    {
      id: "5",
      description: "920.50",
      point: 500.0,
      balance: 915.5,
      date: "24-11-2025",
      time: "08:30 PM",
      type: "Add" as const,
    },
    {
      id: "6",
      description: "420.50",
      point: -200.0,
      balance: 420.5,
      date: "24-11-2025",
      time: "06:15 PM",
      type: "Withdraw" as const,
    },
    {
      id: "7",
      description: "620.50",
      point: 800.0,
      balance: 620.5,
      date: "23-11-2025",
      time: "07:45 PM",
      type: "Win" as const,
      game: "KALYAN",
      bidType: "Jodi",
      bidNumber: "56",
      playTime: "23-11-2025 07:20 PM",
    },
  ];

  // Filter by date if provided
  let filteredTransactions = baseTransactions;
  if (dateFilter) {
    const filterDate = dateFilter.replace(/\//g, "-");
    filteredTransactions = baseTransactions.filter(
      (t) => t.date === filterDate
    );
  }

  return filteredTransactions;
};

export const UserPointsHistory = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const usernameParam = searchParams.get("username");

  const [selectedDate, setSelectedDate] = useState("25/11/2025");
  const [searchUser, setSearchUser] = useState(usernameParam || "");
  const [activeUser, setActiveUser] = useState(usernameParam || "");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [isGameTypeModalOpen, setIsGameTypeModalOpen] = useState(false);
  const [isBidFilterModalOpen, setIsBidFilterModalOpen] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState<
    "Matka" | "Starline & Jackpot"
  >("Matka");

  useEffect(() => {
    const fetchUser = async () => {
      if (userIdParam) {
        try {
          const response = await userApi.getUserById(userIdParam);
          if (response.data) {
            setSearchUser(response.data.username);
            setActiveUser(response.data.username);
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      }
    };

    fetchUser();
  }, [userIdParam]);

  useEffect(() => {
    // Load transactions when user changes
    const mockTransactions = generateMockTransactions(activeUser, selectedDate);
    setTransactions(mockTransactions);
  }, [activeUser, selectedDate]);

  const handleFilter = () => {
    // Update active user and URL params
    if (searchUser) {
      setActiveUser(searchUser);
      // Update URL params
      const params = new URLSearchParams();
      params.set("username", searchUser);
      if (userIdParam) {
        params.set("userId", userIdParam);
      }
      setSearchParams(params);
    }
  };

  const filteredTransactions =
    selectedFilter === "All"
      ? transactions
      : transactions.filter((t) => t.type === selectedFilter);

  const handleGameTypeSelect = (gameType: "matka" | "starline") => {
    console.log("Selected game type:", gameType, "for user:", activeUser);
    setSelectedGameType(gameType === "matka" ? "Matka" : "Starline & Jackpot");
    setIsGameTypeModalOpen(false);
    setIsBidFilterModalOpen(true);
  };

  const handleApplyBidFilter = (filters: BidHistoryFilters) => {
    console.log("Applied filters:", filters);
    setIsBidFilterModalOpen(false);
    // Here you can filter the bid history based on the selected filters
    // You might want to navigate to a bid history page or update the current view
  };

  const filterButtons = [
    { label: "All", value: "All", color: "bg-gray-600" },
    { label: "Win", value: "Win", color: "bg-cyan-500" },
    { label: "Add", value: "Add", color: "bg-green-500" },
    { label: "withdraw", value: "Withdraw", color: "bg-red-500" },
    {
      label: "Bid History",
      value: "Bid History",
      color: "bg-gray-600",
      isModal: true,
    },
  ];

  return (
    <Layout>
      <BackButton />

      {/* Active User Banner */}
      {activeUser && (
        <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3 mb-4 rounded">
          <p className="text-blue-800 font-medium">
            Showing points history for:{" "}
            <span className="font-bold">{activeUser}</span>
          </p>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-gray-100 rounded-xl p-4 mb-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
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

          {/* User */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              User
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleFilter();
                  }
                }}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
              {searchUser && (
                <button
                  onClick={() => setSearchUser("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-full font-semibold transition-colors"
        >
          Filter
        </button>

        {/* Filter Type Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() =>
                btn.isModal
                  ? setIsGameTypeModalOpen(true)
                  : setSelectedFilter(btn.value)
              }
              className={`${btn.color} ${
                selectedFilter === btn.value
                  ? "ring-2 ring-offset-2 ring-blue-500"
                  : ""
              } text-white px-4 py-2 rounded-full font-medium whitespace-nowrap hover:opacity-90 transition-all`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-yellow-500 rounded-t-xl grid grid-cols-3 gap-2 px-4 py-3">
        <div className="text-black font-bold text-sm">Description</div>
        <div className="text-black font-bold text-sm text-center">Point</div>
        <div className="text-black font-bold text-sm text-right">Balance</div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3 mb-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            {/* Top Row - Description, Point, Balance */}
            <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-gray-200">
              <div className="text-gray-900 font-bold text-lg">
                {transaction.description}
              </div>
              <div
                className={`text-center font-bold text-lg ${
                  transaction.point > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.point > 0 ? "+" : ""}
                {transaction.point.toFixed(2)}
              </div>
              <div className="text-gray-900 font-bold text-lg text-right">
                {transaction.balance.toFixed(2)}
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-sm">
                  {transaction.date} ⏰ {transaction.time}
                </span>
              </div>
              <div className="font-bold text-gray-900 text-base">
                {transaction.type}
              </div>
              {transaction.type === "Bid Play" && (
                <div className="text-gray-700 text-sm">
                  Bid (
                  {transaction.point < 0
                    ? Math.abs(transaction.point)
                    : transaction.point}
                  )
                </div>
              )}
              {transaction.game && (
                <>
                  <div className="font-semibold text-gray-900">
                    {transaction.game} :
                  </div>
                  <div className="text-gray-700">{transaction.bidType}</div>
                  <div className="text-gray-700">{transaction.bidNumber}</div>
                </>
              )}
            </div>

            {/* Play Time Footer */}
            {transaction.playTime && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700">
                    Play Time {transaction.playTime.split(" ")[0]}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    ⏰ {transaction.playTime.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500">
          No transactions found
        </div>
      )}

      {/* Game Type Modal */}
      <GameTypeModal
        isOpen={isGameTypeModalOpen}
        onClose={() => setIsGameTypeModalOpen(false)}
        username={activeUser}
        onSelectGameType={handleGameTypeSelect}
      />

      {/* Bid History Filter Modal */}
      <BidHistoryFilterModal
        isOpen={isBidFilterModalOpen}
        onClose={() => setIsBidFilterModalOpen(false)}
        username={activeUser}
        gameType={selectedGameType}
        onApplyFilter={handleApplyBidFilter}
      />
    </Layout>
  );
});

UserPointsHistory.displayName = "UserPointsHistory";
