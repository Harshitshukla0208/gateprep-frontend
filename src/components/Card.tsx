interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Card({ icon, title, description }: CardProps) {
  return (
    <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors duration-300">
      <div className="text-indigo-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">
        {title}
      </h3>
      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}