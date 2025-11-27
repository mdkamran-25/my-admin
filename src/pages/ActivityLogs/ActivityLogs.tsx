// User Activity Log Page - displays user activity history with filters

import { memo, useState, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { FilterBar } from "../../components/common/FilterBar";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { activityApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockActivityLog } from "../../services/mockData";

export const ActivityLogs = memo(() => {
  const [activityLogs, setActivityLogs] = useState<MockActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [filters, setFilters] = useState({
    date: "",
    activityType: "",
    search: "",
  });

  useEffect(() => {
    fetchActivityLogs();
  }, [currentPage, pageSize, filters]);

  const fetchActivityLogs = async () => {
    setLoading(true);
    try {
      const response = await activityApi.getActivityLogs(currentPage, pageSize);
      // Note: Filtering by date/activityType/search would need to be implemented in activityApi
      // For now, we're using all logs returned from the API
      setActivityLogs(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, activityType: value }));
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    exportToCSV(activityLogs, "activity-logs", [
      "id",
      "username",
      "phone",
      "activity",
      "timestamp",
    ]);
  };

  const handleExportPDF = () => {
    exportToPDF({
      title: "User Activity Logs",
      filename: "activity-logs",
      data: activityLogs,
      columns: [
        { header: "ID", dataKey: "id" },
        { header: "Username", dataKey: "username" },
        { header: "Phone", dataKey: "phone" },
        { header: "Activity", dataKey: "activity" },
        { header: "Timestamp", dataKey: "timestamp" },
      ],
    });
  };

  const getBackgroundColor = (index: number) => {
    const colors = ["bg-pink-100", "bg-blue-100", "bg-green-100"];
    return colors[index % colors.length];
  };

  return (
    <Layout>
      <BackButton />

      {/* Title */}
      <div className="bg-gray-900 rounded-full py-4 mb-4 shadow-md">
        <h1 className="text-white text-xl font-bold text-center">
          User Activity Log
        </h1>
      </div>

      {/* Filter Section */}
      <FilterBar
        showDateFilter
        customFilters={[
          {
            label: "Activity Type",
            value: filters.activityType,
            onChange: handleFilterChange,
            options: [
              { value: "", label: "All Activities" },
              { value: "Bank Info", label: "Bank Info" },
              { value: "Login", label: "Login" },
              { value: "Logout", label: "Logout" },
              { value: "Profile Update", label: "Profile Update" },
              { value: "Withdrawal", label: "Withdrawal" },
              { value: "Deposit", label: "Deposit" },
            ],
          },
        ]}
        showSearchFilter
        searchPlaceholder="Search by username or phone..."
      />

      {/* Loading State */}
      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white shadow-lg p-4 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && activityLogs.length === 0 && (
        <EmptyState message="No activity logs found" />
      )}

      {/* Activity Log List */}
      {!loading && activityLogs.length > 0 && (
        <>
          <div className="space-y-3 mb-4">
            {activityLogs.map((log, index) => (
              <div
                key={log.id}
                className={`${getBackgroundColor(
                  index
                )} rounded-xl p-4 shadow-sm`}
              >
                {/* Header */}
                <div className="mb-3">
                  <h2 className="text-gray-900 text-lg font-bold">
                    ({log.id}) - {log.phone}
                  </h2>
                  <p className="text-gray-800 text-base font-semibold">
                    {log.username}
                  </p>
                </div>

                {/* Activity Type */}
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span className="text-gray-800 font-semibold">
                    {log.activity}
                  </span>
                </div>

                {/* Device & IP */}
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Device: {log.device} | IP: {log.ipAddress}
                </p>

                {/* Timestamp */}
                <p className="text-gray-600 text-sm">{log.timestamp}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={activityLogs.length * totalPages}
            itemsPerPage={pageSize}
          />

          {/* Export Buttons */}
          <div className="mt-4 flex justify-center">
            <ExportButtons
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              disabled={loading || activityLogs.length === 0}
            />
          </div>
        </>
      )}
    </Layout>
  );
});

ActivityLogs.displayName = "ActivityLogs";
