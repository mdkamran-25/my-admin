// User Activity Log Page - displays user activity history with filters

import { memo, useState } from "react";
import { Layout } from "../../components/layout/Layout";

interface ActivityLog {
  id: number;
  phone: string;
  username: string;
  activityType: string;
  details: string;
  timestamp: string;
}

export const ActivityLogs = memo(() => {
  const [selectedDate, setSelectedDate] = useState("2025-11-25");
  const [selectedActivity, setSelectedActivity] = useState("Select Activity");

  // Mock data - replace with API call
  const activityLogs: ActivityLog[] = [
    {
      id: 1,
      phone: "7569946821",
      username: "khan",
      activityType: "Bank Info",
      details:
        "Update bank info Account Holder name: raheemulla Bank Name : Union Bank of India Account number: 175310100140767 IFSC: UBIN0817538",
      timestamp: "user, 2025-11-25 23:25:57",
    },
    {
      id: 2,
      phone: "9866432941",
      username: "ameer",
      activityType: "Bank Info",
      details:
        "Update bank info Account Holder name: Sheikh ameer Basha Bank Name : State Bank of India Account number: 42390022797 IFSC: SBIN0000790",
      timestamp: "user, 2025-11-25 23:23:10",
    },
    {
      id: 3,
      phone: "7350041867",
      username: "sohan",
      activityType: "Bank Info",
      details:
        "Update bank info Account Holder name: Sohan Kumar Bank Name : HDFC Bank Account number: 50100234567890 IFSC: HDFC0001234",
      timestamp: "user, 2025-11-25 22:15:30",
    },
  ];

  const getBackgroundColor = (index: number) => {
    const colors = ["bg-pink-100", "bg-pink-100", "bg-green-100"];
    return colors[index % colors.length];
  };

  return (
    <Layout>
      {/* Title */}
      <div className="bg-gray-900 rounded-full py-4 mb-4 shadow-md">
        <h1 className="text-white text-xl font-bold text-center">
          User Activity Log
        </h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Date */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Activity */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Activity
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Select Activity">Select Activity</option>
              <option value="Bank Info">Bank Info</option>
              <option value="Login">Login</option>
              <option value="Logout">Logout</option>
              <option value="Profile Update">Profile Update</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Log List */}
      <div className="space-y-3">
        {activityLogs.map((log, index) => (
          <div
            key={log.id}
            className={`${getBackgroundColor(index)} rounded-xl p-4 shadow-sm`}
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
                {log.activityType}
              </span>
            </div>

            {/* Details */}
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {log.details}
            </p>

            {/* Timestamp */}
            <p className="text-gray-600 text-sm">{log.timestamp}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
});

ActivityLogs.displayName = "ActivityLogs";
