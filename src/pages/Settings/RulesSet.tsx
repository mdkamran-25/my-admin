// Rules Set Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface Rule {
  id: string;
  content: string;
}

export const RulesSet = memo(() => {
  // Dropdown selection
  const [selectedType, setSelectedType] = useState("Add Money");

  // New rule input
  const [newRule, setNewRule] = useState("");

  // Withdraw Money Rules
  const [withdrawRules, setWithdrawRules] = useState<Rule[]>([
    {
      id: "1",
      content:
        "☆ Minimum Withdraw Is 500/- Rs. Maximum Withdraw Unlimited Per Day.",
    },
  ]);

  // Add Money Rules
  const [addMoneyRules, setAddMoneyRules] = useState<Rule[]>([
    {
      id: "1",
      content:
        "🙋 DIRECT PAYMENT FOR PAYTM OR SCAN QR OR PAYTM BY ANY UPI AAP BUT DONT EXIT QR",
    },
  ]);

  // Toast state
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleSave = useCallback(() => {
    if (!newRule.trim()) {
      showToast("Please enter a rule");
      return;
    }

    const newRuleObj: Rule = {
      id: Date.now().toString(),
      content: newRule,
    };

    if (selectedType === "Add Money") {
      setAddMoneyRules((prev) => [...prev, newRuleObj]);
    } else {
      setWithdrawRules((prev) => [...prev, newRuleObj]);
    }

    setNewRule("");
    showToast("Rule saved successfully!");
  }, [newRule, selectedType]);

  const handleUpdate = useCallback(
    (_ruleId: string, _type: "withdraw" | "addMoney") => {
      showToast("Rule updated successfully!");
    },
    []
  );

  const handleDelete = useCallback(
    (ruleId: string, type: "withdraw" | "addMoney") => {
      if (type === "withdraw") {
        setWithdrawRules((prev) => prev.filter((rule) => rule.id !== ruleId));
      } else {
        setAddMoneyRules((prev) => prev.filter((rule) => rule.id !== ruleId));
      }
      showToast("Rule deleted successfully!");
    },
    []
  );

  const handleRefresh = useCallback(() => {
    console.log("Refreshing rules...");
  }, []);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {toast}
        </div>
      )}

      {/* Add New Rule Section */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        {/* Dropdown */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          <option value="Add Money">Add Money</option>
          <option value="Withdraw Money">Withdraw Money</option>
        </select>

        {/* Text Area */}
        <textarea
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Enter new rule..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 min-h-[120px] resize-none"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-8 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>

      {/* Set Rules Withdraw Money */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">
          Set Rules Withdraw Money
        </h2>

        {withdrawRules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {rule.content}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdate(rule.id, "withdraw")}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors text-sm"
              >
                update
              </button>
              <button
                onClick={() => handleDelete(rule.id, "withdraw")}
                className="px-6 py-2 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {withdrawRules.length === 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm text-gray-400 text-center">
            No withdraw rules set
          </div>
        )}
      </div>

      {/* Set Rules Add Money */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">
          Set Rules Add Money
        </h2>

        {addMoneyRules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {rule.content}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdate(rule.id, "addMoney")}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors text-sm"
              >
                update
              </button>
              <button
                onClick={() => handleDelete(rule.id, "addMoney")}
                className="px-6 py-2 bg-red-400 text-white rounded-full font-medium hover:bg-red-500 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {addMoneyRules.length === 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm text-gray-400 text-center">
            No add money rules set
          </div>
        )}
      </div>
    </Layout>
  );
});

RulesSet.displayName = "RulesSet";
