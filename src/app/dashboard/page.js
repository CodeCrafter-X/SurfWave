'use client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClipboardList,
  FaSpinner,
  FaArrowLeft,
  FaUser,
  FaShip,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEdit,
  FaPlus,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          router.push('/admin/dashboard');
        } else {
          setUser(data.user);
          fetchBookings();
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  }

  async function fetchBookings() {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      setError('Failed to fetch bookings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            <FaArrowLeft /> Back Home
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <Link
            href="/boats"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaPlus /> Browse Boats
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl">
                <FaUser />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
                <p className="text-blue-100 mt-2">Track your boat bookings and adventures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaClipboardList className="text-blue-600 text-xl" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
            <p className="text-sm text-gray-600 mt-2">Total Bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Confirmed</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{confirmedBookings.length}</p>
            <p className="text-sm text-gray-600 mt-2">Confirmed Bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaClock className="text-yellow-600 text-xl" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Pending</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{pendingBookings.length}</p>
            <p className="text-sm text-gray-600 mt-2">Pending Bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaShip className="text-purple-600 text-xl" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Spent</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">${totalSpent.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-2">Total Spent</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaClipboardList /> My Bookings
                </h2>
              </div>

              {error && (
                <div className="p-6 bg-red-100 text-red-700 border-t border-red-200">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="p-12 text-center">
                  <FaSpinner className="inline text-4xl text-blue-600 animate-spin" />
                </div>
              ) : bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Board</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                            <Link
                              href={`/boats/${booking.boatId?._id || ''}`}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                            >
                              <FaShip /> {booking.boatName || 'N/A'}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                              {booking.boatType || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                            ${booking.totalPrice?.toFixed(2) || 0}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status === 'confirmed' && <FaCheckCircle size={10} />}
                              {booking.status === 'pending' && <FaClock size={10} />}
                              {booking.status === 'cancelled' && <FaTimesCircle size={10} />}
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <FaCalendarAlt className="inline text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-600 font-semibold mt-4">No bookings yet</p>
                  <p className="text-gray-500 text-sm mt-2">Start by browsing our amazing boats!</p>
                  <Link
                    href="/boats"
                    className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Browse Boats
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-4">{user?.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
              </div>
              <Link href="/profile/edit" className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-center flex items-center justify-center gap-2">
                <FaEdit /> Edit Profile
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Booking Rate</span>
                  <span className="font-semibold text-gray-900">
                    {bookings.length > 0 ? ((confirmedBookings.length / bookings.length) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Type</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">User</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/boats"
                  className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Browse Boats
                </Link>
                <Link
                  href="/contact"
                  className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center"
                >
                  Contact Us
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-center flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
