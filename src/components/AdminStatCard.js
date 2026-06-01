'use client';

export default function AdminStatCard({ icon: Icon, label, value, trend, color = 'blue' }) {
  const colorMap = {
    blue: 'from-blue-600 to-cyan-500 shadow-blue-500/50',
    green: 'from-green-600 to-emerald-500 shadow-green-500/50',
    purple: 'from-purple-600 to-pink-500 shadow-purple-500/50',
    orange: 'from-orange-600 to-red-500 shadow-orange-500/50',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl p-6 md:p-8 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 duration-300 group overflow-hidden relative`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition transform duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl group-hover:scale-110 transition transform duration-300">
            <Icon size={24} className="md:w-8 md:h-8" />
          </div>
          {trend && (
            <span className={`text-xs md:text-sm font-bold px-3 py-1 rounded-full ${trend > 0 ? 'bg-green-400 bg-opacity-30 text-green-200' : 'bg-red-400 bg-opacity-30 text-red-200'}`}>
              {trend > 0 ? '📈' : '📉'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-white text-opacity-90 text-xs md:text-sm font-medium mb-2">{label}</p>
        <p className="text-3xl md:text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
}
