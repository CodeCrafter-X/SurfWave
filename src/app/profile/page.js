'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSpinner, FaEdit, FaUser, FaEnvelope, FaCalendar } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
        if (data.user.role === 'admin') {
          router.push('/admin/profile');
        } else {
          setUser(data.user);
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="inline text-4xl text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-2xl">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              {/* Header Background */}
              <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-700"></div>

              {/* Profile Content */}
              <div className="px-6 pb-6 text-center">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto -mt-10 mb-4 shadow-lg border-4 border-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-blue-600 font-semibold mt-2">Regular User</p>

                <Link
                  href="/profile/edit"
                  className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <FaEdit /> Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <div className="space-y-6">
                {/* Name */}
                <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-semibold">Full Name</p>
                    <p className="text-lg text-gray-900 font-semibold mt-1">{user?.name}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaEnvelope className="text-green-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-semibold">Email Address</p>
                    <p className="text-lg text-gray-900 font-semibold mt-1">{user?.email}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaCalendar className="text-purple-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-semibold">Member Since</p>
                    <p className="text-lg text-gray-900 font-semibold mt-1">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Actions</h2>

              <div className="space-y-4">
                <Link
                  href="/profile/edit"
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/dashboard"
                  className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
                >
                  Back to Dashboard
                </Link>
                <a
                  href="/api/auth/logout"
                  className="block w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-center"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
