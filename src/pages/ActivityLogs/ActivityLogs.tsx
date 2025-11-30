// User Activity Log Page - displays user activity history with filters

import { memo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { FilterBar } from "../../components/common/FilterBar";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { ActivityCardSkeleton } from "../../components/common/SkeletonLoaders";
import { activityApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockActivityLog } from "../../types";

export const ActivityLogs = memo(() => {
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const usernameParam = searchParams.get("username");

  const [activityLogs, setActivityLogs] = useState<MockActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [filters, setFilters] = useState({
    date: "",
    activityType: "",
    search: usernameParam || "",
  });

  const fetchActivityLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await activityApi.getActivityLogs(currentPage, pageSize);
      let logs = response.data;

      // Filter by userId if provided in URL params
      if (userIdParam) {
        logs = logs.filter((log) => log.userId === userIdParam);
      }

      setActivityLogs(logs);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, userIdParam]);

  useEffect(() => {
    fetchActivityLogs();
  }, [fetchActivityLogs, filters]);

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

  const handleRefresh = useCallback(() => {
    setCurrentPage(1);
    setFilters({
      date: "",
      activityType: "",
      search: "",
    });
  }, []);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Title */}
      <div className="bg-gray-900 rounded-full py-4 mb-4 shadow-md">
        <h1 className="text-white text-xl font-bold text-center">
          User Activity Log
        </h1>
      </div>

      {/* Filtered User Banner */}
      {usernameParam && (
        <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3 mb-4 rounded">
          <p className="text-blue-800 font-medium">
            Showing activities for:{" "}
            <span className="font-bold">{usernameParam}</span>
          </p>
        </div>
      )}

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
      {loading && <ActivityCardSkeleton count={5} />}

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
                )} rounded-2xl p-5 shadow-md`}
              >
                {/* Username Header */}
                <div className="mb-3">
                  <h2 className="text-gray-900 text-xl font-bold mb-1">
                    Username : {log.username}
                  </h2>
                </div>

                {/* Activity Type */}
                <div className="bg-white rounded-lg p-3 mb-3">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">
                    {log.activity}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {log.device}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {log.ipAddress ? `IP: ${log.ipAddress}` : ""}
                  </p>
                </div>

                {/* Timestamp */}
                <p className="text-gray-600 text-sm">
                  {log.username}, {log.timestamp}
                </p>
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
