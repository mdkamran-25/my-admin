// Reusable StatsSection component for Play/Win statistics

import { memo } from "react";
import { GameStatsCard } from "../GameStatsCard";
import { EmptyState } from "../../common/EmptyState";
import type { GameStatItem } from "../../../types";

interface StatsSectionProps {
  title: "Play" | "Win";
  stats: GameStatItem[];
  total: number;
  emptyIcon?: string;
  emptyMessage?: string;
  collapsibleOnMobile?: boolean;
}

export const StatsSection = memo<StatsSectionProps>(
  ({
    title,
    stats,
    total,
    emptyIcon,
    emptyMessage,
    collapsibleOnMobile = true,
  }) => {
    const hasData = total > 0;

    if (!hasData) {
      return (
        <EmptyState
          message={
            emptyMessage || `No ${title.toLowerCase()} statistics available`
          }
          icon={emptyIcon || (title === "Play" ? "🎮" : "🏆")}
        />
      );
    }

    return (
      <GameStatsCard
        title={title}
        variant={title.toLowerCase() as "play" | "win"}
        stats={stats}
        totalLabel={`Total ${title}`}
        totalValue={total}
        collapsibleOnMobile={collapsibleOnMobile}
      />
    );
  }
);

StatsSection.displayName = "StatsSection";
