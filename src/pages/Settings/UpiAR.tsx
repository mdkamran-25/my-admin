// UPI AR Settings Page - Auto Accept Off UPI

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

interface AutoAcceptOffUpi {
  id: number;
  name: string;
}

export const UpiAR = memo(() => {
  const [upiList, setUpiList] = useState<AutoAcceptOffUpi[]>([]);
  const [newUpi, setNewUpi] = useState("");

  const handleSave = useCallback(() => {
    if (!newUpi.trim()) {
      toast.error("Please enter a UPI name");
      return;
    }

    const newId = Math.max(...upiList.map((u) => u.id), 0) + 1;
    setUpiList((prev) => [...prev, { id: newId, name: newUpi.trim() }]);
    setNewUpi("");
    toast.success(`"${newUpi.trim()}" added to Auto Accept Off UPI list`);
  }, [newUpi, upiList]);

  const handleDelete = useCallback((id: number, name: string) => {
    setUpiList((prev) => prev.filter((upi) => upi.id !== id));
    toast.success(`"${name}" removed from list`);
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
        {/* Add Auto Accept Off UPI Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 italic">
            Add for Auto Accept Off Upi
          </label>
          <input
            type="text"
            value={newUpi}
            onChange={(e) => setNewUpi(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter UPI name"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="mt-3 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            save
          </button>
        </div>

        {/* UPI List */}
        <div className="space-y-3">
          {upiList.map((upi) => (
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

        {upiList.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No Auto Accept Off UPI entries. Add one above.
          </div>
        )}
      </div>
    </Layout>
  );
});

UpiAR.displayName = "UpiAR";
