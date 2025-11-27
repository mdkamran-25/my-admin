// Reusable Filter Bar Component

import { memo } from "react";

interface FilterBarProps {
  // Date filters
  showDateFilter?: boolean;
  dateValue?: string;
  onDateChange?: (date: string) => void;
  dateLabel?: string;

  // Date range filters
  showDateRangeFilter?: boolean;
  startDateValue?: string;
  endDateValue?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;

  // Status filter
  showStatusFilter?: boolean;
  statusValue?: string;
  onStatusChange?: (status: string) => void;
  statusOptions?: { value: string; label: string }[];
  statusLabel?: string;

  // Search filter
  showSearchFilter?: boolean;
  searchValue?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;

  // Custom dropdown filters
  customFilters?: Array<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }>;

  // Quick date filters
  showQuickFilters?: boolean;
  onQuickFilter?: (
    filter: "today" | "last7days" | "last30days" | "thisMonth"
  ) => void;

  // Filter button
  showFilterButton?: boolean;
  onFilterClick?: () => void;

  // Reset button
  showResetButton?: boolean;
  onResetClick?: () => void;
}

export const FilterBar = memo<FilterBarProps>(
  ({
    showDateFilter = false,
    dateValue = "",
    onDateChange,
    dateLabel = "Date",

    showDateRangeFilter = false,
    startDateValue = "",
    endDateValue = "",
    onStartDateChange,
    onEndDateChange,

    showStatusFilter = false,
    statusValue = "",
    onStatusChange,
    statusOptions = [],
    statusLabel = "Status",

    showSearchFilter = false,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",

    customFilters = [],

    showQuickFilters = false,
    onQuickFilter,

    showFilterButton = false,
    onFilterClick,

    showResetButton = false,
    onResetClick,
  }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
        {/* Quick Date Filters */}
        {showQuickFilters && onQuickFilter && (
          <div className="flex flex-wrap gap-2 pb-3 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700 self-center mr-2">
              Quick Filters:
            </span>
            <button
              onClick={() => onQuickFilter("today")}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => onQuickFilter("last7days")}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => onQuickFilter("last30days")}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => onQuickFilter("thisMonth")}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              This Month
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Single Date Filter */}
          {showDateFilter && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dateLabel}
              </label>
              <input
                type="date"
                value={dateValue}
                onChange={(e) => onDateChange?.(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {/* Date Range Filter */}
          {showDateRangeFilter && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDateValue}
                  onChange={(e) => onStartDateChange?.(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDateValue}
                  onChange={(e) => onEndDateChange?.(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </>
          )}

          {/* Status Filter */}
          {showStatusFilter && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {statusLabel}
              </label>
              <select
                value={statusValue}
                onChange={(e) => onStatusChange?.(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="">All {statusLabel}</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Filter */}
          {showSearchFilter && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {/* Custom Filters */}
          {customFilters.map((filter, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </label>
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="">All {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {(showFilterButton || showResetButton) && (
          <div className="flex gap-3 pt-2">
            {showFilterButton && (
              <button
                onClick={onFilterClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
              >
                Apply Filters
              </button>
            )}
            {showResetButton && (
              <button
                onClick={onResetClick}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

FilterBar.displayName = "FilterBar";
