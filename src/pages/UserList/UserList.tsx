// User List Page - displays list of all users

import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEye, FaTrash } from "react-icons/fa";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface User {
  id: string;
  sn: number;
  username: string;
  points: number;
  date: string;
  status: "active" | "inactive";
  inactiveDays: number;
  hasWhatsapp: boolean;
}

export const UserList = memo(() => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLimit, setFilterLimit] = useState("20");

  // Mock data - replace with API call
  const users: User[] = [
    {
      id: "1",
      sn: 1,
      username: "sumit",
      points: 151,
      date: "03/03/2025 06:30 PM",
      status: "active",
      inactiveDays: 116,
      hasWhatsapp: true,
    },
    {
      id: "2",
      sn: 2,
      username: "satys",
      points: 625,
      date: "03/03/2025 06:44 PM",
      status: "active",
      inactiveDays: 63,
      hasWhatsapp: true,
    },
    {
      id: "3",
      sn: 3,
      username: "satya",
      points: 1811.5,
      date: "03/03/2025 06:54 PM",
      status: "active",
      inactiveDays: 14,
      hasWhatsapp: true,
    },
    {
      id: "4",
      sn: 4,
      username: "MOHIT",
      points: 125,
      date: "03/03/2025 07:00 PM",
      status: "active",
      inactiveDays: 103,
      hasWhatsapp: true,
    },
    {
      id: "5",
      sn: 5,
      username: "sultan",
      points: 525,
      date: "03/03/2025 07:11 PM",
      status: "active",
      inactiveDays: 103,
      hasWhatsapp: true,
    },
  ];

  const handleViewUser = useCallback(
    (userId: string) => {
      navigate(`/user-profile/${userId}`);
    },
    [navigate]
  );

  return (
    <Layout>
      <BackButton />

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm">
        <div className="flex gap-3 mb-3">
          <select
            value={filterLimit}
            onChange={(e) => setFilterLimit(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter Search"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
            Deactive
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">
            Point
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
            Create Account
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
              {users.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[50px_60px_1fr_80px_120px_80px_100px_80px] gap-2 p-3 items-center hover:bg-gray-50 transition-colors text-sm"
                >
                  {/* SN */}
                  <div className="text-center text-blue-600 font-semibold">
                    {user.sn}
                  </div>

                  {/* WhatsApp */}
                  <div className="flex justify-center">
                    {user.hasWhatsapp && (
                      <button className="text-blue-500 hover:text-blue-600">
                        <FaPhone className="w-4 h-4" />
                      </button>
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
                    {user.date}
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
                    {user.inactiveDays}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="text-cyan-500 hover:text-cyan-600"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

UserList.displayName = "UserList";
