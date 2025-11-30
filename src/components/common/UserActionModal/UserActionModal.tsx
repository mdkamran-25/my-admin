import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import type { MockUser } from "../../../types";
import { SendNotificationModal } from "../SendNotificationModal";

interface UserActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: MockUser;
}

interface ActionButton {
  label: string;
  onClick: () => void;
  bgColor: string;
  icon?: React.ReactNode;
}

export const UserActionModal: React.FC<UserActionModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAddMoney = () => {
    navigate(`/add-money-manually?userId=${user.id}&username=${user.username}`);
    onClose();
  };

  const handleWithdrawMoney = () => {
    navigate(
      `/withdraw-money-manually?userId=${user.id}&username=${user.username}`
    );
    onClose();
  };

  const handleGameCancel = () => {
    navigate(`/game-cancel?userId=${user.id}&username=${user.username}`);
    onClose();
  };

  const handleProfitLoss = () => {
    navigate(
      `/user-game-profit-loss?userId=${user.id}&username=${user.username}`
    );
    onClose();
  };

  const handleSendNotification = () => {
    setIsNotificationModalOpen(true);
  };

  const handleActivityLogs = () => {
    navigate(`/activity-logs?userId=${user.id}&username=${user.username}`);
    onClose();
  };

  const actions: ActionButton[] = [
    {
      label: "Add money Manually",
      onClick: handleAddMoney,
      bgColor: "bg-green-500 hover:bg-green-600",
    },
    {
      label: "Withdraw money Manually",
      onClick: handleWithdrawMoney,
      bgColor: "bg-red-500 hover:bg-red-600",
    },
    {
      label: "Game Cancel",
      onClick: handleGameCancel,
      bgColor: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      label: "Profit & Loss",
      onClick: handleProfitLoss,
      bgColor: "bg-cyan-500 hover:bg-cyan-600",
    },
    {
      label: "Send Notification",
      onClick: handleSendNotification,
      bgColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "Activity Logs",
      onClick: handleActivityLogs,
      bgColor: "bg-teal-500 hover:bg-teal-600",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Name: {user.name || user.username}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Phone: {user.phone} • Points: {user.points.toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <MdClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="p-6 space-y-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`w-full ${action.bgColor} text-white text-left px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md`}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Close Button */}
          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Send Notification Modal */}
      <SendNotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        username={user.username}
      />
    </>
  );
};
