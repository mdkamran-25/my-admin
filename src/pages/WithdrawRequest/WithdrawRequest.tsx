// Withdraw Request Page - displays list of withdrawal requests

import { memo, useState, useEffect } from "react";
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
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [filteredRequests, setFilteredRequests] = useState<
    WithdrawRequestDetails[]
  >([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Mock data - replace with API call
  const requests: WithdrawRequestDetails[] = [
    {
      id: "1",
      phone: "7974937487",
      name: "sonu",
      amount: 1300,
      wallet: 0.5,
      username: "sonu",
      requestDate: "27/11/2025 09:02 AM",
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
      requestDate: "27/11/2025 09:15 AM",
      status: "Approved",
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
      requestDate: "26/11/2025 08:45 AM",
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
      requestDate: "26/11/2025 10:30 AM",
      status: "Rejected",
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
      requestDate: "25/11/2025 11:00 AM",
      status: "Approved",
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
      requestDate: "25/11/2025 11:05 AM",
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
      status: "Approved",
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
      status: "Rejected",
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
      requestDate: "23/11/2025 08:30 AM",
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
      requestDate: "23/11/2025 09:45 AM",
      status: "Approved",
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
      requestDate: "22/11/2025 10:15 AM",
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
      requestDate: "22/11/2025 11:20 AM",
      status: "Rejected",
      type: "bank",
      accountName: "LAKESH BAGARTY",
      bankName: "IDBI BANK",
      accountNumber: "88990011223",
      ifsc: "IBKL0008899",
    },
    {
      id: "13",
      phone: "9876543210",
      name: "Rajesh",
      amount: 1500,
      wallet: 1.0,
      username: "Rajesh",
      requestDate: "27/11/2025 10:30 AM",
      status: "Pending",
      type: "bank",
      accountName: "RAJESH SHARMA",
      bankName: "HDFC BANK",
      accountNumber: "12312312312",
      ifsc: "HDFC0001231",
    },
    {
      id: "14",
      phone: "8765432109",
      name: "Priya",
      amount: 2200,
      wallet: 1.3,
      username: "Priya",
      requestDate: "26/11/2025 02:15 PM",
      status: "Approved",
      type: "bank",
      accountName: "PRIYA SINGH",
      bankName: "SBI",
      accountNumber: "45645645645",
      ifsc: "SBIN0004564",
    },
    {
      id: "15",
      phone: "7654321098",
      name: "Amit",
      amount: 900,
      wallet: 0.6,
      username: "Amit",
      requestDate: "25/11/2025 03:45 PM",
      status: "Rejected",
      type: "bank",
      accountName: "AMIT VERMA",
      bankName: "ICICI BANK",
      accountNumber: "78978978978",
      ifsc: "ICIC0007897",
    },
    {
      id: "16",
      phone: "6543210987",
      name: "Sneha",
      amount: 3200,
      wallet: 2.0,
      username: "Sneha",
      requestDate: "24/11/2025 11:30 AM",
      status: "Pending",
      type: "bank",
      accountName: "SNEHA PATEL",
      bankName: "AXIS BANK",
      accountNumber: "32132132132",
      ifsc: "UTIB0003213",
    },
    {
      id: "17",
      phone: "5432109876",
      name: "Vikram",
      amount: 1800,
      wallet: 1.1,
      username: "Vikram",
      requestDate: "23/11/2025 04:00 PM",
      status: "Approved",
      type: "bank",
      accountName: "VIKRAM SINGH",
      bankName: "KOTAK BANK",
      accountNumber: "65465465465",
      ifsc: "KKBK0006546",
    },
    {
      id: "18",
      phone: "4321098765",
      name: "Pooja",
      amount: 1200,
      wallet: 0.9,
      username: "Pooja",
      requestDate: "22/11/2025 01:20 PM",
      status: "Pending",
      type: "bank",
      accountName: "POOJA REDDY",
      bankName: "CANARA BANK",
      accountNumber: "98798798798",
      ifsc: "CNRB0009879",
    },
    {
      id: "19",
      phone: "3210987654",
      name: "Ramesh",
      amount: 2500,
      wallet: 1.5,
      username: "Ramesh",
      requestDate: "27/11/2025 12:00 PM",
      status: "Rejected",
      type: "bank",
      accountName: "RAMESH KUMAR",
      bankName: "PNB",
      accountNumber: "14714714714",
      ifsc: "PUNB0014714",
    },
    {
      id: "20",
      phone: "2109876543",
      name: "Kavita",
      amount: 1700,
      wallet: 1.2,
      username: "Kavita",
      requestDate: "26/11/2025 05:30 PM",
      status: "Approved",
      type: "bank",
      accountName: "KAVITA SHARMA",
      bankName: "YES BANK",
      accountNumber: "25825825825",
      ifsc: "YESB0002582",
    },
    {
      id: "21",
      phone: "1098765432",
      name: "Suresh",
      amount: 950,
      wallet: 0.7,
      username: "Suresh",
      requestDate: "25/11/2025 09:15 AM",
      status: "Pending",
      type: "bank",
      accountName: "SURESH PATEL",
      bankName: "UNION BANK",
      accountNumber: "36936936936",
      ifsc: "UBIN0036936",
    },
    {
      id: "22",
      phone: "9988776655",
      name: "Anjali",
      amount: 2100,
      wallet: 1.4,
      username: "Anjali",
      requestDate: "24/11/2025 03:00 PM",
      status: "Approved",
      type: "bank",
      accountName: "ANJALI VERMA",
      bankName: "IDBI BANK",
      accountNumber: "74174174174",
      ifsc: "IBKL0007417",
    },
    {
      id: "23",
      phone: "8877665544",
      name: "Deepak",
      amount: 1350,
      wallet: 0.8,
      username: "Deepak",
      requestDate: "23/11/2025 10:45 AM",
      status: "Rejected",
      type: "bank",
      accountName: "DEEPAK SINGH",
      bankName: "BOB",
      accountNumber: "85285285285",
      ifsc: "BARB0085285",
    },
    {
      id: "24",
      phone: "7766554433",
      name: "Meera",
      amount: 2900,
      wallet: 1.9,
      username: "Meera",
      requestDate: "22/11/2025 02:30 PM",
      status: "Pending",
      type: "bank",
      accountName: "MEERA REDDY",
      bankName: "SBI",
      accountNumber: "96396396396",
      ifsc: "SBIN0009639",
    },
    {
      id: "25",
      phone: "6655443322",
      name: "Karan",
      amount: 1600,
      wallet: 1.0,
      username: "Karan",
      requestDate: "27/11/2025 01:45 PM",
      status: "Approved",
      type: "bank",
      accountName: "KARAN SHARMA",
      bankName: "HDFC BANK",
      accountNumber: "15915915915",
      ifsc: "HDFC0015915",
    },
  ];

  // Initialize with all requests
  useEffect(() => {
    setFilteredRequests(requests);
  }, []);

  // Filter logic
  const handleFilter = () => {
    let filtered = [...requests];

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const filterDateStr = `${String(filterDate.getDate()).padStart(
        2,
        "0"
      )}/${String(filterDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${filterDate.getFullYear()}`;

      filtered = filtered.filter((req) => {
        const reqDate = req.requestDate.split(" ")[0]; // Get date part only
        return reqDate === filterDateStr;
      });
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(
        (req) => req.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Filter by search query (phone or name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (req) =>
          req.phone.includes(query) ||
          req.name.toLowerCase().includes(query) ||
          req.username.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
  };

  // Auto-filter when inputs change
  useEffect(() => {
    handleFilter();
  }, [dateFilter, statusFilter, searchQuery]);

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("withdrawRequestNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Show toast notification
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle Call Button - Opens phone dialer
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
    showToastNotification(`Calling ${phone}...`);
  };

  // Handle WhatsApp Button - Opens WhatsApp chat
  const handleWhatsApp = (phone: string, name: string) => {
    // Remove any non-digit characters and ensure country code
    const cleanPhone = phone.replace(/\D/g, "");
    // If phone doesn't start with country code, assume India (+91)
    const whatsappNumber = cleanPhone.startsWith("91")
      ? cleanPhone
      : `91${cleanPhone}`;

    // Optional: Pre-fill message
    const message = encodeURIComponent(
      `Hello ${name}, regarding your withdrawal request...`
    );

    // Open WhatsApp (works on both mobile and desktop)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    showToastNotification(`Opening WhatsApp for ${name}...`);
  };

  // Handle Copy All - Copies all user details to clipboard
  const handleCopyAll = (request: WithdrawRequestDetails) => {
    const details = `WITHDRAWAL REQUEST DETAILS
========================

User Information:
Name: ${request.name}
Username: ${request.username}
Phone: ${request.phone}

Transaction Details:
Amount: ${request.amount}
Wallet: ${request.wallet}
Request Date: ${request.requestDate}
Status: ${request.status}
Type: ${request.type}

Bank Details:
Account Name: ${request.accountName}
Bank Name: ${request.bankName}
Account Number: ${request.accountNumber}
IFSC Code: ${request.ifsc}

========================`;

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(details)
        .then(() => {
          showToastNotification("✅ Details copied to clipboard!");
        })
        .catch((err) => {
          console.error("Clipboard API error:", err);
          fallbackCopy(details);
        });
    } else {
      // Fallback for browsers that don't support clipboard API
      fallbackCopy(details);
    }
  };

  // Fallback copy method using textarea
  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        showToastNotification("✅ Details copied to clipboard!");
      } else {
        showToastNotification("❌ Failed to copy details");
      }
    } catch (err) {
      console.error("Fallback copy error:", err);
      showToastNotification("❌ Failed to copy details");
    }
  };

  // Handle Save Note - Saves note to localStorage
  const handleSaveNote = (requestId: string) => {
    const noteText = notes[requestId] || "";
    if (!noteText.trim()) {
      showToastNotification("⚠️ Please enter a note first");
      return;
    }

    const updatedNotes = { ...notes, [requestId]: noteText };
    setNotes(updatedNotes);
    localStorage.setItem("withdrawRequestNotes", JSON.stringify(updatedNotes));
    showToastNotification("✅ Note saved successfully!");
  };

  const totalAmount = filteredRequests.reduce(
    (sum, req) => sum + req.amount,
    0
  );

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
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
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
          placeholder="Search by phone or name..."
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
          Amount : {totalAmount} ({filteredRequests.length})
        </p>
      </div>

      {/* No Results Message */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No requests found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}

      {/* Request Cards */}
      <div className="space-y-3 pb-6">
        {filteredRequests.map((request) => (
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
                  <p className="text-xs text-gray-500 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-white ${
                        request.status === "Pending"
                          ? "bg-yellow-500"
                          : request.status === "Approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {request.status}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-xs mb-1">POINT</p>
                  <p className="text-gray-900 text-2xl font-bold">
                    {request.amount}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {request.requestDate}
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
                  <button
                    onClick={() => handleCall(request.phone)}
                    className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 flex items-center gap-1"
                  >
                    📞 Call
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

                <button
                  onClick={() => handleCopyAll(request)}
                  className="px-4 py-1.5 bg-cyan-400 text-white rounded-full text-sm font-medium hover:bg-cyan-500 flex items-center gap-1"
                >
                  📋 Copy All
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
                    value={notes[request.id] || ""}
                    onChange={(e) =>
                      setNotes({ ...notes, [request.id]: e.target.value })
                    }
                    placeholder="Add a note for this request..."
                    className="w-full p-3 rounded-lg bg-white text-gray-800 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    onClick={() => handleSaveNote(request.id)}
                    className="w-full mt-2 py-2.5 bg-cyan-400 text-white rounded-lg font-semibold hover:bg-cyan-500 flex items-center justify-center gap-2"
                  >
                    💾 Save Note
                  </button>
                  {notes[request.id] && (
                    <p className="text-xs text-cyan-300 mt-2 text-center">
                      ✓ Note saved in browser
                    </p>
                  )}
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

                  <button
                    onClick={() => handleWhatsApp(request.phone, request.name)}
                    className="w-12 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
                    title="Send WhatsApp message"
                  >
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

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </Layout>
  );
});

WithdrawRequest.displayName = "WithdrawRequest";
