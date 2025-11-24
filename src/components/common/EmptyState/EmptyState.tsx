// Empty state component for sections with no data

interface EmptyStateProps {
  message?: string;
  icon?: string;
}

export const EmptyState = ({
  message = "No data available",
  icon = "📊",
}: EmptyStateProps) => (
  <div className="rounded-xl p-12 bg-gray-50 border-2 border-gray-200 border-dashed text-center">
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-gray-500 font-medium">{message}</p>
  </div>
);
