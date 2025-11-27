// Withdraw Request Page - displays list of withdrawal requests

import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface WithdrawRequestDetails {
  id: string;
  phone: string;
  name: string;
  amount: number;
  wallet: number;
  username: string;
  requestDate: string;
  status: string;
  type: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
}

export const WithdrawRequest = memo(() => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  // Mock data - replace with API call
  const requests: WithdrawRequestDetails[] = [
    {
      id: "1",
      phone: "7974937487",
      name: "sonu",
      amount: 1300,
      wallet: 0.5,
      username: "sonu",
      requestDate: "24/11/2025 09:02 AM",
      status: "Pending",
      type: "bank",
      accountName: "SHAKUN",
      bankName: "BANK OF MAHARASHTRA",
      accountNumber: "60050885054",
      ifsc: "MAHB0000545",
    },
    {
      id: "2",
      phone: "7028323333",
      name: "Akshay",
      amount: 2700,
      wallet: 1.2,
      username: "Akshay",
      requestDate: "24/11/2025 09:15 AM",
      status: "Pending",
      type: "bank",
      accountName: "AKSHAY KUMAR",
      bankName: "STATE BANK OF INDIA",
      accountNumber: "12345678901",
      ifsc: "SBIN0001234",
    },
    {
      id: "3",
      phone: "9111358966",
      name: "Niru",
      amount: 800,
      wallet: 0.3,
      username: "Niru",
      requestDate: "24/11/2025 08:45 AM",
      status: "Pending",
      type: "bank",
      accountName: "NIRU SHARMA",
      bankName: "HDFC BANK",
      accountNumber: "98765432101",
      ifsc: "HDFC0009876",
    },
    {
      id: "4",
      phone: "9844297629",
      name: "EDIGA",
      amount: 3800,
      wallet: 2.1,
      username: "EDIGA",
      requestDate: "24/11/2025 10:30 AM",
      status: "Pending",
      type: "bank",
      accountName: "EDIGA REDDY",
      bankName: "ICICI BANK",
      accountNumber: "11223344556",
      ifsc: "ICIC0001122",
    },
    {
      id: "5",
      phone: "8806530672",
      name: "umeshvasave",
      amount: 1000,
      wallet: 0.8,
      username: "umeshvasave",
      requestDate: "24/11/2025 11:00 AM",
      status: "Pending",
      type: "bank",
      accountName: "UMESH VASAVE",
      bankName: "AXIS BANK",
      accountNumber: "55667788990",
      ifsc: "UTIB0005566",
    },
    {
      id: "6",
      phone: "8806530672",
      name: "umeshvasave",
      amount: 1000,
      wallet: 0.8,
      username: "umeshvasave",
      requestDate: "24/11/2025 11:05 AM",
      status: "Pending",
      type: "bank",
      accountName: "UMESH VASAVE",
      bankName: "AXIS BANK",
      accountNumber: "55667788990",
      ifsc: "UTIB0005566",
    },
    {
      id: "7",
      phone: "8462803088",
      name: "brajlal",
      amount: 500,
      wallet: 0.2,
      username: "brajlal",
      requestDate: "24/11/2025 09:30 AM",
      status: "Pending",
      type: "bank",
      accountName: "BRAJLAL SINGH",
      bankName: "PUNJAB NATIONAL BANK",
      accountNumber: "22334455667",
      ifsc: "PUNB0223344",
    },
    {
      id: "8",
      phone: "7709744817",
      name: "santosh",
      amount: 600,
      wallet: 0.4,
      username: "santosh",
      requestDate: "24/11/2025 10:00 AM",
      status: "Pending",
      type: "bank",
      accountName: "SANTOSH KUMAR",
      bankName: "UNION BANK",
      accountNumber: "33445566778",
      ifsc: "UBIN0333445",
    },
    {
      id: "9",
      phone: "9712581651",
      name: "mahendra",
      amount: 2000,
      wallet: 1.5,
      username: "mahendra",
      requestDate: "24/11/2025 08:30 AM",
      status: "Pending",
      type: "bank",
      accountName: "MAHENDRA PATEL",
      bankName: "KOTAK BANK",
      accountNumber: "44556677889",
      ifsc: "KKBK0004455",
    },
    {
      id: "10",
      phone: "7000337909",
      name: "KiaaraHemchandra",
      amount: 2750,
      wallet: 1.8,
      username: "KiaaraHemchandra",
      requestDate: "24/11/2025 09:45 AM",
      status: "Pending",
      type: "bank",
      accountName: "KIAARA HEMCHANDRA",
      bankName: "YES BANK",
      accountNumber: "66778899001",
      ifsc: "YESB0006677",
    },
    {
      id: "11",
      phone: "9948624331",
      name: "nani",
      amount: 1100,
      wallet: 0.9,
      username: "nani",
      requestDate: "24/11/2025 10:15 AM",
      status: "Pending",
      type: "bank",
      accountName: "NANI REDDY",
      bankName: "CANARA BANK",
      accountNumber: "77889900112",
      ifsc: "CNRB0007788",
    },
    {
      id: "12",
      phone: "6372992080",
      name: "LAKESHbagarty",
      amount: 1000,
      wallet: 0.7,
      username: "LAKESHbagarty",
      requestDate: "24/11/2025 11:20 AM",
      status: "Pending",
      type: "bank",
      accountName: "LAKESH BAGARTY",
      bankName: "IDBI BANK",
      accountNumber: "88990011223",
      ifsc: "IBKL0008899",
    },
  ];

  const totalAmount = requests.reduce((sum, req) => sum + req.amount, 0);

  const handleFilter = () => {
    console.log("Filtering:", { dateFilter, statusFilter, searchQuery });
  };

  return (
    <Layout>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-black text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-semibold">Withdraw Money Request</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-date-and-time-value]:text-gray-900"
            style={!dateFilter ? { color: "transparent" } : {}}
          />
          {!dateFilter && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              Date
            </span>
          )}
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search"
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFilter}
          className="px-8 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
        >
          Filter
        </button>
      </div>

      {/* Amount Summary */}
      <div className="text-center mb-4">
        <p className="text-gray-700 text-base font-medium">
          Amount : {totalAmount} ({requests.length})
        </p>
      </div>

      {/* Request Cards */}
      <div className="space-y-3 pb-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border-2 border-blue-800 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Main Card - Clickable */}
            <button
              onClick={() =>
                setExpandedId(expandedId === request.id ? null : request.id)
              }
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm mb-1">{request.phone}</p>
                  <p className="text-gray-900 text-lg font-bold">
                    {request.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-xs mb-1">POINT</p>
                  <p className="text-gray-900 text-2xl font-bold">
                    {request.amount}
                  </p>
                </div>
              </div>
            </button>

            {/* Expanded Details */}
            {expandedId === request.id && (
              <div className="bg-blue-900 text-white p-4 space-y-4">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button className="px-4 py-1.5 bg-cyan-500 text-white rounded-full text-sm font-medium hover:bg-cyan-600">
                    Transaction
                  </button>
                  <button className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600">
                    Call
                  </button>
                  <button className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600">
                    QR Msg
                  </button>
                  <button
                    onClick={() => navigate(`/user-profile/${request.id}`)}
                    className="px-4 py-1.5 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600"
                  >
                    Profile
                  </button>
                </div>

                <button className="px-4 py-1.5 bg-cyan-400 text-white rounded-full text-sm font-medium hover:bg-cyan-500">
                  Copy All
                </button>

                {/* Details Grid */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Withdrawal Money</span>
                    <span className="bg-green-500 px-3 py-1 rounded text-white font-semibold">
                      Point : {request.amount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Username : {request.username}</span>
                    <span>Wallet : {request.wallet}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Request Date : {request.requestDate}</span>
                    <span>Type : {request.type}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Status : {request.status}</span>
                    <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                  </div>

                  {/* Bank Details */}
                  <div className="space-y-2 mt-3">
                    <span className="inline-block bg-blue-600 px-3 py-1 rounded text-xs">
                      Name : {request.accountName}
                    </span>

                    <div className="bg-blue-600 px-3 py-1 rounded text-xs inline-block w-full">
                      Bank : {request.bankName}
                    </div>

                    <div className="flex gap-2">
                      <span className="bg-blue-600 px-3 py-1 rounded text-xs">
                        A/c : {request.accountNumber}
                      </span>
                      <span className="bg-blue-600 px-3 py-1 rounded text-xs">
                        IFSC : {request.ifsc}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="space-y-3 mt-4">
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700">
                      Send Request
                    </button>
                    <button className="px-4 py-1.5 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600">
                      Processing
                    </button>
                    <button className="px-4 py-1.5 bg-pink-500 text-white rounded-full text-sm font-medium hover:bg-pink-600">
                      Attempt
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button className="px-4 py-1.5 bg-gray-700 text-white rounded-full text-sm font-medium hover:bg-gray-800">
                      Manual
                    </button>
                    <button className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600">
                      Pending
                    </button>
                    <button className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600">
                      Wrong Detail
                    </button>
                  </div>

                  <button className="px-6 py-1.5 bg-gray-300 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-400 mx-auto block">
                    Reset
                  </button>
                </div>

                {/* Note Section */}
                <div className="mt-4">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full p-3 rounded-lg bg-white text-gray-800 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button className="w-full mt-2 py-2.5 bg-cyan-400 text-white rounded-lg font-semibold hover:bg-cyan-500">
                    Save Note
                  </button>
                </div>

                {/* Final Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    Accepted
                  </button>

                  <button className="w-12 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6" />
                  </button>

                  <button className="w-12 h-10 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                    </svg>
                  </button>

                  <button className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Rejected
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
});

WithdrawRequest.displayName = "WithdrawRequest";
