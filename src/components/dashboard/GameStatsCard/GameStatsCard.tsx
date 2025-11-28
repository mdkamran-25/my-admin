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
  collapsibleOnMobile?: boolean;
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
  collapsibleOnMobile = true,
}: GameStatsCardProps) => {
  const classes = variantClasses[variant] || variantClasses.play;
  const innerContent = (
    <div className="flex flex-col gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex justify-between items-center py-2 md:py-3 border-b border-white/20"
        >
          <span className="text-sm md:text-base">{stat.label}</span>
          <span className="text-lg md:text-xl font-semibold">
            {stat.value.toLocaleString()}
          </span>
        </div>
      ))}
      {totalLabel && totalValue !== undefined && (
        <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-white/30">
          <span className="text-xl font-bold">{totalLabel}</span>
          <span className="text-2xl font-bold">
            {totalValue.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );

  // If collapsibleOnMobile is true: render a <details> for mobile and the full card for desktop
  if (collapsibleOnMobile) {
    return (
      <>
        {/* Mobile: collapsible details */}
        <details
          className={`rounded-xl p-4 ${classes} shadow-lg sm:hidden`}
          data-collapsible-on-mobile
        >
          <summary className="flex items-center justify-between list-none">
            <h2 className="text-xl font-bold">{title}</h2>
            {totalValue !== undefined && (
              <span className="text-2xl font-bold">
                {totalValue.toLocaleString()}
              </span>
            )}
          </summary>
          <div className="mt-3">{innerContent}</div>
        </details>

        {/* Desktop: full card */}
        <div className={`hidden sm:block rounded-xl p-6 ${classes} shadow-lg`}>
          <h2 className="text-2xl font-bold text-center mb-6 pb-4 border-b-2 border-white/30">
            {title}
          </h2>
          {innerContent}
        </div>
      </>
    );
  }

  // Default: full card for all sizes
  return (
    <div
      className={`rounded-xl p-4 sm:p-6 ${classes} shadow-lg`}
      data-collapsible-on-mobile={collapsibleOnMobile}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 pb-2 sm:pb-4 border-b-2 border-white/30">
        {title}
      </h2>
      {innerContent}
    </div>
  );
};
