// Funding Player Page - search and manage player funding

import { memo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { FilterBar } from "../../components/common/FilterBar";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";
import { userApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockUser } from "../../services/mockData";

export const FundingPlayer = memo(() => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userApi.getUsers(currentPage, pageSize);
      // Filter by search query on client side
      let filteredData = response.data;
      if (searchQuery) {
        filteredData = response.data.filter(
          (player) =>
            player.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            player.phone.includes(searchQuery)
        );
      }
      setPlayers(filteredData);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch players:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handleRefresh = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleExportCSV = () => {
    exportToCSV(players, "funding-players", [
      "username",
      "phone",
      "points",
      "wallet",
    ]);
  };

  const handleExportPDF = () => {
    exportToPDF({
      title: "Funding Player Report",
      filename: "funding-players",
      data: players,
      columns: [
        { header: "Username", dataKey: "username" },
        { header: "Phone", dataKey: "phone" },
        { header: "Points", dataKey: "points" },
        { header: "Wallet", dataKey: "wallet" },
      ],
    });
  };

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Header */}
      <div className="bg-gray-900 rounded-full py-4 mb-4">
        <h1 className="text-white text-xl font-bold text-center">
          Funding Player
        </h1>
      </div>

      {/* Search Section */}
      <FilterBar
        showSearchFilter
        searchPlaceholder="Search by username or phone..."
        searchValue={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />

      {/* Loading State */}
      {loading && <TableRowSkeleton count={5} />}

      {/* Empty State */}
      {!loading && players.length === 0 && (
        <EmptyState message="No players found" />
      )}

      {/* Table Section */}
      {!loading && players.length > 0 && (
        <>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                {/* Table Header */}
                <thead>
                  <tr className="bg-yellow-500 text-gray-800 text-sm font-bold">
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      S.No.
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      Username
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      Phone
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      Call
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      WP
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      Recharge
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      Withdrawal
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      Wallet
                    </th>
                    <th className="text-center py-3 px-2 whitespace-nowrap">
                      View
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {players.map((player, index) => (
                    <tr
                      key={player.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      {/* S.No. */}
                      <td className="text-center py-3 px-2 font-medium text-gray-700">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>

                      {/* Username */}
                      <td className="text-center py-3 px-2">
                        <span className="font-semibold text-gray-800">
                          {player.username}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="text-center py-3 px-2 text-gray-600 text-sm">
                        {player.phone}
                      </td>

                      {/* Call */}
                      <td className="text-center py-3 px-2">
                        <a
                          href={`tel:${player.phone}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          📞 Call
                        </a>
                      </td>

                      {/* WP */}
                      <td className="text-center py-3 px-2">
                        <a
                          href={`https://wa.me/${player.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          💬 WP
                        </a>
                      </td>

                      {/* Recharge */}
                      <td className="text-center py-3 px-2">
                        <span className="inline-block px-3 py-1 rounded bg-green-600 font-bold text-white text-sm">
                          {player.points || 0}
                        </span>
                      </td>

                      {/* Withdrawal */}
                      <td className="text-center py-3 px-2">
                        <span className="inline-block px-3 py-1 rounded bg-red-600 font-bold text-white text-sm">
                          {player.inactiveDays || 0}
                        </span>
                      </td>

                      {/* Wallet */}
                      <td className="text-center py-3 px-2">
                        <span className="inline-block px-3 py-1 rounded bg-blue-600 font-bold text-white text-sm">
                          {(player.wallet || 0).toFixed(1)}
                        </span>
                      </td>

                      {/* View */}
                      <td className="text-center py-3 px-2">
                        <button
                          onClick={() => navigate(`/user-profile/${player.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg
                            className="w-5 h-5 mx-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
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
            totalItems={players.length * totalPages}
            itemsPerPage={pageSize}
          />

          {/* Export Buttons */}
          <div className="mt-4 flex justify-center">
            <ExportButtons
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              disabled={loading || players.length === 0}
            />
          </div>
        </>
      )}
    </Layout>
  );
});

FundingPlayer.displayName = "FundingPlayer";
