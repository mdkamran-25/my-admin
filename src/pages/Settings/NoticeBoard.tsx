// Notice Board Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

export const NoticeBoard = memo(() => {
  const [permanentMessage, setPermanentMessage] = useState(
    `👉 Funting Or Can Game Not Allow (Specialy Arni Side Peoples)
👉If Admin Found Any Cheating, Hacking, Phishing. Admin Has All Rights To Take Necessary Actions To Block The User....`
  );

  const [marqueeMessage, setMarqueeMessage] = useState(
    "Welcome To matka A23 ALL Market On With New Time"
  );

  const handlePermanentSubmit = useCallback(() => {
    if (!permanentMessage.trim()) {
      toast.error("Please enter a permanent message");
      return;
    }
    toast.success("Permanent message updated successfully");
  }, [permanentMessage]);

  const handleMarqueeSubmit = useCallback(() => {
    if (!marqueeMessage.trim()) {
      toast.error("Please enter a marquee message");
      return;
    }
    toast.success("Marquee message updated successfully");
  }, [marqueeMessage]);

  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Notice Board Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Notice Board
        </h1>

        {/* Permanent Message Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Permanent Massage
          </label>
          <textarea
            value={permanentMessage}
            onChange={(e) => setPermanentMessage(e.target.value)}
            rows={6}
            className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
            placeholder="Enter permanent message..."
          />
          <button
            onClick={handlePermanentSubmit}
            className="mt-3 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-6" />

        {/* Marquee Message Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Marquee Massage
          </h2>
          <label className="block text-gray-700 font-medium mb-2">
            Massage
          </label>
          <textarea
            value={marqueeMessage}
            onChange={(e) => setMarqueeMessage(e.target.value)}
            rows={3}
            className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
            placeholder="Enter marquee message..."
          />
          <button
            onClick={handleMarqueeSubmit}
            className="mt-3 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
});

NoticeBoard.displayName = "NoticeBoard";
