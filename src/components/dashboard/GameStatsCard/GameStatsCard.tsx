// GameStatsCard component for displaying play and win statistics

interface GameStatsCardProps {
  title: string;
  stats: {
    label: string;
    value: number;
  }[];
  totalLabel?: string;
  totalValue?: number;
  variant?: "play" | "win";
}

const variantClasses = {
  play: "from-green-700 to-green-600",
  win: "from-red-600 to-orange-500",
};

export const GameStatsCard = ({
  title,
  stats,
  totalLabel,
  totalValue,
  variant = "play",
}: GameStatsCardProps) => {
  return (
    <div
      className={`rounded-xl p-6 bg-linear-to-br ${variantClasses[variant]} text-white shadow-lg`}
    >
      <h2 className="text-2xl font-bold text-center mb-6 pb-4 border-b-2 border-white/30">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex justify-between items-center py-3 border-b border-white/20"
          >
            <span className="text-base">{stat.label}</span>
            <span className="text-xl font-semibold">
              {stat.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      {totalLabel && totalValue !== undefined && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-white/30">
          <span className="text-xl font-bold">{totalLabel}</span>
          <span className="text-2xl font-bold">
            {totalValue.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};
