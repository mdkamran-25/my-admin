// Utility functions for wallet details filtering and statistics calculation

import type { MockUser } from "../services/mockData";

/**
 * Parse date string in DD/MM/YYYY format to Date object
 */
export const parseDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) return null;
  return new Date(`${year}-${month}-${day}`);
};

/**
 * Format date to DD/MM/YYYY string
 */
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Get today's date in DD/MM/YYYY format
 */
export const getTodayString = (): string => {
  return formatDate(new Date());
};

/**
 * Get yesterday's date in DD/MM/YYYY format
 */
export const getYesterdayString = (): string => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  return formatDate(yesterday);
};

/**
 * Filter users by exact date (DD/MM/YYYY)
 */
export const filterUsersByDate = (
  users: MockUser[],
  date: string
): MockUser[] => {
  return users.filter((user) => user.registrationDate === date);
};

/**
 * Filter users by month and year (MM and YYYY)
 */
export const filterUsersByMonthYear = (
  users: MockUser[],
  month: number,
  year: number
): MockUser[] => {
  const monthStr = String(month).padStart(2, "0");
  return users.filter((user) => {
    const [, userMonth, userYear] = user.registrationDate.split("/");
    return userMonth === monthStr && userYear === String(year);
  });
};

/**
 * Filter users by year only
 */
export const filterUsersByYear = (
  users: MockUser[],
  year: number
): MockUser[] => {
  const yearStr = String(year);
  return users.filter((user) => user.registrationDate.endsWith(yearStr));
};

/**
 * Get users registered in the current week
 */
export const getWeekRegistrations = (users: MockUser[]): MockUser[] => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  return users.filter((user) => {
    const userDate = parseDate(user.registrationDate);
    if (!userDate) return false;
    return userDate >= weekAgo && userDate <= today;
  });
};

/**
 * Get month and year name from month number
 */
export const getMonthName = (month: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1] || "";
};

/**
 * Get month number from month name
 */
export const getMonthNumber = (monthName: string): number => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.indexOf(monthName) + 1;
};

/**
 * Count registrations for a specific date
 */
export const countRegistrationsByDate = (
  users: MockUser[],
  date: string
): number => {
  return filterUsersByDate(users, date).length;
};

/**
 * Count registrations for a specific month/year
 */
export const countRegistrationsByMonthYear = (
  users: MockUser[],
  month: number,
  year: number
): number => {
  return filterUsersByMonthYear(users, month, year).length;
};

/**
 * Filter users by status
 */
export const filterUsersByStatus = (
  users: MockUser[],
  status: "active" | "inactive"
): MockUser[] => {
  return users.filter((user) => user.status === status);
};

/**
 * Count blocked devices
 */
export const countBlockedDevices = (users: MockUser[]): number => {
  return users.filter((user) => user.deviceBlocked).length;
};
