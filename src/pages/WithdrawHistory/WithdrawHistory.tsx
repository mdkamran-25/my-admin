// Withdraw History Page - displays approved and rejected withdrawal history

import { memo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { RequestCardSkeleton } from "../../components/common/SkeletonLoaders";
import { withdrawalApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockWithdrawRequest } from "../../services/mockData";

export const WithdrawHistory = memo(() => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [requests, setRequests] = useState<MockWithdrawRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Fetch withdrawal history (only Approved and Rejected)
  const fetchWithdrawalHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await withdrawalApi.getWithdrawals(1, 1000); // Get all for filtering
      // Filter only Approved and Rejected
      const historyRequests = response.data.filter(
        (req) => req.status === "Approved" || req.status === "Rejected"
      );
      setRequests(historyRequests);
      setTotalPages(Math.ceil(historyRequests.length / pageSize));
    } catch (error) {
      console.error("Failed to fetch withdrawal history:", error);
      showToastNotification("❌ Failed to load withdrawal history");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const handleRefresh = useCallback(() => {
    setCurrentPage(1);
    fetchWithdrawalHistory();
  }, [fetchWithdrawalHistory]);

  useEffect(() => {
    fetchWithdrawalHistory();
  }, [fetchWithdrawalHistory]);

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

    // Status filter (only Approved or Rejected)
    if (statusFilter) {
      if (req.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
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

  // Paginate filtered results
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Recalculate total pages when filters change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredRequests.length / pageSize) || 1);
    setCurrentPage(1);
  }, [dateFilter, statusFilter, searchQuery, filteredRequests.length]);

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
    const message = `Hello ${name}, regarding your withdrawal...`;
    const whatsappUrl = `https://wa.me/+91${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle Copy All
  const handleCopyAll = (request: MockWithdrawRequest) => {
    const details = `========================
WITHDRAWAL HISTORY DETAILS
========================

📱 Phone: ${request.phone}
👤 Name: ${request.name}
🆔 Username: ${request.username}
💰 Amount: ${request.amount} Points
💵 Wallet: ${request.wallet}
📅 Request Date: ${request.requestDate}
✅ Status: ${request.status}
🏦 Bank: ${request.bankName}
📝 Account Name: ${request.accountName}
🔢 Account Number: ${request.accountNumber}
🔐 IFSC: ${request.ifsc}
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

  const totalAmount = filteredRequests.reduce(
    (sum, req) => sum + req.amount,
    0
  );

  const approvedCount = filteredRequests.filter(
    (r) => r.status === "Approved"
  ).length;
  const rejectedCount = filteredRequests.filter(
    (r) => r.status === "Rejected"
  ).length;

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
      "Bank Name": req.bankName,
      "Account Name": req.accountName,
      "Account Number": req.accountNumber,
      IFSC: req.ifsc,
      "UPI ID": req.upiId || "N/A",
    }));
    exportToCSV(csvData, "withdraw_history");
    showToastNotification("✅ Exported to CSV");
  };

  const handleExportPDF = () => {
    const columns = [
      { header: "Phone", dataKey: "phone" },
      { header: "Name", dataKey: "name" },
      { header: "Amount", dataKey: "amount" },
      { header: "Status", dataKey: "status" },
      { header: "Date", dataKey: "requestDate" },
      { header: "Bank", dataKey: "bankName" },
      { header: "Account", dataKey: "accountNumber" },
    ];
    const data = filteredRequests.map((req) => ({
      phone: req.phone,
      name: req.name,
      amount: req.amount.toString(),
      status: req.status,
      requestDate: req.requestDate,
      bankName: req.bankName,
      accountNumber: req.accountNumber,
    }));
    exportToPDF({
      title: "Withdrawal History Report",
      filename: "withdraw_history",
      columns,
      data,
    });
    showToastNotification("✅ Exported to PDF");
  };

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-purple-600 text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-semibold">Withdraw History</h1>
        <p className="text-sm opacity-90 mt-1">Approved & Rejected Requests</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-green-100 border border-green-300 rounded-xl p-3 text-center">
          <p className="text-green-800 text-sm font-medium">Approved</p>
          <p className="text-green-600 text-2xl font-bold">{approvedCount}</p>
        </div>
        <div className="bg-red-100 border border-red-300 rounded-xl p-3 text-center">
          <p className="text-red-800 text-sm font-medium">Rejected</p>
          <p className="text-red-600 text-2xl font-bold">{rejectedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full [&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-date-and-time-value]:text-gray-900"
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
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Status</option>
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
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Amount Summary */}
      <div className="text-center mb-4">
        <p className="text-gray-700 text-base font-medium">
          Total Amount : ₹{totalAmount.toLocaleString()} (
          {filteredRequests.length})
        </p>
      </div>

      {/* Loading State */}
      {loading && <RequestCardSkeleton count={5} />}

      {/* Empty State */}
      {!loading && paginatedRequests.length === 0 && (
        <EmptyState message="No withdrawal history found" />
      )}

      {/* Request Cards */}
      {!loading && paginatedRequests.length > 0 && (
        <div className="space-y-3 pb-6">
          {paginatedRequests.map((request) => (
            <div
              key={request.id}
              className={`bg-white border-2 rounded-xl overflow-hidden shadow-sm ${
                request.status === "Approved"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
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
                    <p className="text-xs mt-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-white ${
                          request.status === "Approved"
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
                    <p
                      className={`text-2xl font-bold ${
                        request.status === "Approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
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
                <div
                  className={`text-white p-4 space-y-4 ${
                    request.status === "Approved"
                      ? "bg-green-800"
                      : "bg-red-800"
                  }`}
                >
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
                      <span>Withdraw Money</span>
                      <span
                        className={`px-3 py-1 rounded text-white font-semibold ${
                          request.status === "Approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
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
                      <div
                        className={`w-6 h-6 rounded-full ${
                          request.status === "Approved"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      ></div>
                    </div>

                    {/* Bank Details */}
                    <div className="space-y-2 mt-3">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs ${
                          request.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        Type : {request.type.toUpperCase()}
                      </span>

                      <div
                        className={`px-3 py-1 rounded text-xs inline-block w-full ${
                          request.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        Bank : {request.bankName}
                      </div>

                      <div
                        className={`px-3 py-1 rounded text-xs inline-block ${
                          request.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        Account Name : {request.accountName}
                      </div>

                      <div
                        className={`px-3 py-1 rounded text-xs inline-block w-full ${
                          request.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        Account Number : {request.accountNumber}
                      </div>

                      <div
                        className={`px-3 py-1 rounded text-xs inline-block ${
                          request.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        IFSC : {request.ifsc}
                      </div>

                      {request.upiId && (
                        <div
                          className={`px-3 py-1 rounded text-xs inline-block ${
                            request.status === "Approved"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          UPI ID : {request.upiId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() =>
                        handleWhatsApp(request.phone, request.name)
                      }
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                      title="Send WhatsApp message"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      WhatsApp
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

WithdrawHistory.displayName = "WithdrawHistory";
