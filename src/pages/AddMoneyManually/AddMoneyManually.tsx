// Add Money Manually Page - Add funds to a specific user's account

import { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import { useToast } from "../../store/useGlobalStore";
import type { MockUser } from "../../types";
import { userApi } from "../../services/mockApi";

interface AddMoneyHistory {
  id: string;
  username: string;
  date: string;
  time: string;
  message: string;
  amount: number;
}

// Mock history data generator
const generateMockHistory = (username: string): AddMoneyHistory[] => {
  const usernames = [
    "sam9999",
    "chand",
    "Ajay",
    "manuGond",
    "javed",
    "samsamir77",
    username,
  ];
  const dates = ["25-11-2025", "25-11-2025", "25-11-2025"];
  const times = [
    "11:13 PM",
    "10:37 PM",
    "09:48 PM",
    "09:47 PM",
    "09:29 PM",
    "09:24 PM",
    "09:19 PM",
  ];
  const amounts = [520, 6000, 10000, 200, 699, 600, 1000];

  return usernames.slice(0, 7).map((user, idx) => ({
    id: String(idx + 1),
    username: user,
    date: dates[idx % dates.length],
    time: times[idx % times.length],
    message: "",
    amount: amounts[idx % amounts.length],
  }));
};

export const AddMoneyManually = memo(() => {
  const [searchParams] = useSearchParams();
  const { success, error } = useToast();

  const userId = searchParams.get("userId");
  const usernameParam = searchParams.get("username");

  const [user, setUser] = useState<MockUser | null>(null);
  const [username, setUsername] = useState(usernameParam || "");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [history, setHistory] = useState<AddMoneyHistory[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await userApi.getUserById(userId);
          if (response.data) {
            setUser(response.data as unknown as MockUser);
            setUsername(response.data.username);
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Set current date and time
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();

    setSelectedDate(dateStr);
    setTime(timeStr);
  }, []);

  useEffect(() => {
    // Load history and calculate total
    if (username) {
      const mockHistory = generateMockHistory(username);
      setHistory(mockHistory);
      const totalAmount = mockHistory.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      setTotal(totalAmount);
    }
  }, [username]);

  const handleSubmit = async () => {
    if (!username) {
      error("Please enter a username");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      error("Please enter a valid amount");
      return;
    }

    try {
      // Simulate API call to add money
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Add to history
      const newEntry: AddMoneyHistory = {
        id: String(history.length + 1),
        username,
        date: new Date(selectedDate)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
        time,
        message,
        amount: parseFloat(amount),
      };

      setHistory([newEntry, ...history]);
      setTotal(total + parseFloat(amount));

      success(`Successfully added ₹${amount} to ${username}'s account`);

      // Reset form
      setAmount("");
      setMessage("");
    } catch (err) {
      error("Failed to add money");
      console.error(err);
    }
  };

  const handleDateSubmit = () => {
    // Filter history by selected date
    console.log("Filtering by date:", selectedDate);
  };

  return (
    <Layout>
      <BackButton />

      {/* Header */}
      <div className="bg-black rounded-full py-4 mb-4 text-center">
        <h1 className="text-white text-xl font-bold">Add Money Manually</h1>
      </div>

      {/* User Info */}
      {user && (
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-900 font-medium">
            Name - {user.name || user.username}
          </p>
          <p className="text-green-900 font-medium">
            Money - {user.wallet.toFixed(1)}
          </p>
        </div>
      )}

      {/* Form */}
      <div className="bg-green-100 p-4 rounded-lg mb-4 space-y-4">
        {/* Username */}
        <div>
          <label className="block text-gray-800 text-sm font-medium mb-2">
            username
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter username"
              disabled={!!userId}
            />
            {username && (
              <button
                onClick={() => !userId && setUsername("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-gray-800 text-sm font-medium mb-2">
            Time
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="11:18 pm"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-800 text-sm font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-800 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Enter message (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full font-semibold transition-colors"
        >
          Submit
        </button>

        {/* Date Filter */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleDateSubmit}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold transition-colors whitespace-nowrap"
          >
            Date Submit
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="bg-black text-white text-center py-3 rounded-lg mb-4">
        <h2 className="text-lg font-bold">Total :: {total.toLocaleString()}</h2>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  username
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Msg
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {history.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-orange-100" : "bg-green-100"
                  } hover:bg-opacity-80 transition-colors`}
                >
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {item.username}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div>{item.date}</div>
                    <div className="text-xs text-gray-600">{item.time}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.message || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold text-right">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
});

AddMoneyManually.displayName = "AddMoneyManually";
