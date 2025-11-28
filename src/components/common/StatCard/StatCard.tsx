// Reusable StatCard component
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: "blue" | "pink" | "green" | "orange" | "black" | "red";
  onClick?: () => void;
}

const colorClasses = {
  blue: "bg-blue-500",
  pink: "bg-pink-600",
  green: "bg-green-700",
  orange: "bg-orange-500",
  black: "bg-black",
  red: "bg-red-500",
};

export const StatCard = ({
  title,
  value,
  icon,
  color = "blue",
  onClick,
}: StatCardProps) => {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`p-3 sm:p-2 text-center rounded-xl min-h-[68px] flex items-center justify-center ${
        colorClasses[color]
      } text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ${
        onClick ? "cursor-pointer active:scale-95 w-full" : ""
      }`}
      type={onClick ? "button" : undefined}
      aria-label={onClick ? `${title} - ${value}` : undefined}
    >
      <div className="flex flex-col gap-1 sm:gap-2 items-center">
        {icon && <div className="text-2xl sm:text-3xl">{icon}</div>}
        <h3 className="text-sm sm:text-base font-semibold opacity-95">
          {title}
        </h3>
        <p className="text-lg sm:text-xl font-bold">{value}</p>
      </div>
    </Component>
  );
};
