'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import AdminStatCard from '@/components/AdminStatCard';
import { FaBox, FaUsers, FaTicketAlt, FaSpinner, FaUser } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalBoats: 0,
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
        console.log('Auth response:', data.user.role); // Debug log
        if (data.user && data.user.role === 'admin') {
          setUser(data.user);
          await fetchStats();
        } else {
          console.log('User is not admin, redirecting to login');
          setLoading(false);
          router.push('/login');
        }
      } else {
        console.log('Auth response not ok');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-2xl p-6 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-blue-100 text-sm md:text-lg">Here's what's happening with your business today</p>
            </div>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-12 backdrop-blur-sm">
          <div className="flex items-center gap-6 md:gap-8">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-3xl md:text-5xl shadow-lg transform hover:scale-105 transition duration-300">
              <FaUser />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600 text-sm md:text-base mb-2">{user?.email}</p>
              <span className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-xs md:text-sm font-semibold">
                🛡️ Admin
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
            trend={12}
            color="blue"
          />
          <AdminStatCard
            icon={FaTicketAlt}
            label="Active Discounts"
            value="5"
            trend={3}
            color="purple"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            <Link href="/admin/boats">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 cursor-pointer group">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white bg-opacity-20 flex items-center justify-center text-white text-3xl md:text-4xl group-hover:scale-110 transition transform duration-300">
                    <FaBox />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Manage Boards</h3>
                    <p className="text-blue-100 text-sm md:text-base mt-1">Add, edit, or remove boards from inventory</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/admin/discounts">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 cursor-pointer group">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white bg-opacity-20 flex items-center justify-center text-white text-3xl md:text-4xl group-hover:scale-110 transition transform duration-300">
                    <FaTicketAlt />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Manage Discounts</h3>
                    <p className="text-purple-100 text-sm md:text-base mt-1">Create and manage promotional offers</p>
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