// Deposit Request Page - displays list of deposit requests

import { memo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { RequestCardSkeleton } from "../../components/common/SkeletonLoaders";
import { depositApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockDepositRequest } from "../../types";

export const DepositRequest = memo(() => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [requests, setRequests] = useState<MockDepositRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("depositRequestNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Fetch deposit requests
  const fetchDeposits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await depositApi.getDeposits(currentPage, pageSize);
      setRequests(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch deposits:", error);
      showToastNotification("❌ Failed to load deposit requests");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits]);

  // Apply filters
  const filteredRequests = requests.filter((req) => {
    // Date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const filterDateStr = `${String(filterDate.getDate()).padStart(
        2,
        "0"
      )}/${String(filterDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${filterDate.getFullYear()}`;
      const reqDate = req.requestDate.split(" ")[0];
      if (reqDate !== filterDateStr) return false;
    }

    // Status filter
    if (
      statusFilter &&
      req.status.toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        req.phone.toLowerCase().includes(query) ||
        req.name.toLowerCase().includes(query) ||
        req.username.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Show toast notification
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle Call
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Handle WhatsApp
  const handleWhatsApp = (phone: string, name: string) => {
    const message = `Hello ${name}, regarding your deposit request...`;
    const whatsappUrl = `https://wa.me/+91${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle Copy All
  const handleCopyAll = (request: MockDepositRequest) => {
    const details = `========================
DEPOSIT REQUEST DETAILS
========================

📱 Phone: ${request.phone}
👤 Name: ${request.name}
🆔 Username: ${request.username}
💰 Amount: ${request.amount} Points
💵 Wallet: ${request.wallet}
📅 Request Date: ${request.requestDate}
✅ Status: ${request.status}
💳 Payment Method: ${request.paymentMethod}
🔢 Transaction ID: ${request.transactionId}
${request.upiId ? `📲 UPI ID: ${request.upiId}` : ""}
========================`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(details)
        .then(() => {
          showToastNotification("✅ Details copied to clipboard!");
        })
        .catch(() => {
          fallbackCopy(details);
        });
    } else {
      fallbackCopy(details);
    }
  };

  // Fallback copy method
  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
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
    } catch {
      showToastNotification("❌ Failed to copy details");
    }
  };

  // Handle Save Note
  const handleSaveNote = (requestId: string) => {
    const noteText = notes[requestId] || "";
    if (!noteText.trim()) {
      showToastNotification("⚠️ Please enter a note first");
      return;
    }

    const updatedNotes = { ...notes, [requestId]: noteText };
    setNotes(updatedNotes);
    localStorage.setItem("depositRequestNotes", JSON.stringify(updatedNotes));
    showToastNotification("✅ Note saved successfully!");
  };

  const totalAmount = filteredRequests.reduce(
    (sum, req) => sum + req.amount,
    0
  );

  // Export handlers
  const handleExportCSV = () => {
    const csvData = filteredRequests.map((req) => ({
      Phone: req.phone,
      Name: req.name,
      Username: req.username,
      Amount: req.amount,
      Wallet: req.wallet,
      "Request Date": req.requestDate,
      Status: req.status,
      "Payment Method": req.paymentMethod,
      "Transaction ID": req.transactionId,
      "UPI ID": req.upiId || "N/A",
    }));
    exportToCSV(csvData, "deposit_requests");
    showToastNotification("✅ Exported to CSV");
  };

  const handleRefresh = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleExportPDF = () => {
    const columns = [
      { header: "Phone", dataKey: "phone" },
      { header: "Name", dataKey: "name" },
      { header: "Amount", dataKey: "amount" },
      { header: "Status", dataKey: "status" },
      { header: "Request Date", dataKey: "requestDate" },
      { header: "Payment Method", dataKey: "paymentMethod" },
      { header: "Transaction ID", dataKey: "transactionId" },
    ];
    const data = filteredRequests.map((req) => ({
      phone: req.phone,
      name: req.name,
      amount: req.amount.toString(),
      status: req.status,
      requestDate: req.requestDate,
      paymentMethod: req.paymentMethod,
      transactionId: req.transactionId,
    }));
    exportToPDF({
      title: "Deposit Requests Report",
      filename: "deposit_requests",
      columns,
      data,
    });
    showToastNotification("✅ Exported to PDF");
  };

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-green-600 text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-semibold">Deposit Money Request</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-date-and-time-value]:text-gray-900"
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
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
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

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by phone or name..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Amount Summary */}
      <div className="text-center mb-4">
        <p className="text-gray-700 text-base font-medium">
          Amount : {totalAmount} ({filteredRequests.length})
        </p>
      </div>

      {/* Loading State */}
      {loading && <RequestCardSkeleton count={5} />}

      {/* Empty State */}
      {!loading && filteredRequests.length === 0 && (
        <EmptyState message="No deposit requests found" />
      )}

      {/* Request Cards */}
      {!loading && filteredRequests.length > 0 && (
        <div className="space-y-3 pb-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white border-2 border-green-600 rounded-xl overflow-hidden shadow-sm"
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
                    <p className="text-gray-600 text-sm mb-1">
                      {request.phone}
                    </p>
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
                    <p className="text-gray-600 text-xs mb-1">AMOUNT</p>
                    <p className="text-green-600 text-2xl font-bold">
                      ₹{request.amount}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {request.requestDate}
                    </p>
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === request.id && (
                <div className="bg-green-800 text-white p-4 space-y-4">
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
                    <button
                      onClick={() =>
                        navigate(`/user-profile/${request.userId}`)
                      }
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
                      <span>Deposit Money</span>
                      <span className="bg-green-500 px-3 py-1 rounded text-white font-semibold">
                        ₹ {request.amount}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Username : {request.username}</span>
                      <span>Wallet : {request.wallet}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Request Date : {request.requestDate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Status : {request.status}</span>
                      <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-2 mt-3">
                      <span className="inline-block bg-green-600 px-3 py-1 rounded text-xs">
                        Payment Method : {request.paymentMethod.toUpperCase()}
                      </span>

                      <div className="bg-green-600 px-3 py-1 rounded text-xs inline-block w-full">
                        Transaction ID : {request.transactionId}
                      </div>

                      {request.upiId && (
                        <div className="bg-green-600 px-3 py-1 rounded text-xs inline-block">
                          UPI ID : {request.upiId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="space-y-3 mt-4">
                    <div className="flex gap-2 flex-wrap">
                      <button className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700">
                        Verify Payment
                      </button>
                      <button className="px-4 py-1.5 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600">
                        Processing
                      </button>
                      <button className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600">
                        Pending
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
                    <button className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleWhatsApp(request.phone, request.name)
                      }
                      className="w-12 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
                      title="Send WhatsApp message"
                    >
                      <FaWhatsapp className="w-6 h-6" />
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
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Export Buttons */}
      <div className="mt-4 flex justify-center">
        <ExportButtons
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          disabled={filteredRequests.length === 0 || loading}
        />
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

DepositRequest.displayName = "DepositRequest";
