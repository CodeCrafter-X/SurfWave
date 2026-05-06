'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import AdminStatCard from '@/components/AdminStatCard';
import { FaBox, FaUsers, FaTicketAlt, FaDollarSign, FaSpinner, FaUser } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalBoats: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
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
          console.log('User is not admin, redirecting to dashboard');
          setLoading(false);
          router.push('/dashboard');
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
      const [boatsRes, usersRes, bookingsRes] = await Promise.all([
        fetch('/api/boats?limit=1000', { credentials: 'include' }),
        fetch('/api/users', { credentials: 'include' }),
        fetch('/api/bookings?limit=1000', { credentials: 'include' }),
      ]);

      if (boatsRes.ok && usersRes.ok && bookingsRes.ok) {
        const boatsData = await boatsRes.json();
        const usersData = await usersRes.json();
        const bookingsData = await bookingsRes.json();

        const totalRevenue = bookingsData.bookings?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;

        setStats({
          totalBoats: boatsData.boats?.length || 0,
          totalUsers: usersData.users?.filter((u) => u.role === 'user').length || 0,
          totalBookings: bookingsData.bookings?.length || 0,
          totalRevenue,
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
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {/* Admin Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl">
              <FaUser />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-blue-600 font-semibold mt-2">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatCard
            icon={FaBox}
            label="Total Boards"
            value={stats.totalBoats}
            trend={12}
            color="blue"
          />
          <AdminStatCard
            icon={FaUsers}
            label="Total Users"
            value={stats.totalUsers}
            trend={8}
            color="green"
          />
          <AdminStatCard
            icon={FaTicketAlt}
            label="Total Bookings"
            value={stats.totalBookings}
            trend={15}
            color="purple"
          />
          <AdminStatCard
            icon={FaDollarSign}
            label="Total Revenue"
            value={`$${(stats.totalRevenue / 1000).toFixed(1)}K`}
            trend={20}
            color="orange"
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/boats">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <FaBox className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Manage Boards</h3>
              <p className="text-gray-600 text-sm mt-2">View and manage all boards</p>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <FaUsers className="text-4xl text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Manage Users</h3>
              <p className="text-gray-600 text-sm mt-2">View and manage users</p>
            </div>
          </Link>
          <Link href="/admin/bookings">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <FaTicketAlt className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Manage Bookings</h3>
              <p className="text-gray-600 text-sm mt-2">View and manage bookings</p>
            </div>
          </Link>
          <Link href="/admin/analytics">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <FaDollarSign className="text-4xl text-orange-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Analytics</h3>
              <p className="text-gray-600 text-sm mt-2">View detailed analytics</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
