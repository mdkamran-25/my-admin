// Add Money History Page - Displays deposit/add money transaction history

import { memo, useState, useCallback, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";
import { exportToPDF } from "../../utils/exportHelpers";
import { useGlobalStore } from "../../store/useGlobalStore";
import type { AddMoneyTransaction } from "../../types";

// Mock data generator
const generateMockAddMoneyTransactions = (): AddMoneyTransaction[] => {
  const methods: Array<"upi" | "gateway" | "gateway-manually" | "manually"> = [
    "upi",
    "gateway",
    "gateway-manually",
    "manually",
  ];
  const usernames = [
    "suchitra123",
    "Bhagatramseth",
    "sharad",
    "kamran",
    "rohit456",
    "anjali789",
    "vikram234",
    "priya567",
  ];
  const statuses: Array<"completed" | "pending" | "rejected"> = [
    "completed",
    "completed",
    "completed",
    "completed",
    "pending",
  ];

  const transactions: AddMoneyTransaction[] = [];
  let id = 1;

  for (let i = 0; i < 150; i++) {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const amount = [199, 203.5, 260.5, 300, 440, 500, 1000][
      Math.floor(Math.random() * 7)
    ];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const date = new Date(2025, 10, 24, 8, 40 + i);
    const dateStr = date.toLocaleDateString("en-GB");
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    transactions.push({
      id: String(id++),
      userId: String(Math.floor(Math.random() * 1000)),
      username,
      phone: `98765${String(43210 + i).slice(-5)}`,
      amount,
      method,
      status,
      transactionId:
        method === "upi"
          ? `UPI${Math.floor(Math.random() * 1000000)}`
          : undefined,
      upiId:
        method === "upi"
          ? `${Math.floor(Math.random() * 10000000000000)}@paytm`
          : undefined,
      note: method.includes("upi") ? `Add By UPI\n${username}` : undefined,
      acceptTime: `${dateStr}\n${timeStr}`,
      createdAt: `${dateStr} ${timeStr}`,
    });
  }

  return transactions;
};

const mockTransactions = generateMockAddMoneyTransactions();

export const AddMoneyHistory = memo(() => {
  const addToast = useGlobalStore((state) => state.addToast);

  const [allTransactions] = useState<AddMoneyTransaction[]>(mockTransactions);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const [filters, setFilters] = useState({
    date: "",
    user: "",
    utrSearch: "",
    method: "",
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, []);

  // Apply filters
  const filteredTransactions = allTransactions.filter((txn) => {
    // Date filter
    if (filters.date) {
      const filterDate = new Date(filters.date).toLocaleDateString("en-GB");
      const txnDate = txn.acceptTime.split("\n")[0];
      if (filterDate !== txnDate) return false;
    }
    // User search filter
    if (filters.user) {
      const searchLower = filters.user.toLowerCase();
      if (!txn.username.toLowerCase().includes(searchLower)) return false;
    }
    // UTR search filter
    if (filters.utrSearch) {
      const searchLower = filters.utrSearch.toLowerCase();
      const matchesUtr = txn.transactionId?.toLowerCase().includes(searchLower);
      const matchesUpi = txn.upiId?.toLowerCase().includes(searchLower);
      if (!matchesUtr && !matchesUpi) return false;
    }
    // Method filter
    if (filters.method) {
      const methodMap: Record<string, string> = {
        all: "",
        upi: "upi",
        gateway: "gateway",
        "gateway-manually": "gateway-manually",
        manually: "manually",
      };
      const targetMethod = methodMap[filters.method];
      if (targetMethod && txn.method !== targetMethod) return false;
    }
    return true;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDateChange = (date: string) => {
    setFilters((prev) => ({ ...prev, date }));
    setCurrentPage(1);
  };

  const handleUserChange = (user: string) => {
    setFilters((prev) => ({ ...prev, user }));
    setCurrentPage(1);
  };

  const handleUtrSearchChange = (utrSearch: string) => {
    setFilters((prev) => ({ ...prev, utrSearch }));
    setCurrentPage(1);
  };

  const handleApplyFilter = () => {
    setCurrentPage(1);
  };

  const handleMethodFilter = (method: string) => {
    setFilters((prev) => ({ ...prev, method }));
    setCurrentPage(1);
  };

  const handleExportPDF = () => {
    const exportData = filteredTransactions.map((txn, idx) => ({
      sn: idx + 1,
      username: txn.username,
      amount: txn.amount,
      method: txn.method,
      time: txn.acceptTime,
    }));
    exportToPDF({
      title: "Add Money History Report",
      filename: "add-money-history",
      data: exportData,
      columns: [
        { header: "SN", dataKey: "sn" },
        { header: "Username", dataKey: "username" },
        { header: "Amount", dataKey: "amount" },
        { header: "Method", dataKey: "method" },
        { header: "Time", dataKey: "time" },
      ],
    });
    addToast({ message: "PDF exported successfully", type: "success" });
  };

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-black text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-bold">Add Money History</h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <input
              type="text"
              value={filters.user}
              onChange={(e) => handleUserChange(e.target.value)}
              placeholder="Search for a user..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={filters.utrSearch}
            onChange={(e) => handleUtrSearchChange(e.target.value)}
            placeholder="UTR Search"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyFilter}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Method Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { value: "all", label: "All" },
          { value: "upi", label: "Upi" },
          { value: "gateway", label: "Gateway" },
          { value: "gateway-manually", label: "Gateway Manually" },
          { value: "manually", label: "Manully" },
        ].map((method) => (
          <button
            key={method.value}
            onClick={() => handleMethodFilter(method.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.method === method.value ||
              (!filters.method && method.value === "all")
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {method.label}
          </button>
        ))}
      </div>

      {/* Export PDF Button */}
      <div className="mb-4">
        <button
          onClick={handleExportPDF}
          className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* Total Banner */}
      <div className="bg-black text-yellow-500 p-3 rounded-lg text-center mb-4">
        <p className="text-xl font-bold">Total: {totalAmount.toFixed(2)}</p>
      </div>

      {/* Loading State */}
      {loading && <TableRowSkeleton count={5} />}

      {/* Empty State */}
      {!loading && paginatedTransactions.length === 0 && (
        <EmptyState message="No transactions found" />
      )}

      {/* Transaction Table - Combined View */}
      {!loading && paginatedTransactions.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {/* Table Header */}
                <div className="bg-orange-500 text-white flex p-2 md:p-3 text-xs md:text-sm font-semibold">
                  <div className="w-[50px] md:w-[60px] text-center shrink-0 px-1">
                    SN
                  </div>
                  <div className="w-[120px] md:w-[150px] text-center shrink-0 px-1">
                    User Detail
                  </div>
                  <div className="w-[100px] md:w-[120px] text-center shrink-0 px-1">
                    Bank Time
                  </div>
                  <div className="w-[100px] md:w-[130px] text-center shrink-0 px-1">
                    Amount
                  </div>
                  <div className="w-[150px] md:w-[180px] text-center shrink-0 px-1">
                    Note
                  </div>
                  <div className="w-20 md:w-[100px] text-center shrink-0 px-1">
                    Change
                  </div>
                  <div className="w-20 md:w-[100px] text-center shrink-0 px-1">
                    Total
                  </div>
                  <div className="w-[100px] md:w-[120px] text-center shrink-0 px-1">
                    Accept Time
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {paginatedTransactions.map((txn, index) => (
                    <div
                      key={txn.id}
                      className="flex p-2 md:p-3 items-center hover:bg-gray-50 transition-colors text-xs md:text-sm"
                    >
                      {/* SN */}
                      <div className="w-[50px] md:w-[60px] text-center font-semibold text-sm md:text-base shrink-0 px-1">
                        {(currentPage - 1) * pageSize + index + 1}
                      </div>

                      {/* User Detail */}
                      <div className="w-[120px] md:w-[150px] text-gray-900 font-medium text-xs md:text-sm truncate shrink-0 px-1">
                        {txn.username}
                      </div>

                      {/* Bank Time */}
                      <div className="w-[100px] md:w-[120px] text-center text-gray-600 text-[10px] md:text-xs whitespace-pre-line leading-tight shrink-0 px-1">
                        {txn.acceptTime}
                      </div>

                      {/* Amount */}
                      <div className="w-[100px] md:w-[130px] shrink-0 px-1">
                        <div
                          className={`text-center font-bold ${
                            txn.method === "gateway"
                              ? "bg-yellow-400 text-black"
                              : "bg-white text-black"
                          } p-1 md:p-2 rounded`}
                        >
                          <div className="text-sm md:text-base">
                            {txn.amount}
                          </div>
                          <div className="text-[9px] md:text-xs text-gray-600 truncate">
                            {txn.method}
                          </div>
                        </div>
                      </div>

                      {/* Note */}
                      <div className="w-[150px] md:w-[180px] text-gray-900 text-[9px] md:text-xs shrink-0 px-1">
                        <div className="truncate">
                          {txn.note || `${txn.method}`}
                        </div>
                        {txn.upiId && (
                          <div className="text-gray-600 mt-0.5 md:mt-1 truncate">
                            {txn.upiId}
                          </div>
                        )}
                      </div>

                      {/* Change */}
                      <div className="w-20 md:w-[100px] text-center shrink-0 px-1">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm">
                          Change
                        </span>
                      </div>

                      {/* Total */}
                      <div className="w-20 md:w-[100px] text-center font-bold text-sm md:text-base shrink-0 px-1">
                        {txn.amount}
                      </div>

                      {/* Accept Time */}
                      <div className="w-[100px] md:w-[120px] text-center text-gray-600 text-[10px] md:text-xs whitespace-pre-line leading-tight shrink-0 px-1">
                        {txn.acceptTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {!loading && paginatedTransactions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredTransactions.length}
          itemsPerPage={pageSize}
        />
      )}
    </Layout>
  );
});

AddMoneyHistory.displayName = "AddMoneyHistory";
