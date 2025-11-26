// Settings Modal Component - Popup with various settings options

import { memo, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SettingOption {
  label: string;
  path: string;
}

const settingsOptions: SettingOption[] = [
  { label: "Profile", path: "/settings/profile" },
  { label: "Game On Off", path: "/settings/game-on-off" },
  { label: "Game On Off Starline", path: "/settings/game-on-off-starline" },
  { label: "Rules Set", path: "/settings/rules-set" },
  { label: "Block Upi", path: "/settings/block-upi" },
  { label: "Upi AR", path: "/settings/upi-ar" },
  { label: "Notice Board", path: "/settings/notice-board" },
  { label: "Personal Notice Board", path: "/settings/personal-notice-board" },
  { label: "Video", path: "/settings/video" },
  { label: "Block Device List", path: "/settings/block-device-list" },
  { label: "Game Rate", path: "/settings/game-rate" },
  { label: "All Result", path: "/settings/all-result" },
];

export const SettingsModal = memo(({ isOpen, onClose }: SettingsModalProps) => {
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const handleOptionClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close settings"
            >
              <MdClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)] px-4 py-2">
            <div className="space-y-2 pb-4">
              {settingsOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.path)}
                  className="w-full text-center py-4 px-6 bg-white hover:bg-gray-50 text-blue-600 font-medium text-base rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

SettingsModal.displayName = "SettingsModal";
