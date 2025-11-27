// User List Page - displays list of all users

import { memo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEye, FaTrash } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { ExportButtons } from "../../components/common/ExportButtons";
import { Pagination } from "../../components/common/Pagination";
import { EmptyState } from "../../components/common/EmptyState";
import { TableRowSkeleton } from "../../components/common/SkeletonLoaders";
import { userApi } from "../../services/mockApi";
import { exportToCSV, exportToPDF } from "../../utils/exportHelpers";
import type { MockUser } from "../../services/mockData";

export const UserList = memo(() => {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all users (using a large page size to get all)
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

  // Apply filters to get filtered users
  const filteredUsers = allUsers.filter((user) => {
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

  const handleFilterChange = (newFilters: {
    status: string;
    search: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
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
    exportToCSV(exportData, "user-list");
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
      title: "User List Report",
      filename: "user-list",
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
      // TODO: Implement delete functionality
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

      {/* Filter Section - Simplified */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm">
        <div className="flex gap-3 mb-3">
          <select
            value={filters.status}
            onChange={(e) =>
              handleFilterChange({ ...filters, status: e.target.value })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              handleFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search by username or phone..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
          Deactivate Selected
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">
          Adjust Points
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
          Create Account
        </button>
      </div>

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

UserList.displayName = "UserList";
