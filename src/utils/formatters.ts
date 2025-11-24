// Utility functions for formatting data

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-IN").format(num);
};

export const formatCurrency = (
  amount: number,
  decimals: number = 1
): string => {
  return amount.toFixed(decimals);
};

export const getCurrentDate = (): string => {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Get current date in YYYY-MM-DD format for date inputs
 */
export const getDateForInput = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

/**
 * Convert dd/mm/yyyy to YYYY-MM-DD format
 */
export const convertToInputFormat = (dateString: string): string => {
  if (!dateString) return getDateForInput();

  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Convert dd/mm/yyyy to YYYY-MM-DD
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return getDateForInput();
};
