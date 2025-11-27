// GameStatsCard component for displaying play and win statistics

interface GameStatsCardProps {
  title: string;
  stats: {
    label: string;
    value: number;
  }[];
  totalLabel?: string;
  totalValue?: number;
  variant?: "play" | "win" | "profit" | "add" | "withdraw" | "reject";
}

const variantClasses: Record<string, string> = {
  play: "bg-sky-700 text-white",
  win: "bg-green-700 text-white",
  profit: "bg-gray-900 text-white",
  add: "bg-blue-800 text-white",
  withdraw: "bg-red-800 text-white",
  reject: "bg-cyan-700 text-white",
};

export const GameStatsCard = ({
  title,
  stats,
  totalLabel,
  totalValue,
  variant = "play",
}: GameStatsCardProps) => {
  const classes = variantClasses[variant] || variantClasses.play;

  return (
    <div className={`rounded-xl p-6 ${classes} shadow-lg`}>
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
