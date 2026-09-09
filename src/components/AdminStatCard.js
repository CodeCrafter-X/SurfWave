'use client';

export default function AdminStatCard({ icon: Icon, label, value, trend, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-cyan-50 text-cyan-700',
    green: 'bg-emerald-50 text-emerald-700',
    purple: 'bg-violet-50 text-violet-700',
    orange: 'bg-orange-50 text-orange-700',
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-3 ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        {trend && <span className="text-xs font-semibold text-emerald-600">+{trend}%</span>}
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      </div>
    </div>
  );
}
