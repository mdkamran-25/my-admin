// Funding Player Page - search and manage player funding

import { memo, useState, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { FilterBar } from "../../components/common/FilterBar";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { userApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockUser } from "../../services/mockData";

export const FundingPlayer = memo(() => {
  const [players, setPlayers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, [currentPage, searchQuery]);

  const fetchPlayers = async () => {
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
  };

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
    <Layout>
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
      {loading && (
        <div className="bg-white shadow-lg p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && players.length === 0 && (
        <EmptyState message="No players found" />
      )}

      {/* Table Section */}
      {!loading && players.length > 0 && (
        <>
          <div className="bg-white shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Table Header - First Row */}
                <div className="bg-yellow-500 grid grid-cols-2 gap-0 text-sm font-bold text-gray-800">
                  <div className="text-center py-3 border-r border-yellow-600">
                    s.no.
                  </div>
                  <div className="text-center py-3">username</div>
                </div>

                {/* Table Body */}
                <div>
                  {players.map((player, index) => (
                    <div key={player.id}>
                      {/* Player Info Row */}
                      <div className="grid grid-cols-2 gap-0 border-b border-gray-200">
                        <div className="text-center py-4 font-medium text-gray-700 border-r border-gray-200">
                          {(currentPage - 1) * pageSize + index + 1}
                        </div>
                        <div className="text-center py-4">
                          <div className="font-semibold text-gray-800">
                            {player.username}
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {player.phone}
                          </div>
                        </div>
                      </div>

                      {/* Table Header for Actions */}
                      <div className="bg-yellow-500 grid grid-cols-6 gap-0 text-xs font-bold text-gray-800">
                        <div className="text-center py-2 border-r border-yellow-600">
                          Call
                        </div>
                        <div className="text-center py-2 border-r border-yellow-600">
                          WP
                        </div>
                        <div className="text-center py-2 border-r border-yellow-600">
                          Recharge
                        </div>
                        <div className="text-center py-2 border-r border-yellow-600">
                          Withdrawal
                        </div>
                        <div className="text-center py-2 border-r border-yellow-600">
                          Wallet
                        </div>
                        <div className="text-center py-2">View</div>
                      </div>

                      {/* Action Row */}
                      <div className="grid grid-cols-6 gap-0 border-b-4 border-gray-300">
                        {/* Call */}
                        <div className="text-center py-3 border-r border-gray-200">
                          <a
                            href={`tel:${player.phone}`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Call
                          </a>
                        </div>

                        {/* WP */}
                        <div className="text-center py-3 border-r border-gray-200">
                          <a
                            href={`https://wa.me/${player.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                          >
                            Wp
                          </a>
                        </div>

                        {/* Recharge */}
                        <div className="text-center py-3 border-r border-gray-200">
                          <span className="inline-block px-4 py-1.5 rounded bg-green-600 font-bold text-white text-sm">
                            {player.points || 0}
                          </span>
                        </div>

                        {/* Withdrawal */}
                        <div className="text-center py-3 border-r border-gray-200">
                          <span className="inline-block px-4 py-1.5 rounded bg-red-600 font-bold text-white text-sm">
                            {player.inactiveDays || 0}
                          </span>
                        </div>

                        {/* Wallet */}
                        <div className="text-center py-3 border-r border-gray-200">
                          <span className="inline-block px-4 py-1.5 rounded bg-blue-600 font-bold text-white text-sm">
                            {(player.wallet || 0).toFixed(1)}
                          </span>
                        </div>

                        {/* View */}
                        <div className="text-center py-3">
                          <button className="text-gray-600 hover:text-gray-800">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
          <div className="mt-4">
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
