'use client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminStatCard from '@/components/AdminStatCard';
import { FaSpinner, FaBox, FaUsers, FaTicketAlt, FaDollarSign, FaCalendar } from 'react-icons/fa';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalBoats: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsByStatus, setBookingsByStatus] = useState({});

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
        if (data.user.role === 'admin') {
          setUser(data.user);
          fetchStats();
        } else {
          router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  }

  async function fetchStats() {
    try {
      const [boatsRes, usersRes, bookingsRes] = await Promise.all([
        fetch('/api/boats?limit=1000'),
        fetch('/api/users'),
        fetch('/api/bookings?limit=1000'),
      ]);

      if (boatsRes.ok && usersRes.ok && bookingsRes.ok) {
        const boatsData = await boatsRes.json();
        const usersData = await usersRes.json();
        const bookingsData = await bookingsRes.json();

        const bookings = bookingsData.bookings || [];
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
        const pendingCount = bookings.filter((b) => b.status === 'pending').length;

        setStats({
          totalBoats: boatsData.boats?.length || 0,
          totalUsers: usersData.users?.filter((u) => u.role === 'user').length || 0,
          totalBookings: bookings.length,
          totalRevenue,
          confirmedBookings: confirmedCount,
          pendingBookings: pendingCount,
        });

        setRecentBookings(bookings.slice(0, 5));

        // Calculate bookings by month
        const monthlyBookings = {};
        bookings.forEach((b) => {
          const month = new Date(b.createdAt).toLocaleString('default', { month: 'short' });
          monthlyBookings[month] = (monthlyBookings[month] || 0) + 1;
        });
        setBookingsByStatus(monthlyBookings);
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
        <FaSpinner className="inline text-4xl text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Analytics & Reports</h1>

        {/* Key Metrics */}
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

        {/* Booking Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Booking Status Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-green-600 font-semibold">Confirmed</p>
                  <p className="text-sm text-gray-600">Completed bookings</p>
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-yellow-600 font-semibold">Pending</p>
                  <p className="text-sm text-gray-600">Awaiting confirmation</p>
                </div>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-blue-600 font-semibold">Average Revenue</p>
                  <p className="text-sm text-gray-600">Per booking</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  ${stats.totalBookings > 0 ? (stats.totalRevenue / stats.totalBookings).toFixed(2) : 0}
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-orange-600">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Revenue Target</p>
                <p className="text-3xl font-bold text-purple-600">
                  {((stats.totalRevenue / 50000) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-600 mt-2">Of $50,000 target</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Avg. Booking Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ${stats.totalBookings > 0 ? (stats.totalRevenue / stats.totalBookings).toFixed(2) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-blue-700">Booking Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalBookings > 0 ? ((stats.confirmedBookings / stats.totalBookings) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width:
                      stats.totalBookings > 0 ? ((stats.confirmedBookings / stats.totalBookings) * 100).toFixed(1) + '%' : '0%',
                  }}
                ></div>
              </div>
            </div>

            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-green-700">Fleet Utilization</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.totalBoats > 0 ? ((stats.totalBookings / (stats.totalBoats * 12)) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{
                    width:
                      stats.totalBoats > 0 ? ((stats.totalBookings / (stats.totalBoats * 12)) * 100).toFixed(1) + '%' : '0%',
                  }}
                ></div>
              </div>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-purple-700">User Growth</p>
                <p className="text-2xl font-bold text-purple-600">
                  +{Math.round(stats.totalUsers * 0.15)}
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-2">New users this month</p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Booking ID</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Board</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm text-gray-700">{booking._id?.slice(-6) || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{booking.customerName || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{booking.boatName || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      ${booking.totalPrice || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
