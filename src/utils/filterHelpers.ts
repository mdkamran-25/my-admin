// Shared filter utilities for consistent filtering across pages

export interface DateFilter {
  startDate: string;
  endDate: string;
}

export interface FilterOptions {
  dateFilter?: DateFilter;
  statusFilter?: string;
  searchQuery?: string;
  gameTypeFilter?: string;
  customFilters?: Record<string, any>;
}

// Parse DD/MM/YYYY date string to Date object
export const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;

  // Handle both "DD/MM/YYYY" and "DD/MM/YYYY HH:MM AM/PM" formats
  const datePart = dateStr.split(" ")[0];
  const parts = datePart.split("/");

  if (parts.length !== 3) return null;

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // JavaScript months are 0-indexed
  const year = parseInt(parts[2]);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  return new Date(year, month, day);
};

// Format Date object to DD/MM/YYYY
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Convert YYYY-MM-DD (input format) to DD/MM/YYYY (display format)
export const convertToDisplayFormat = (dateStr: string): string => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

// Convert DD/MM/YYYY (display format) to YYYY-MM-DD (input format)
export const convertToInputFormat = (dateStr: string): string => {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length !== 3) return "";
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

// Check if date is within range
export const isDateInRange = (
  dateStr: string,
  startDate: string,
  endDate: string
): boolean => {
  const date = parseDate(dateStr);
  if (!date) return false;

  if (startDate) {
    const start = parseDate(startDate);
    if (start && date < start) return false;
  }

  if (endDate) {
    const end = parseDate(endDate);
    if (end && date > end) return false;
  }

  return true;
};

// Generic filter function for arrays
export function applyFilters<T extends Record<string, any>>(
  data: T[],
  options: FilterOptions,
  config: {
    dateField?: keyof T;
    statusField?: keyof T;
    searchFields?: (keyof T)[];
  }
): T[] {
  let filtered = [...data];

  // Apply date filter
  if (options.dateFilter && config.dateField) {
    const { startDate, endDate } = options.dateFilter;
    if (startDate || endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = String(item[config.dateField as keyof T]);
        return isDateInRange(itemDate, startDate, endDate);
      });
    }
  }

  // Apply status filter
  if (options.statusFilter && config.statusField) {
    filtered = filtered.filter(
      (item) =>
        String(item[config.statusField as keyof T]).toLowerCase() ===
        options.statusFilter!.toLowerCase()
    );
  }

  // Apply search filter
  if (
    options.searchQuery &&
    config.searchFields &&
    config.searchFields.length > 0
  ) {
    const query = options.searchQuery.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter((item) =>
        config.searchFields!.some((field) =>
          String(item[field]).toLowerCase().includes(query)
        )
      );
    }
  }

  // Apply custom filters
  if (options.customFilters) {
    Object.entries(options.customFilters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        filtered = filtered.filter(
          (item) =>
            String(item[key]).toLowerCase() === String(value).toLowerCase()
        );
      }
    });
  }

  return filtered;
}

// Get today's date in DD/MM/YYYY format
export const getTodayDate = (): string => {
  return formatDateToDDMMYYYY(new Date());
};

// Get date range (last N days)
export const getDateRange = (days: number): DateFilter => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return {
    startDate: formatDateToDDMMYYYY(startDate),
    endDate: formatDateToDDMMYYYY(endDate),
  };
};

// Get quick date filters
export const getQuickDateFilters = () => {
  return {
    today: {
      startDate: getTodayDate(),
      endDate: getTodayDate(),
    },
    last7Days: getDateRange(7),
    last30Days: getDateRange(30),
    thisMonth: {
      startDate: formatDateToDDMMYYYY(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ),
      endDate: getTodayDate(),
    },
  };
};

// Pagination helper
export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export const paginateData = <T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export const getTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getPaginationInfo = (config: PaginationConfig) => {
  const totalPages = getTotalPages(config.totalItems, config.itemsPerPage);
  const startItem = (config.currentPage - 1) * config.itemsPerPage + 1;
  const endItem = Math.min(
    config.currentPage * config.itemsPerPage,
    config.totalItems
  );

  return {
    totalPages,
    startItem,
    endItem,
    hasNext: config.currentPage < totalPages,
    hasPrev: config.currentPage > 1,
  };
};
