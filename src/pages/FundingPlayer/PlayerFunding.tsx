// Player Funding Page - displays player financial details

import { memo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface TransactionRecord {
  id: string;
  userId: string;
  cAmount: number;
  credit: number | null;
  debit: number | null;
  finalAmount: number;
  currentBalance: number | null;
  reason: string;
  date: string;
  transactionMode: string;
  transType: "add" | "withdraw";
  comment: string;
  uid: string;
}

interface BidRecord {
  id: string;
  resultId: string;
  gameName: string;
  bidPlayDigit: string;
  playBidAmount: number;
  gamePlayType: string;
  openClose: "open" | "close";
  gameStyleType: string;
  playTime: string;
  tVia: string;
}

// Mock financial summary data
const mockFinancialSummary = {
  totalAddMoney: 1500.0,
  totalWithdrawal: 226500.0,
  totalWinMoney: 545915.0,
  totalPlayAmount: 590329.0,
};

// Mock transaction data
const mockTransactions: TransactionRecord[] = [
  {
    id: "1",
    userId: "15125",
    cAmount: 3,
    credit: 300,
    debit: null,
    finalAmount: 303,
    currentBalance: null,
    reason: "add gateway",
    date: "2025-11-02",
    transactionMode: "Add By UPI",
    transType: "add",
    comment: "Add Money by UPI",
    uid: "9645684849637",
  },
  {
    id: "2",
    userId: "15125",
    cAmount: 303,
    credit: null,
    debit: 75,
    finalAmount: 228,
    currentBalance: null,
    reason: "play",
    date: "2025-11-02",
    transactionMode: "bid place",
    transType: "withdraw",
    comment: "bid placed",
    uid: "bid_place3921972",
  },
  {
    id: "3",
    userId: "15125",
    cAmount: 228,
    credit: null,
    debit: 75,
    finalAmount: 153,
    currentBalance: null,
    reason: "play",
    date: "2025-11-02",
    transactionMode: "bid place",
    transType: "withdraw",
    comment: "bid placed",
    uid: "bid_place3921973",
  },
  {
    id: "4",
    userId: "15125",
    cAmount: 153,
    credit: null,
    debit: 75,
    finalAmount: 78,
    currentBalance: null,
    reason: "play",
    date: "2025-11-02",
    transactionMode: "bid place",
    transType: "withdraw",
    comment: "bid placed",
    uid: "bid_place3921974",
  },
  {
    id: "5",
    userId: "15125",
    cAmount: 78,
    credit: null,
    debit: 75,
    finalAmount: 3,
    currentBalance: null,
    reason: "play",
    date: "2025-11-02",
    transactionMode: "bid place",
    transType: "withdraw",
    comment: "bid placed",
    uid: "bid_place3921975",
  },
  {
    id: "6",
    userId: "15125",
    cAmount: 3,
    credit: 600,
    debit: null,
    finalAmount: 603,
    currentBalance: null,
    reason: "add gateway",
    date: "2025-11-02",
    transactionMode: "Add By UPI",
    transType: "add",
    comment: "Add Money by UPI",
    uid: "1890016331429",
  },
  {
    id: "7",
    userId: "15125",
    cAmount: 603,
    credit: null,
    debit: 11,
    finalAmount: 592,
    currentBalance: null,
    reason: "play",
    date: "2025-11-02",
    transactionMode: "bid place",
    transType: "withdraw",
    comment: "bid placed",
    uid: "bid_place3927514",
  },
];

// Mock bid records data based on the screenshots
const mockBidRecords: BidRecord[] = [
  {
    id: "1",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "1",
    playBidAmount: 75,
    gamePlayType: "Single Ank",
    openClose: "open",
    gameStyleType: "matka",
    playTime: "10:30:00",
    tVia: "gateway",
  },
  {
    id: "2",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "2",
    playBidAmount: 75,
    gamePlayType: "Single Ank",
    openClose: "open",
    gameStyleType: "matka",
    playTime: "10:30:00",
    tVia: "",
  },
  {
    id: "3",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "3",
    playBidAmount: 75,
    gamePlayType: "Single Ank",
    openClose: "open",
    gameStyleType: "matka",
    playTime: "10:30:00",
    tVia: "",
  },
  {
    id: "4",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "0",
    playBidAmount: 75,
    gamePlayType: "Single Ank",
    openClose: "open",
    gameStyleType: "matka",
    playTime: "10:30:00",
    tVia: "",
  },
  {
    id: "5",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "112",
    playBidAmount: 11,
    gamePlayType: "Double Pana",
    openClose: "close",
    gameStyleType: "matka",
    playTime: "11:00:00",
    tVia: "gateway",
  },
  {
    id: "6",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "113",
    playBidAmount: 11,
    gamePlayType: "Double Pana",
    openClose: "close",
    gameStyleType: "matka",
    playTime: "11:00:00",
    tVia: "",
  },
  {
    id: "7",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "115",
    playBidAmount: 11,
    gamePlayType: "Double Pana",
    openClose: "close",
    gameStyleType: "matka",
    playTime: "11:00:00",
    tVia: "",
  },
  {
    id: "8",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "122",
    playBidAmount: 11,
    gamePlayType: "Double Pana",
    openClose: "close",
    gameStyleType: "matka",
    playTime: "11:00:00",
    tVia: "",
  },
  {
    id: "9",
    resultId: "",
    gameName: "SRIDEVI",
    bidPlayDigit: "133",
    playBidAmount: 11,
    gamePlayType: "Double Pana",
    openClose: "close",
    gameStyleType: "matka",
    playTime: "11:00:00",
    tVia: "",
  },
];

export const PlayerFunding = memo(() => {
  const { userId } = useParams<{ userId: string }>();
  const [transactions] = useState<TransactionRecord[]>(mockTransactions);
  const [bidRecords] = useState<BidRecord[]>(mockBidRecords);
  const [financialSummary] = useState(mockFinancialSummary);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);

  const handleRefresh = useCallback(() => {
    console.log("Refreshing data...");
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Summary Cards */}
      <div className="space-y-3 mb-6">
        {/* Total Add Money (UPI) */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-800 text-base">
            <span className="font-bold">Total Add Money (UPI):</span>{" "}
            <span className="text-gray-700">
              {formatCurrency(financialSummary.totalAddMoney)}
            </span>
          </p>
        </div>

        {/* Total Withdrawal */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-800 text-base">
            <span className="font-bold">Total Withdrawal:</span>{" "}
            <span className="text-gray-700">
              {formatCurrency(financialSummary.totalWithdrawal)}
            </span>
          </p>
        </div>

        {/* Total Win Money */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-800 text-base">
            <span className="font-bold">Total Win Money:</span>{" "}
            <span className="text-gray-700">
              {formatCurrency(financialSummary.totalWinMoney)}
            </span>
          </p>
        </div>

        {/* Total Play Amount */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-800 text-base">
            <span className="font-bold">Total Play Amount:</span>{" "}
            <span className="text-gray-700">
              {formatCurrency(financialSummary.totalPlayAmount)}
            </span>
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-orange-400 text-gray-800 text-sm font-bold">
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  User
                  <br />
                  ID
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  C<br />
                  amount
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Credit
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">Debit</th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Final
                  <br />
                  amount
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Current
                  <br />
                  time
                  <br />
                  user
                  <br />
                  balance
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Reason
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">Date</th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Transaction
                  <br />
                  mode
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Trans
                  <br />
                  add
                  <br />
                  withdraw
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Comment
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">UIDs</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-2 text-gray-700">
                    {transaction.userId}
                  </td>
                  <td className="py-3 px-2 text-gray-700">
                    {transaction.cAmount}
                  </td>
                  <td className="py-3 px-2 text-green-600 font-medium">
                    {transaction.credit || ""}
                  </td>
                  <td className="py-3 px-2 text-red-600 font-medium">
                    {transaction.debit || ""}
                  </td>
                  <td className="py-3 px-2 text-gray-700 font-medium">
                    {transaction.finalAmount}
                  </td>
                  <td className="py-3 px-2 text-blue-600 font-medium">
                    {transaction.currentBalance || ""}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {transaction.reason}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {transaction.transactionMode}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`text-sm ${
                        transaction.transType === "add"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.transType}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {transaction.comment}
                  </td>
                  <td className="py-3 px-2 text-gray-500 text-xs">
                    {transaction.uid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bid Records Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-orange-400 text-gray-800 text-sm font-bold">
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Result
                  <br />
                  ID
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Game
                  <br />
                  name
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Bid
                  <br />
                  play
                  <br />
                  digit
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Play
                  <br />
                  bid
                  <br />
                  amount
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Game
                  <br />
                  play
                  <br />
                  type
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Open
                  <br />
                  close
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Game
                  <br />
                  style
                  <br />
                  type
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">
                  Play
                  <br />
                  time
                </th>
                <th className="text-left py-3 px-2 whitespace-nowrap">T via</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bidRecords.map((bid, index) => (
                <tr
                  key={bid.id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="resultId"
                        checked={selectedBidId === bid.id}
                        onChange={() => setSelectedBidId(bid.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{bid.resultId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-700 font-medium">
                    {bid.gameName}
                  </td>
                  <td className="py-3 px-2 text-gray-700">{bid.bidPlayDigit}</td>
                  <td className="py-3 px-2 text-gray-700">
                    {bid.playBidAmount}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {bid.gamePlayType}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {bid.openClose}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {bid.gameStyleType}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {bid.playTime}
                  </td>
                  <td className="py-3 px-2 text-gray-500 text-sm">{bid.tVia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User ID Display */}
      {userId && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          Viewing financial data for User ID: {userId}
        </div>
      )}
    </Layout>
  );
});

PlayerFunding.displayName = "PlayerFunding";
