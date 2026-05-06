'use client';

export default function AdminStatCard({ icon: Icon, label, value, trend, color = 'blue' }) {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-200',
    green: 'from-green-500 to-green-600 shadow-green-200',
    purple: 'from-purple-500 to-purple-600 shadow-purple-200',
    orange: 'from-orange-500 to-orange-600 shadow-orange-200',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-lg md:rounded-xl p-4 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300`}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="bg-white bg-opacity-20 p-2 md:p-3 rounded-lg">
          <Icon size={20} className="md:w-6 md:h-6" />
        </div>
        {trend && (
          <span className={`text-xs md:text-sm font-semibold ${trend > 0 ? 'text-green-200' : 'text-red-200'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-white text-opacity-90 text-xs md:text-sm">{label}</p>
      <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
