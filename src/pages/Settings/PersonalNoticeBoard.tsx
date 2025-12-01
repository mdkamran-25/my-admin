// Personal Notice Board Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

interface Notice {
  id: number;
  date: string;
  to: string;
  title: string;
  message: string;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    date: "24-11-2025",
    to: "All",
    title: "Good morning 🌤",
    message: "Withdwal time Morning 9 am to 1 pm Eveing 5.30 pm to 6.30 pm",
  },
  {
    id: 2,
    date: "15-11-2025",
    to: "All",
    title: "All Withdrawal Done ✅",
    message:
      "डिपॉजिट और फास्ट poits एड के लिए paytm का उपयोग करे ( अपने दोस्तो में भी जरूर शेयर कीजिए )",
  },
  {
    id: 3,
    date: "13-11-2025",
    to: "All",
    title: "Important Update 📢",
    message: "New withdrawal timings will be effective from tomorrow.",
  },
];

export const PersonalNoticeBoard = memo(() => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [addType, setAddType] = useState("");
  const [viewNotice, setViewNotice] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(() => {
    if (!addType) {
      toast.error("Please select an add type");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, "0")}-${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;

    const newNotice: Notice = {
      id: Math.max(...notices.map((n) => n.id), 0) + 1,
      date: dateStr,
      to: addType,
      title: title.trim(),
      message: message.trim(),
    };

    setNotices((prev) => [newNotice, ...prev]);
    setAddType("");
    setTitle("");
    setMessage("");
    setViewNotice(false);
    toast.success("Notice added successfully");
  }, [addType, title, message, notices]);

  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Add Notice Form */}
        <div className="bg-white rounded-lg p-4 mb-6">
          {/* Select Add Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Add Type
            </label>
            <select
              value={addType}
              onChange={(e) => setAddType(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="All">All Users</option>
              <option value="VIP">VIP Users</option>
              <option value="New">New Users</option>
              <option value="Active">Active Users</option>
            </select>
          </div>

          {/* View Notice Checkbox */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="viewNotice"
              checked={viewNotice}
              onChange={(e) => setViewNotice(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="viewNotice" className="text-gray-700 font-medium">
              View Notice
            </label>
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Personal Message */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Personal Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter your message..."
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-amber-50 rounded-lg p-4 border-b-2 border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">
                  Date : {notice.date}
                </span>
                <span className="text-gray-700 font-medium">
                  To: {notice.to}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Title : {notice.title}
              </h3>
              <p className="text-gray-700">Msg : {notice.message}</p>
            </div>
          ))}
        </div>

        {notices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No notices yet. Add one above.
          </div>
        )}
      </div>
    </Layout>
  );
});

PersonalNoticeBoard.displayName = "PersonalNoticeBoard";
