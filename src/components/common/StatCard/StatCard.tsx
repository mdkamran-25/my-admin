// Reusable StatCard component

interface StatCardProps {
  title: string;
  value: string | number;
  color?: "blue" | "pink" | "green" | "orange";
  onClick?: () => void;
}

const colorClasses = {
  blue: "bg-sky-500",
  pink: "bg-pink-600",
  green: "bg-cyan-500",
  orange: "bg-orange-500",
};

export const StatCard = ({
  title,
  value,
  color = "blue",
  onClick,
}: StatCardProps) => {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`p-2 text-center rounded-xl ${
        colorClasses[color]
      } text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ${
        onClick ? "cursor-pointer active:scale-95 w-full" : ""
      }`}
      type={onClick ? "button" : undefined}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold opacity-95">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Component>
  );
};
