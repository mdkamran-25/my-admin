// Report Generation Starline Page - displays starline game reports with copy functionality

import { memo, useState, useCallback, useMemo } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface BidData {
  game: string;
  type: string;
  time: string;
  number: string;
  bet: number;
}

export const ReportGenerationStarline = memo(() => {
  const [selectedGameType, setSelectedGameType] = useState("starline");
  const [selectedGameList, setSelectedGameList] = useState("starline");
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [selectedTime, setSelectedTime] = useState("01:00 PM");
  const [searchQuery, setSearchQuery] = useState("");
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Mock data for Single Ank
  const singleAnkData: BidData[] = [
    { game: "starline", type: "singleank", time: "13:00:00", number: "0", bet: 195 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "1", bet: 155 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "2", bet: 284 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "3", bet: 144 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "4", bet: 324 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "5", bet: 280 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "6", bet: 229 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "7", bet: 149 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "8", bet: 296 },
    { game: "starline", type: "singleank", time: "13:00:00", number: "9", bet: 240 },
  ];

  // Mock data for Single Pana
  const singlePanaData: BidData[] = [
    { game: "starline", type: "singlepana", time: "13:00:00", number: "123", bet: 450 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "456", bet: 320 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "789", bet: 275 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "120", bet: 180 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "345", bet: 390 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "678", bet: 210 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "234", bet: 155 },
    { game: "starline", type: "singlepana", time: "13:00:00", number: "567", bet: 480 },
  ];

  // Mock data for Double Pana
  const doublePanaData: BidData[] = [
    { game: "starline", type: "doublepana", time: "13:00:00", number: "112", bet: 350 },
    { game: "starline", type: "doublepana", time: "13:00:00", number: "334", bet: 420 },
    { game: "starline", type: "doublepana", time: "13:00:00", number: "556", bet: 280 },
    { game: "starline", type: "doublepana", time: "13:00:00", number: "778", bet: 195 },
    { game: "starline", type: "doublepana", time: "13:00:00", number: "990", bet: 310 },
    { game: "starline", type: "doublepana", time: "13:00:00", number: "223", bet: 265 },
  ];

  // Mock data for Triple Pana
  const triplePanaData: BidData[] = [
    { game: "starline", type: "triplepana", time: "13:00:00", number: "000", bet: 500 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "111", bet: 450 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "222", bet: 380 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "333", bet: 290 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "444", bet: 420 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "555", bet: 350 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "666", bet: 275 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "777", bet: 520 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "888", bet: 310 },
    { game: "starline", type: "triplepana", time: "13:00:00", number: "999", bet: 460 },
  ];

  // Filter data by search query
  const filterBySearch = useCallback((data: BidData[]) => {
    if (!searchQuery) return data;
    return data.filter(item => 
      item.number.includes(searchQuery) || 
      item.bet.toString().includes(searchQuery)
    );
  }, [searchQuery]);

  const filteredSingleAnk = useMemo(() => filterBySearch(singleAnkData), [filterBySearch]);
  const filteredSinglePana = useMemo(() => filterBySearch(singlePanaData), [filterBySearch]);
  const filteredDoublePana = useMemo(() => filterBySearch(doublePanaData), [filterBySearch]);
  const filteredTriplePana = useMemo(() => filterBySearch(triplePanaData), [filterBySearch]);

  // Calculate totals
  const allData = [...filteredSingleAnk, ...filteredSinglePana, ...filteredDoublePana, ...filteredTriplePana];
  const totalBets = allData.length;
  const totalAmount = allData.reduce((sum, item) => sum + item.bet, 0);

  // Copy helper function
  const copyToClipboard = useCallback((data: BidData[], label: string) => {
    const textToCopy = data
      .map(item => `${item.game}\t${item.type}\t${item.time}\t${item.number}\t${item.bet}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopyToast(`${label} copied!`);
    setTimeout(() => setCopyToast(null), 2000);
  }, []);

  const handleFilter = useCallback(() => {
    console.log("Applying filter...", {
      gameType: selectedGameType,
      gameList: selectedGameList,
      date: selectedDate,
      time: selectedTime,
      search: searchQuery,
    });
  }, [selectedGameType, selectedGameList, selectedDate, selectedTime, searchQuery]);

  const handleCopyAllBids = useCallback(() => {
    copyToClipboard(allData, "All bids");
  }, [allData, copyToClipboard]);

  const handleCopySingleAnk = useCallback(() => {
    copyToClipboard(filteredSingleAnk, "Single Ank");
  }, [filteredSingleAnk, copyToClipboard]);

  const handleCopySinglePana = useCallback(() => {
    copyToClipboard(filteredSinglePana, "Single Pana");
  }, [filteredSinglePana, copyToClipboard]);

  const handleCopyDoublePana = useCallback(() => {
    copyToClipboard(filteredDoublePana, "Double Pana");
  }, [filteredDoublePana, copyToClipboard]);

  const handleCopyTriplePana = useCallback(() => {
    copyToClipboard(filteredTriplePana, "Triple Pana");
  }, [filteredTriplePana, copyToClipboard]);

  // Render table with data
  const renderTable = (data: BidData[]) => (
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
          {/* Table Body */}
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-2 p-3 border-b border-gray-100 text-sm items-center hover:bg-gray-50"
              >
                <div className="text-left pl-3 font-medium text-gray-700">{item.game}</div>
                <div className="text-center text-gray-600">{item.type}</div>
                <div className="text-center text-gray-600">{item.time}</div>
                <div className="text-center font-bold text-blue-600">{item.number}</div>
                <div className="text-center font-semibold text-green-600">₹{item.bet}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">No data found</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <BackButton />

      {/* Copy Toast Notification */}
      {copyToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {copyToast}
        </div>
      )}
      
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="starline">Starline</option>
              <option value="main">Main</option>
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
            placeholder="Search by number or bet amount..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {selectedGameList} ({selectedTime.replace(" ", ":")})
        </span>
        <span className="text-gray-800 font-bold text-base">{selectedDate}</span>
      </div>

      {/* Copy All Bids Button */}
      <button
        onClick={handleCopyAllBids}
        className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-4"
      >
        Copy All Bids ({totalBets} bids)
      </button>

      {/* Total Summary */}
      <div className="bg-yellow-500 rounded-lg p-4 mb-4 shadow-md">
        <p className="text-gray-800 font-bold text-base text-center">
          Total Bet : {totalBets} , Total Amount : ₹{totalAmount}
        </p>
      </div>

      {/* Single Ank Section */}
      <div className="mb-4">
        <button
          onClick={handleCopySingleAnk}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Single Ank ({filteredSingleAnk.length})
        </button>
        {renderTable(filteredSingleAnk)}
      </div>

      {/* Single Pana Section */}
      <div className="mb-4">
        <button
          onClick={handleCopySinglePana}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Single Pana ({filteredSinglePana.length})
        </button>
        {renderTable(filteredSinglePana)}
      </div>

      {/* Double Pana Section */}
      <div className="mb-4">
        <button
          onClick={handleCopyDoublePana}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Double Pana ({filteredDoublePana.length})
        </button>
        {renderTable(filteredDoublePana)}
      </div>

      {/* Triple Pana Section */}
      <div className="mb-4">
        <button
          onClick={handleCopyTriplePana}
          className="w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md mb-3"
        >
          Copy Triple Pana ({filteredTriplePana.length})
        </button>
        {renderTable(filteredTriplePana)}
      </div>
    </Layout>
  );
});

ReportGenerationStarline.displayName = "ReportGenerationStarline";
