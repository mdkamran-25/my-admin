// Report Generation Starline Page - displays starline game reports with copy functionality

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface BidData {
  game: string;
  type: string;
  time: string;
  number: number;
  bet: number;
}

export const ReportGenerationStarline = memo(() => {
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedGameList, setSelectedGameList] = useState("starline");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [selectedTime, setSelectedTime] = useState("01:00 PM");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for Single Ank
  const singleAnkData: BidData[] = [
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 0,
      bet: 195,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 1,
      bet: 155,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 2,
      bet: 284,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 3,
      bet: 144,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 4,
      bet: 324,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 5,
      bet: 280,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 6,
      bet: 229,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 7,
      bet: 149,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 8,
      bet: 296,
    },
    {
      game: "starline",
      type: "singleank",
      time: "13:00:00",
      number: 9,
      bet: 240,
    },
  ];

  const totalBets = singleAnkData.length;
  const totalAmount = singleAnkData.reduce((sum, item) => sum + item.bet, 0);

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType: selectedGameType,
      gameList: selectedGameList,
      date: selectedDate,
      time: selectedTime,
      search: searchQuery,
    });
  }, [
    selectedGameType,
    selectedGameList,
    selectedDate,
    selectedTime,
    searchQuery,
  ]);

  const handleCopyAllBids = useCallback(() => {
    const textToCopy = singleAnkData
      .map(
        (item) =>
          `${item.game}\t${item.type}\t${item.time}\t${item.number}\t${item.bet}`
      )
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    console.log("Copied all bids");
  }, [singleAnkData]);

  const handleCopySingleAnk = useCallback(() => {
    const textToCopy = singleAnkData
      .map(
        (item) =>
          `${item.game}\t${item.type}\t${item.time}\t${item.number}\t${item.bet}`
      )
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    console.log("Copied Single Ank data");
  }, [singleAnkData]);

  const handleCopySinglePana = useCallback(() => {
    console.log("Copy Single Pana");
  }, []);

  const handleCopyDoublePana = useCallback(() => {
    console.log("Copy Double Pana");
  }, []);

  const handleCopyTriplePana = useCallback(() => {
    console.log("Copy Triple Pana");
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
              value={selectedGameType}
              onChange={(e) => setSelectedGameType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Game Type</option>
            </select>
          </div>

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
              <option value="starline">starline</option>
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

          {/* Time */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="07:00 PM">07:00 PM</option>
              <option value="08:00 PM">08:00 PM</option>
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

      {/* Game Info Banner */}
      <div className="bg-yellow-500 rounded-lg p-4 mb-4 flex items-center justify-between shadow-md">
        <span className="text-gray-800 font-bold text-base">
          starline (13:00:00)
        </span>
        <span className="text-gray-800 font-bold text-base">25-Nov-2025</span>
      </div>

      {/* Copy All Bids Button */}
      <button
        onClick={handleCopyAllBids}
        className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-4"
      >
        Copy All Bids
      </button>

      {/* Total Summary */}
      <div className="bg-yellow-500 rounded-lg p-4 mb-4 shadow-md">
        <p className="text-gray-800 font-bold text-base text-center">
          Total Bet : {totalBets} , Total Amount : {totalAmount}
        </p>
      </div>

      {/* Single Ank Section */}
      <div className="mb-4">
        <button
          onClick={handleCopySingleAnk}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Single Ank
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
                <div className="text-left pl-3">Game</div>
                <div className="text-center">Type</div>
                <div className="text-center">Time</div>
                <div className="text-center">No.</div>
                <div className="text-center">Bet</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Pana Section */}
      <div className="mb-4">
        <button
          onClick={handleCopySinglePana}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Single Pana
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
                <div className="text-left pl-3">Game</div>
                <div className="text-center">Type</div>
                <div className="text-center">Time</div>
                <div className="text-center">No.</div>
                <div className="text-center">Bet</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Double Pana Section */}
      <div className="mb-4">
        <button
          onClick={handleCopyDoublePana}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Double Pana
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
                <div className="text-left pl-3">Game</div>
                <div className="text-center">Type</div>
                <div className="text-center">Time</div>
                <div className="text-center">No.</div>
                <div className="text-center">Bet</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Triple Pana Section */}
      <div className="mb-4">
        <button
          onClick={handleCopyTriplePana}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Triple Pana
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="bg-yellow-500 grid grid-cols-5 gap-2 p-3 text-sm font-bold text-gray-800">
                <div className="text-left pl-3">Game</div>
                <div className="text-center">Type</div>
                <div className="text-center">Time</div>
                <div className="text-center">No.</div>
                <div className="text-center">Bet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

ReportGenerationStarline.displayName = "ReportGenerationStarline";
