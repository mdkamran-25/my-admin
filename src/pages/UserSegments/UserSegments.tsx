// User Segments Page - Displays filtered user lists (Play Active/Inactive, Block Devices)

import { memo, useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaPhone, FaEye, FaTrash } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { FilterBar } from "../../components/common/FilterBar";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";
import { userApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import {
  RECORDS_PER_BLOCK_OPTIONS,
  USER_SEGMENT_LABELS,
} from "../../constants";
import type { MockUser } from "../../types";
import type { UserSegment } from "../../constants";

export const UserSegments = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const segment = (searchParams.get("segment") || "all") as UserSegment;

  const [allUsers, setAllUsers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerBlock, setRecordsPerBlock] = useState("500");
  const pageSize = parseInt(recordsPerBlock);
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    search: "",
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userApi.getUsers(1, 1000);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Apply segment-specific filtering
  const getSegmentFilteredUsers = (users: MockUser[]) => {
    switch (segment) {
      case "play-active":
        // Users who have played recently (last active < 7 days)
        return users.filter((user) => {
          const lastActive = new Date(user.lastActiveDate);
          const today = new Date();
          const diffDays = Math.ceil(
            (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
          );
          return diffDays <= 7 && user.status === "active";
        });
      case "play-inactive":
        // Users who haven't played recently (last active >= 7 days)
        return users.filter((user) => {
          const lastActive = new Date(user.lastActiveDate);
          const today = new Date();
          const diffDays = Math.ceil(
            (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
          );
          return diffDays > 7;
        });
      case "block-devices":
        // Users with blocked devices
        return users.filter((user) => user.deviceBlocked);
      default:
        return users;
    }
  };

  // Apply filters to get filtered users
  const filteredUsers = getSegmentFilteredUsers(allUsers).filter((user) => {
    // Date filter
    if (filters.date) {
      const filterDate = new Date(filters.date).toLocaleDateString();
      const userDate = new Date(
        user.registrationDate.split(" ")[0]
      ).toLocaleDateString();
      if (filterDate !== userDate) {
        return false;
      }
    }
    // Status filter
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    // Search filter (username or phone)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesUsername = user.username.toLowerCase().includes(searchLower);
      const matchesPhone = user.phone.includes(filters.search);
      if (!matchesUsername && !matchesPhone) {
        return false;
      }
    }
    return true;
  });

  // Calculate pagination for filtered users
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDateChange = (date: string) => {
    setFilters((prev) => ({ ...prev, date }));
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status }));
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setCurrentPage(1);
  };

  const handleRecordsPerBlockChange = (value: string) => {
    setRecordsPerBlock(value);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const exportData = filteredUsers.map((u, idx) => ({
      sn: idx + 1,
      username: u.username,
      phone: u.phone,
      points: u.points,
      registrationDate: u.registrationDate,
      status: u.status,
    }));
    exportToCSV(exportData, `${segment}-users`);
  };

  const handleExportPDF = () => {
    const exportData = filteredUsers.map((u, idx) => ({
      sn: idx + 1,
      username: u.username,
      phone: u.phone,
      points: u.points,
      status: u.status,
    }));
    exportToPDF({
      title: `${USER_SEGMENT_LABELS[segment]} Report`,
      filename: `${segment}-users`,
      data: exportData,
      columns: [
        { header: "SN", dataKey: "sn" },
        { header: "Username", dataKey: "username" },
        { header: "Phone", dataKey: "phone" },
        { header: "Points", dataKey: "points" },
        { header: "Status", dataKey: "status" },
      ],
    });
  };

  const handleViewUser = useCallback(
    (userId: string) => {
      navigate(`/user-profile/${userId}`);
    },
    [navigate]
  );

  const handleDeleteUser = useCallback((username: string) => {
    if (confirm(`Are you sure you want to delete user "${username}"?`)) {
      console.log(`User "${username}" deleted`);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const calculateInactiveDays = (lastActiveDate: string) => {
    const lastActive = new Date(lastActiveDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {USER_SEGMENT_LABELS[segment]}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Total: {filteredUsers.length} users
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        showDateFilter
        dateValue={filters.date}
        onDateChange={handleDateChange}
        dateLabel="Filter by Date"
        showStatusFilter
        statusValue={filters.status}
        onStatusChange={handleStatusChange}
        statusOptions={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        statusLabel="Status"
        showSearchFilter
        searchValue={filters.search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search by username or phone..."
        customFilters={[
          {
            label: "Records per Block",
            value: recordsPerBlock,
            onChange: handleRecordsPerBlockChange,
            options: RECORDS_PER_BLOCK_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label,
            })),
          },
        ]}
      />

      {/* Loading State */}
      {loading && <TableRowSkeleton count={5} />}

      {/* Empty State */}
      {!loading && paginatedUsers.length === 0 && (
        <EmptyState message="No users found" />
      )}

      {/* User Table */}
      {!loading && paginatedUsers.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="bg-blue-600 text-white grid grid-cols-[50px_60px_1fr_80px_120px_80px_100px_80px] gap-2 p-3 text-sm font-semibold">
                  <div className="text-center">SN</div>
                  <div className="text-center">WP</div>
                  <div className="text-center">username</div>
                  <div className="text-center">point</div>
                  <div className="text-center">date</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Inactive Days</div>
                  <div className="text-center">View</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {paginatedUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-[50px_60px_1fr_80px_120px_80px_100px_80px] gap-2 p-3 items-center hover:bg-gray-50 transition-colors text-sm"
                    >
                      {/* SN */}
                      <div className="text-center text-blue-600 font-semibold">
                        {(currentPage - 1) * pageSize + index + 1}
                      </div>

                      {/* WhatsApp */}
                      <div className="flex justify-center">
                        {user.phone && (
                          <a
                            href={`https://wa.me/${user.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <FaPhone className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Username */}
                      <div className="text-gray-900">{user.username}</div>

                      {/* Points */}
                      <div className="text-center text-blue-600 font-medium">
                        {user.points}
                      </div>

                      {/* Date */}
                      <div className="text-center text-gray-600 text-xs">
                        {user.registrationDate}
                      </div>

                      {/* Status */}
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>

                      {/* Inactive Days */}
                      <div className="text-center text-gray-900 font-medium">
                        {calculateInactiveDays(user.lastActiveDate)}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewUser(user.id)}
                          className="text-cyan-500 hover:text-cyan-600"
                        >
                          <FaEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.username)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
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
            totalItems={filteredUsers.length}
            itemsPerPage={pageSize}
          />

          {/* Export Buttons */}
          <div className="mt-4 flex justify-center">
            <ExportButtons
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              disabled={loading || filteredUsers.length === 0}
            />
          </div>
        </>
      )}
    </Layout>
  );
});

UserSegments.displayName = "UserSegments";
