// Game Type Selection Modal - Select game type for bid history

import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface GameTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onSelectGameType: (gameType: "matka" | "starline") => void;
}

export const GameTypeModal: React.FC<GameTypeModalProps> = ({
  isOpen,
  onClose,
  username,
  onSelectGameType,
}) => {
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

  const handleSelectMatka = () => {
    onSelectGameType("matka");
    onClose();
  };

  const handleSelectStarline = () => {
    onSelectGameType("starline");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-800">
              Name : {username}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <MdClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Matka Button */}
            <button
              onClick={handleSelectMatka}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-4 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Matka
            </button>

            {/* Starline & Jackpot Button */}
            <button
              onClick={handleSelectStarline}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-4 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Starline & Jackpot
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
