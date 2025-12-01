// Report Generation Page - displays bid reports with filters

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface BidData {
  id: string;
  game: string;
  type: string;
  openClose: string;
  number: string;
  bet: number;
}

// Mock data for each category
const mockSingleAnkData: BidData[] = [
  {
    id: "1",
    game: "KALYAN",
    type: "Single Ank",
    openClose: "Open",
    number: "5",
    bet: 100,
  },
  {
    id: "2",
    game: "TIME BAZAR",
    type: "Single Ank",
    openClose: "Close",
    number: "3",
    bet: 200,
  },
  {
    id: "3",
    game: "MILAN DAY",
    type: "Single Ank",
    openClose: "Open",
    number: "7",
    bet: 150,
  },
];

const mockJodiData: BidData[] = [
  {
    id: "1",
    game: "KALYAN",
    type: "Jodi",
    openClose: "Open",
    number: "45",
    bet: 500,
  },
  {
    id: "2",
    game: "SRIDEVI",
    type: "Jodi",
    openClose: "Close",
    number: "23",
    bet: 300,
  },
];

const mockSinglePanaData: BidData[] = [
  {
    id: "1",
    game: "MADHUR DAY",
    type: "Single Pana",
    openClose: "Open",
    number: "123",
    bet: 200,
  },
  {
    id: "2",
    game: "KALYAN",
    type: "Single Pana",
    openClose: "Close",
    number: "456",
    bet: 400,
  },
];

const mockDoublePanaData: BidData[] = [
  {
    id: "1",
    game: "TIME BAZAR",
    type: "Double Pana",
    openClose: "Open",
    number: "112",
    bet: 300,
  },
  {
    id: "2",
    game: "MILAN DAY",
    type: "Double Pana",
    openClose: "Close",
    number: "556",
    bet: 250,
  },
];

const mockTriplePanaData: BidData[] = [
  {
    id: "1",
    game: "KALYAN",
    type: "Triple Pana",
    openClose: "Open",
    number: "111",
    bet: 500,
  },
  {
    id: "2",
    game: "SRIDEVI",
    type: "Triple Pana",
    openClose: "Close",
    number: "777",
    bet: 600,
  },
];

export const ReportGeneration = memo(() => {
  const [gameType, setGameType] = useState("Game Type");
  const [gameList, setGameList] = useState("All Game");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [openClose, setOpenClose] = useState("Both");
  const [searchQuery, setSearchQuery] = useState("");
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Format data for clipboard
  const formatDataForClipboard = (data: BidData[]): string => {
    if (data.length === 0) return "No data available";

    const header = "Game\tType\tOpen/Close\tNumber\tBet";
    const rows = data.map(
      (item) =>
        `${item.game}\t${item.type}\t${item.openClose}\t${item.number}\t${item.bet}`
    );
    return [header, ...rows].join("\n");
  };

  // Copy to clipboard helper
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType,
      gameList,
      date: selectedDate,
      openClose,
      search: searchQuery,
    });
  }, [gameType, gameList, selectedDate, openClose, searchQuery]);

  const handleCopyAllBids = useCallback(() => {
    const allData = [
      ...mockSingleAnkData,
      ...mockJodiData,
      ...mockSinglePanaData,
      ...mockDoublePanaData,
      ...mockTriplePanaData,
    ];
    const formattedText = formatDataForClipboard(allData);
    copyToClipboard(formattedText, "All Bids");
  }, []);

  const handleCopySingleAnk = useCallback(() => {
    const formattedText = formatDataForClipboard(mockSingleAnkData);
    copyToClipboard(formattedText, "Single Ank");
  }, []);

  const handleCopyJodi = useCallback(() => {
    const formattedText = formatDataForClipboard(mockJodiData);
    copyToClipboard(formattedText, "Jodi");
  }, []);

  const handleCopySinglePana = useCallback(() => {
    const formattedText = formatDataForClipboard(mockSinglePanaData);
    copyToClipboard(formattedText, "Single Pana");
  }, []);

  const handleCopyDoublePana = useCallback(() => {
    const formattedText = formatDataForClipboard(mockDoublePanaData);
    copyToClipboard(formattedText, "Double Pana");
  }, []);

  const handleCopyTriplePana = useCallback(() => {
    const formattedText = formatDataForClipboard(mockTriplePanaData);
    copyToClipboard(formattedText, "Triple Pana");
  }, []);

  // Render table with data
  const renderTable = (data: BidData[]) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
            <div className="text-left pl-3">Game</div>
            <div className="text-center">Type</div>
            <div className="text-center">Open Close</div>
            <div className="text-center">No.</div>
            <div className="text-center">Bet</div>
          </div>
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 gap-2 p-3 text-sm border-b border-gray-100"
              >
                <div className="text-left pl-3 font-medium">{item.game}</div>
                <div className="text-center text-gray-600">{item.type}</div>
                <div className="text-center text-gray-600">
                  {item.openClose}
                </div>
                <div className="text-center font-semibold">{item.number}</div>
                <div className="text-center text-green-600 font-semibold">
                  ₹{item.bet}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Game">All Game</option>
              <option value="SRIDEVI">SRIDEVI</option>
              <option value="TIME BAZAR">TIME BAZAR</option>
              <option value="MADHUR DAY">MADHUR DAY</option>
              <option value="MILAN DAY">MILAN DAY</option>
              <option value="KALYAN">KALYAN</option>
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="mb-3">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a ..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Filter
        </button>
      </div>

      {/* Copy All Bids Section */}
      <div className="bg-yellow-500 rounded-2xl p-4 mb-4 shadow-lg">
        <div className="h-8"></div>
      </div>

      <button
        onClick={handleCopyAllBids}
        className="w-full mb-4 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {copySuccess === "All Bids" ? "✓ Copied!" : "Copy All Bids"}
      </button>

      {/* Yellow Divider */}
      <div className="bg-yellow-500 rounded-full h-2 mb-4"></div>

      {/* Copy Single Ank */}
      <button
        onClick={handleCopySingleAnk}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {copySuccess === "Single Ank" ? "✓ Copied!" : "Copy Single Ank"}
      </button>

      {/* Single Ank Table */}
      {renderTable(mockSingleAnkData)}

      {/* Copy Jodi */}
      <button
        onClick={handleCopyJodi}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {copySuccess === "Jodi" ? "✓ Copied!" : "Copy Jodi"}
      </button>

      {/* Jodi Table */}
      {renderTable(mockJodiData)}

      {/* Copy Single Pana */}
      <button
        onClick={handleCopySinglePana}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {copySuccess === "Single Pana" ? "✓ Copied!" : "Copy Single Pana"}
      </button>

      {/* Single Pana Table */}
      {renderTable(mockSinglePanaData)}

      {/* Copy Double Pana */}
      <button
        onClick={handleCopyDoublePana}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {copySuccess === "Double Pana" ? "✓ Copied!" : "Copy Double Pana"}
      </button>

      {/* Double Pana Table */}
      {renderTable(mockDoublePanaData)}

      {/* Copy Triple Pana */}
      <button
        onClick={handleCopyTriplePana}
        className="w-full mb-3 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {copySuccess === "Triple Pana" ? "✓ Copied!" : "Copy Triple Pana"}
      </button>

      {/* Triple Pana Table */}
      {renderTable(mockTriplePanaData)}

      {/* Copy Success Toast */}
      {copySuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50">
          ✓ {copySuccess} copied to clipboard!
        </div>
      )}
    </Layout>
  );
});

ReportGeneration.displayName = "ReportGeneration";
