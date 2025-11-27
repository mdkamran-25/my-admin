// Toast Notification Component

import { memo, useEffect } from "react";
import { useGlobalStore } from "../../../store/useGlobalStore";

export const ToastContainer = memo(() => {
  const toasts = useGlobalStore((state) => state.toasts);
  const removeToast = useGlobalStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
});

ToastContainer.displayName = "ToastContainer";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const Toast = memo<ToastProps>(({ message, type, onClose }) => {
  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px] animate-slide-in-right`}
      role="alert"
    >
      <span className="text-lg font-bold">{icons[type]}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
});

Toast.displayName = "Toast";
