// User Profit Loss List Page - Shows user financial performance data

import { memo, useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";
import type { UserProfitLossData } from "../../types";

// Mock data generator
const generateMockProfitLossData = (): UserProfitLossData[] => {
  const usernames = [
    "Ajay",
    "dev",
    "niranjanvadiyar",
    "mahesh",
    "jamirnajirmujawar",
    "vishal",
    "Surajseth",
    "maahi",
    "Ramachandran",
    "SA1999",
    "ARUNBADHEI",
    "srinivasc",
    "1Aaronjemas47",
  ];

  return usernames.map((username, index) => {
    const play = Math.floor(Math.random() * 100000);
    const win = Math.floor(Math.random() * 150000);
    const profitLoss = win - play;
    const addMoney = Math.floor(Math.random() * 30000);
    const withdrawMoney = Math.floor(Math.random() * 15000);
    const points = Math.floor(Math.random() * 20000);

    return {
      id: String(index + 1),
      sn: index + 1,
      username,
      play,
      win,
      profitLoss,
      addMoney,
      withdrawMoney,
      points,
      userId: String(index + 1),
    };
  });
};

const mockData = generateMockProfitLossData();

export const UserProfitLoss = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date") || "";
  const userIdParam = searchParams.get("userId");
  const usernameParam = searchParams.get("username");

  const [allData] = useState<UserProfitLossData[]>(mockData);
  const [filteredData, setFilteredData] =
    useState<UserProfitLossData[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateParam);

  // Filter data by userId if present in URL params
  useEffect(() => {
    if (userIdParam && usernameParam) {
      const filtered = allData.filter(
        (item) =>
          item.userId === userIdParam ||
          item.username.toLowerCase() === usernameParam.toLowerCase()
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(allData);
    }
  }, [userIdParam, usernameParam, allData]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleViewUser = useCallback(
    (userId: string) => {
      navigate(`/user-profile/${userId}`);
    },
    [navigate]
  );

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const displayDate = selectedDate ? formatDate(selectedDate) : "23/11/2025";

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title Banner */}
      <div className="bg-yellow-400 text-black p-3 rounded-xl text-center shadow-lg mb-4">
        <h1 className="text-xl font-bold">User Profit Loss list</h1>
      </div>

      {/* Filtered User Banner */}
      {usernameParam && (
        <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3 mb-4 rounded">
          <p className="text-blue-800 font-medium">
            Showing data for: <span className="font-bold">{usernameParam}</span>
          </p>
        </div>
      )}

      {/* Date Filter */}
      <div className="mb-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full border-2 border-blue-300 bg-white text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!selectedDate && (
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {displayDate}
            </span>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && <TableRowSkeleton count={5} />}

      {/* Empty State */}
      {!loading && filteredData.length === 0 && (
        <EmptyState message="No data found" />
      )}

      {/* Data Table */}
      {!loading && filteredData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              {/* Table Header */}
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    SN
                  </th>
                  <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold whitespace-nowrap">
                    Username
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    Play
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    Win
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    PL
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    Add
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    Withdraw
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    Point
                  </th>
                  <th className="px-2 py-3 text-center text-xs md:text-sm font-semibold whitespace-nowrap">
                    View
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* SN */}
                    <td className="px-2 py-3 text-center text-blue-600 font-bold text-xs md:text-sm whitespace-nowrap">
                      {item.sn}
                    </td>

                    {/* Username */}
                    <td className="px-2 py-3 text-gray-900 font-medium text-xs md:text-sm whitespace-nowrap">
                      {item.username}
                    </td>

                    {/* Play */}
                    <td className="px-2 py-3 text-center text-gray-900 font-semibold text-xs md:text-sm whitespace-nowrap">
                      {item.play}
                    </td>

                    {/* Win */}
                    <td className="px-2 py-3 text-center text-gray-900 font-semibold text-xs md:text-sm whitespace-nowrap">
                      {item.win}
                    </td>

                    {/* PL */}
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold ${
                          item.profitLoss >= 0
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {item.profitLoss}
                      </span>
                    </td>

                    {/* Add Money */}
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <span className="inline-block bg-green-500 text-white font-bold px-2 md:px-3 py-1 rounded text-xs">
                        {item.addMoney.toFixed(2)}
                      </span>
                    </td>

                    {/* Withdraw */}
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <span className="inline-block bg-red-500 text-white font-bold px-2 md:px-3 py-1 rounded text-xs">
                        {item.withdrawMoney}
                      </span>
                    </td>

                    {/* Points */}
                    <td className="px-2 py-3 text-center text-blue-600 font-semibold text-xs md:text-sm whitespace-nowrap">
                      {item.points.toFixed(2)}
                    </td>

                    {/* View */}
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <button
                        className="text-cyan-500 hover:text-cyan-600"
                        onClick={() => handleViewUser(item.userId)}
                      >
                        <FaEye className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
});

UserProfitLoss.displayName = "UserProfitLoss";
