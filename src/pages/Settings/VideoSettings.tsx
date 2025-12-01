// Video Settings Page - Add Youtube Links

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

interface YoutubeLink {
  id: number;
  heading: string;
  link: string;
  order: number;
}

export const VideoSettings = memo(() => {
  const [links, setLinks] = useState<YoutubeLink[]>([]);
  const [heading, setHeading] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [order, setOrder] = useState("");

  const handleSave = useCallback(() => {
    if (!heading.trim()) {
      toast.error("Please enter a heading");
      return;
    }
    if (!youtubeLink.trim()) {
      toast.error("Please enter a YouTube link");
      return;
    }
    if (!order.trim() || isNaN(Number(order))) {
      toast.error("Please enter a valid order number");
      return;
    }

    const newLink: YoutubeLink = {
      id: Math.max(...links.map((l) => l.id), 0) + 1,
      heading: heading.trim(),
      link: youtubeLink.trim(),
      order: Number(order),
    };

    setLinks((prev) => [...prev, newLink].sort((a, b) => a.order - b.order));
    setHeading("");
    setYoutubeLink("");
    setOrder("");
    toast.success("YouTube link added successfully");
  }, [heading, youtubeLink, order, links]);

  const handleDelete = useCallback((id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    toast.success("YouTube link deleted");
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Add Youtube Links Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3 italic">
            Add Youtube Links
          </label>

          {/* Heading Input */}
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Heading"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />

          {/* YouTube Link Input */}
          <input
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="youtube Link"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />

          {/* Order Input */}
          <input
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="Order"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            save
          </button>
        </div>

        {/* Links List */}
        {links.length > 0 && (
          <div className="space-y-3">
            {links.map((link) => (
              <div key={link.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {link.heading}
                    </h3>
                    <p className="text-blue-500 text-sm break-all mb-1">
                      {link.link}
                    </p>
                    <span className="text-gray-500 text-sm">
                      Order: {link.order}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="px-4 py-1.5 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {links.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No YouTube links added. Add one above.
          </div>
        )}
      </div>
    </Layout>
  );
});

VideoSettings.displayName = "VideoSettings";
