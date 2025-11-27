// Back Button Component - for navigation

import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

interface BackButtonProps {
  label?: string;
}

export const BackButton = memo(({ label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors mb-3 active:scale-95"
      type="button"
    >
      <MdArrowBack className="w-6 h-6" />
      <span className="text-base font-medium">{label}</span>
    </button>
  );
});

BackButton.displayName = "BackButton";
