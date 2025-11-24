// Error state component for Dashboard

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "Failed to load dashboard data.",
  onRetry,
}: ErrorStateProps) => (
  <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md">
      <div className="text-red-600 text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          type="button"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);
