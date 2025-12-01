// Withdraw Money History Page - Shows withdrawal transaction history

import { memo, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";

interface WithdrawTransaction {
  id: string;
  sn: number;
  username: string;
  date: string;
  time: string;
  requestDate: string;
  requestTime: string;
  amount: number;
  type: "request" | "manually";
}

// Mock data matching screenshot
const mockData: WithdrawTransaction[] = [
  {
    id: "1",
    sn: 1,
    username: "chand",
    date: "A-25-11-2025",
    time: "06:41 PM",
    requestDate: "25-11-2025",
    requestTime: "06:29 PM",
    amount: 1000,
    type: "request",
  },
  {
    id: "2",
    sn: 2,
    username: "raja",
    date: "A-25-11-2025",
    time: "06:36 PM",
    requestDate: "25-11-2025",
    requestTime: "06:22 PM",
    amount: 2000,
    type: "request",
  },
  {
    id: "3",
    sn: 3,
    username: "bilal",
    date: "A-25-11-2025",
    time: "06:54 PM",
    requestDate: "25-11-2025",
    requestTime: "06:20 PM",
    amount: 1500,
    type: "request",
  },
  {
    id: "4",
    sn: 4,
    username: "mdjani",
    date: "A-25-11-2025",
    time: "06:49 PM",
    requestDate: "25-11-2025",
    requestTime: "06:19 PM",
    amount: 500,
    type: "request",
  },
  {
    id: "5",
    sn: 5,
    username: "Ajay",
    date: "A-25-11-2025",
    time: "05:30 PM",
    requestDate: "25-11-2025",
    requestTime: "05:15 PM",
    amount: 3000,
    type: "manually",
  },
  {
    id: "6",
    sn: 6,
    username: "kumar",
    date: "A-25-11-2025",
    time: "04:20 PM",
    requestDate: "25-11-2025",
    requestTime: "04:10 PM",
    amount: 2500,
    type: "request",
  },
  {
    id: "7",
    sn: 7,
    username: "Rahul",
    date: "A-24-11-2025",
    time: "11:45 AM",
    requestDate: "24-11-2025",
    requestTime: "11:30 AM",
    amount: 5000,
    type: "manually",
  },
  {
    id: "8",
    sn: 8,
    username: "Priya",
    date: "A-24-11-2025",
    time: "10:30 AM",
    requestDate: "24-11-2025",
    requestTime: "10:15 AM",
    amount: 1200,
    type: "request",
  },
];

export const WithdrawMoneyHistory = memo(() => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date") || "";

  const [allData] = useState<WithdrawTransaction[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const [filters, setFilters] = useState({
    date: dateParam,
    search: "",
    type: "all",
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, []);

  // Apply filters
  const filteredData = allData.filter((txn) => {
    // Date filter
    if (filters.date) {
      const [year, month, day] = filters.date.split("-");
      const filterDateStr = `A-${day}-${month}-${year}`;
      if (!txn.date.includes(filterDateStr)) return false;
    }
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!txn.username.toLowerCase().includes(searchLower)) return false;
    }
    // Type filter
    if (filters.type !== "all") {
      if (txn.type !== filters.type) return false;
    }
    return true;
  });

  const totalAmount = filteredData.reduce((sum, txn) => sum + txn.amount, 0);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "24/11/2025";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const displayDate = filters.date ? formatDate(filters.date) : "25/11/2025";

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-black text-white p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-bold">Withdraw Money History</h1>
      </div>

      {/* Filter Section */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Date */}
          <div className="relative">
            {!filters.date && (
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">
                {displayDate}
              </span>
            )}
            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, date: e.target.value }))
              }
              className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                !filters.date ? "text-transparent" : "text-gray-600"
              }`}
            />
          </div>

          {/* Search */}
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search for a ..."
            className="px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Filter Label */}
        <div className="mb-2">
          <span className="inline-block px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium">
            Filter
          </span>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { value: "all", label: "All" },
            { value: "request", label: "Request" },
            { value: "manually", label: "Manually" },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => {
                setFilters((prev) => ({ ...prev, type: type.value }));
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors"
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Total Banner */}
      <div className="bg-black text-yellow-500 p-3 rounded-lg text-center mb-4">
        <p className="text-xl font-bold">Total: {totalAmount}</p>
      </div>

      {/* Loading State */}
      {loading && <TableRowSkeleton count={5} />}

      {/* Empty State */}
      {!loading && paginatedData.length === 0 && (
        <EmptyState message="No transactions found" />
      )}

      {/* Transaction Table */}
      {!loading && paginatedData.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                {/* Table Header */}
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-3 py-3 text-center text-sm font-semibold whitespace-nowrap">
                      User
                      <br />
                      Detail
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-semibold whitespace-nowrap">
                      Date
                      <br />
                      Time
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-semibold whitespace-nowrap">
                      Amount
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((txn) => (
                    <tr
                      key={txn.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* User Detail */}
                      <td className="px-3 py-4 text-center whitespace-nowrap">
                        <div className="font-semibold text-gray-900">
                          {txn.sn}
                        </div>
                        <div className="text-sm text-gray-600">
                          {txn.username}
                        </div>
                      </td>

                      {/* Date Time */}
                      <td className="px-3 py-4 text-center whitespace-nowrap">
                        <div className="text-sm text-green-600 font-medium">
                          {txn.date}
                        </div>
                        <div className="text-sm text-green-600">{txn.time}</div>
                        <div className="text-sm text-gray-600">
                          {txn.requestDate}
                        </div>
                        <div className="text-sm text-gray-600">
                          {txn.requestTime}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-3 py-4 text-center whitespace-nowrap">
                        <div className="font-bold text-lg text-gray-900">
                          {txn.amount}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredData.length}
            itemsPerPage={pageSize}
          />
        </>
      )}
    </Layout>
  );
});

WithdrawMoneyHistory.displayName = "WithdrawMoneyHistory";
