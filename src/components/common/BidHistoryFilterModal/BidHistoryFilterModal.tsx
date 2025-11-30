// Bid History Filter Modal - allows admin to filter bid history by game type, winning status, and game

import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

interface BidHistoryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  gameType: "Matka" | "Starline & Jackpot";
  onApplyFilter: (filters: BidHistoryFilters) => void;
}

export interface BidHistoryFilters {
  gameType: "Open" | "Close" | null;
  winningStatus: "Win" | "Loose" | "Pending" | null;
  selectedGames: string[];
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

export const BidHistoryFilterModal = memo(
  ({
    isOpen,
    onClose,
    username,
    gameType,
    onApplyFilter,
  }: BidHistoryFilterModalProps) => {
    const navigate = useNavigate();
    const [gameTypeFilter, setGameTypeFilter] = useState<
      "Open" | "Close" | null
    >(null);
    const [winningStatus, setWinningStatus] = useState<
      "Win" | "Loose" | "Pending" | null
    >(null);
    const [selectedGames, setSelectedGames] = useState<string[]>([]);

    const games = gameType === "Matka" ? matkaGames : starlineGames;

    // Reset filters when modal opens
    useEffect(() => {
      if (isOpen) {
        setGameTypeFilter(null);
        setWinningStatus(null);
        setSelectedGames([]);
      }
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    const toggleGame = (game: string) => {
      setSelectedGames((prev) =>
        prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]
      );
    };

    const handleApplyFilter = () => {
      // Call the callback to update parent state
      onApplyFilter({
        gameType: gameTypeFilter,
        winningStatus,
        selectedGames,
      });

      // Build query params for navigation
      const params = new URLSearchParams();
      params.set("username", username);
      params.set("gameType", gameType);
      if (gameTypeFilter) params.set("filterType", gameTypeFilter);
      if (winningStatus) params.set("winningStatus", winningStatus);
      if (selectedGames.length > 0)
        params.set("games", selectedGames.join(","));

      // Navigate to bid history page
      navigate(`/bid-history?${params.toString()}`);
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-800">
              Name: {username}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <MdClose size={28} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* By Game Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                By Game Type
              </h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameTypeFilter === "Open"}
                    onChange={() =>
                      setGameTypeFilter(
                        gameTypeFilter === "Open" ? null : "Open"
                      )
                    }
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">Open</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameTypeFilter === "Close"}
                    onChange={() =>
                      setGameTypeFilter(
                        gameTypeFilter === "Close" ? null : "Close"
                      )
                    }
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">Close</span>
                </label>
              </div>
            </div>

            {/* By Winning Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                By Winning Status
              </h3>
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={winningStatus === "Win"}
                    onChange={() =>
                      setWinningStatus(winningStatus === "Win" ? null : "Win")
                    }
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">Win</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={winningStatus === "Loose"}
                    onChange={() =>
                      setWinningStatus(
                        winningStatus === "Loose" ? null : "Loose"
                      )
                    }
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">Loose</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={winningStatus === "Pending"}
                    onChange={() =>
                      setWinningStatus(
                        winningStatus === "Pending" ? null : "Pending"
                      )
                    }
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">Pending</span>
                </label>
              </div>
            </div>

            {/* By Game */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                By Game
              </h3>
              <div className="space-y-2">
                {games.map((game) => (
                  <label
                    key={game}
                    className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 transition-colors rounded-xl px-4 py-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGames.includes(game)}
                      onChange={() => toggleGame(game)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-gray-800 font-semibold text-lg">
                      {game}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
            >
              Filter Go
            </button>
          </div>
        </div>
      </div>
    );
  }
);

BidHistoryFilterModal.displayName = "BidHistoryFilterModal";
