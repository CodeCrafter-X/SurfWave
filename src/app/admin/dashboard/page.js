'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import AdminStatCard from '@/components/AdminStatCard';
import { FaBox, FaTicketAlt, FaSpinner, FaUser } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalBoats: 0,
    activeDiscounts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === 'admin') {
          setUser(data.user);
          await fetchStats();
        } else {
          setLoading(false);
          router.push('/login');
        }
      } else {
        setLoading(false);
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setLoading(false);
      router.push('/login');
    }
  }

  async function fetchStats() {
    try {
      const [boatsRes] = await Promise.all([
        fetch('/api/boats?limit=1000', { credentials: 'include' }),
      ]);

      if (boatsRes.ok) {
        const boatsData = await boatsRes.json();

        setStats({
          totalBoats: boatsData.boats?.length || 0,
          activeDiscounts: boatsData.boats?.filter(
            (boat) => boat.discountPercentage && boat.discountPercentage > 0
          ).length || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="inline text-4xl text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-slate-950 text-white shadow-sm">
          <div className="relative min-h-56 p-6 md:p-10">
            <Image src="/surf-img/home-surf.png" alt="SurfWave on the water" fill priority className="object-cover opacity-45" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/75 to-transparent" />
            <div className="relative z-10 max-w-xl pt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-300">Today at SurfWave</p>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome back, {user?.name}</h1>
              <p className="mt-3 text-sm text-slate-300 md:text-base">Keep your fleet and offers moving smoothly.</p>
            </div>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-100 text-2xl text-cyan-700">
              <FaUser />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600 text-sm md:text-base mb-2">{user?.email}</p>
              <span className="inline-block rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Admin account
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <AdminStatCard
            icon={FaBox}
            label="Total Boards"
            value={stats.totalBoats}
            color="blue"
          />
          <AdminStatCard
            icon={FaTicketAlt}
            label="Active Discounts"
            value={stats.activeDiscounts}
            color="orange"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8 md:mb-12">
          <h3 className="mb-4 text-xl font-bold text-slate-950">Quick actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            <Link href="/admin/boats">
              <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-xl text-cyan-700">
                    <FaBox />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">Manage boats</h3>
                    <p className="mt-1 text-sm text-slate-500">Update your fleet inventory</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/admin/discounts">
              <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 text-xl text-violet-700">
                    <FaTicketAlt />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">Manage discounts</h3>
                    <p className="mt-1 text-sm text-slate-500">Create and manage offers</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}