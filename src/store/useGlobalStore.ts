// Global state management using Zustand

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DateFilter } from "../utils/filterHelpers";

// Toast notification type
export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

// Global store interface
interface GlobalStore {
  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;

  // Global filters (persisted)
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;
  clearDateFilter: () => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Selected items (for bulk actions)
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  clearSelectedItems: () => void;
  toggleItem: (id: string) => void;

  // User preferences
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;

  // Quick filters
  quickFilter: "all" | "today" | "last7days" | "last30days" | "thisMonth";
  setQuickFilter: (
    filter: "all" | "today" | "last7days" | "last30days" | "thisMonth"
  ) => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      // Toast notifications
      toasts: [],
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast = { ...toast, id };
        set((state) => ({ toasts: [...state.toasts, newToast] }));

        // Auto remove after duration
        const duration = toast.duration || 3000;
        setTimeout(() => {
          get().removeToast(id);
        }, duration);
      },
      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },

      // Global filters
      dateFilter: { startDate: "", endDate: "" },
      setDateFilter: (filter) => set({ dateFilter: filter }),
      clearDateFilter: () =>
        set({ dateFilter: { startDate: "", endDate: "" } }),

      // Loading states
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      // Selected items
      selectedItems: [],
      setSelectedItems: (items) => set({ selectedItems: items }),
      clearSelectedItems: () => set({ selectedItems: [] }),
      toggleItem: (id) => {
        const { selectedItems } = get();
        if (selectedItems.includes(id)) {
          set({ selectedItems: selectedItems.filter((item) => item !== id) });
        } else {
          set({ selectedItems: [...selectedItems, id] });
        }
      },

      // User preferences
      itemsPerPage: 10,
      setItemsPerPage: (count) => set({ itemsPerPage: count }),

      // Quick filters
      quickFilter: "all",
      setQuickFilter: (filter) => set({ quickFilter: filter }),
    }),
    {
      name: "admin-panel-storage",
      partialize: (state) => ({
        dateFilter: state.dateFilter,
        itemsPerPage: state.itemsPerPage,
        quickFilter: state.quickFilter,
      }),
    }
  )
);

// Convenience hooks
export const useToast = () => {
  const addToast = useGlobalStore((state) => state.addToast);

  return {
    success: (message: string, duration?: number) =>
      addToast({ message, type: "success", duration }),
    error: (message: string, duration?: number) =>
      addToast({ message, type: "error", duration }),
    warning: (message: string, duration?: number) =>
      addToast({ message, type: "warning", duration }),
    info: (message: string, duration?: number) =>
      addToast({ message, type: "info", duration }),
  };
};
