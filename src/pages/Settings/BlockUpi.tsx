// Block UPI Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

interface BlockedUpi {
  id: number;
  name: string;
}

const initialBlockedUpis: BlockedUpi[] = [
  { id: 1, name: "Paytm" },
  { id: 2, name: "Pay tm" },
  { id: 3, name: "पैटीएम" },
  { id: 4, name: "Amazone pay" },
];

export const BlockUpi = memo(() => {
  const [blockedUpis, setBlockedUpis] =
    useState<BlockedUpi[]>(initialBlockedUpis);
  const [newUpi, setNewUpi] = useState("");

  const handleSave = useCallback(() => {
    if (!newUpi.trim()) {
      toast.error("Please enter a UPI name to block");
      return;
    }

    const newId = Math.max(...blockedUpis.map((u) => u.id), 0) + 1;
    setBlockedUpis((prev) => [...prev, { id: newId, name: newUpi.trim() }]);
    setNewUpi("");
    toast.success(`"${newUpi.trim()}" added to blocked UPI list`);
  }, [newUpi, blockedUpis]);

  const handleDelete = useCallback((id: number, name: string) => {
    setBlockedUpis((prev) => prev.filter((upi) => upi.id !== id));
    toast.success(`"${name}" removed from blocked UPI list`);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSave();
      }
    },
    [handleSave]
  );

  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Add Block UPI Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 italic">
            Add Block Upi
          </label>
          <input
            type="text"
            value={newUpi}
            onChange={(e) => setNewUpi(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter UPI name to block"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="mt-3 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            save
          </button>
        </div>

        {/* Blocked UPI List */}
        <div className="space-y-3">
          {blockedUpis.map((upi) => (
            <div
              key={upi.id}
              className="flex items-center justify-between bg-white rounded-full px-6 py-4 shadow-sm"
            >
              <span className="text-gray-800 text-lg">{upi.name}</span>
              <button
                onClick={() => handleDelete(upi.id, upi.name)}
                className="px-4 py-1.5 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {blockedUpis.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No blocked UPI entries. Add one above.
          </div>
        )}
      </div>
    </Layout>
  );
});

BlockUpi.displayName = "BlockUpi";
