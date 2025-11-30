// Send Notification Modal - Send notifications to specific users

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useToast } from "../../../store/useGlobalStore";

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const SendNotificationModal: React.FC<SendNotificationModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const { success, error } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [viewChecked, setViewChecked] = useState(true);

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

  const handleSendNotification = async () => {
    if (!title.trim()) {
      error("Please enter a title");
      return;
    }
    if (!message.trim()) {
      error("Please enter a message");
      return;
    }

    try {
      // Simulate API call to send notification
      await new Promise((resolve) => setTimeout(resolve, 500));

      success(`Notification sent to ${username} successfully!`);

      // Reset form and close
      setTitle("");
      setMessage("");
      setViewChecked(true);
      onClose();
    } catch (err) {
      error("Failed to send notification");
      console.error(err);
    }
  };

  const handleClose = () => {
    setTitle("");
    setMessage("");
    setViewChecked(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-800">
              Notification Send To {username}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <MdClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* View Checkbox */}
            <div className="flex items-center gap-2">
              <label className="text-gray-800 font-medium text-lg flex items-center gap-2 cursor-pointer">
                View
                <input
                  type="checkbox"
                  checked={viewChecked}
                  onChange={(e) => setViewChecked(e.target.checked)}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Title Input */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                rows={6}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 pb-6 flex gap-3 justify-center">
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors min-w-[120px]"
            >
              Close
            </button>
            <button
              onClick={handleSendNotification}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-colors min-w-[180px]"
            >
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
