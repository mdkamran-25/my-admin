// Reusable StatCard component

interface StatCardProps {
  title: string;
  value: string | number;
  color?: "blue" | "pink" | "green" | "orange";
}

const colorClasses = {
  blue: "bg-sky-500",
  pink: "bg-pink-600",
  green: "bg-cyan-500",
  orange: "bg-orange-500",
};

export const StatCard = ({ title, value, color = "blue" }: StatCardProps) => {
  return (
    <div
      className={`p-2 text-center rounded-xl ${colorClasses[color]} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold opacity-95">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};
