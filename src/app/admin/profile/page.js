'use client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { FaSpinner, FaUser, FaEnvelope, FaCalendar, FaShieldAlt, FaSave } from 'react-icons/fa';

export default function AdminProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

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
          setFormData({
            name: data.user.name,
            email: data.user.email,
          });
        } else {
          router.push('/dashboard');
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="flex flex-col items-center justify-center">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Admin Profile</h1>
            <p className="text-gray-600 text-lg">Manage your account settings</p>
          </div>

          {/* Profile Card */}
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header Background */}
              <div className="h-40 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-6 pb-8 md:px-8 md:pb-10">
                {/* Profile Picture Area */}
                <div className="flex flex-col items-center -mt-20 mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Profile Info */}
                {!editing ? (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
                      <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold mt-3 text-lg">
                        <FaShieldAlt size={20} /> Administrator
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-300 transition">
                        <div className="text-2xl text-blue-600">
                          <FaEnvelope />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-medium">Email Address</p>
                          <p className="text-gray-900 font-semibold mt-1">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100 hover:border-green-300 transition">
                        <div className="text-2xl text-green-600">
                          <FaCalendar />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-medium">Member Since</p>
                          <p className="text-gray-900 font-semibold mt-1">
                            {new Date(user?.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:border-purple-300 transition">
                        <div className="text-2xl text-purple-600">
                          <FaUser />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-medium">Account Role</p>
                          <p className="text-gray-900 font-semibold mt-1">Administrator</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditing(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition transform hover:scale-105 shadow-lg text-lg"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-gray-900 font-semibold"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-gray-900 font-semibold"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                      >
                        <FaSave /> Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setFormData({
                            name: user.name,
                            email: user.email,
                          });
                        }}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-4 rounded-xl font-bold transition transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Admin Privileges */}
            <div className="mt-10 bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-blue-600" size={28} />
                Admin Privileges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition">
                  <span className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-800 font-semibold">Manage all boards</p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-600 hover:shadow-lg transition">
                  <span className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-800 font-semibold">Manage all users</p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-600 hover:shadow-lg transition">
                  <span className="w-3 h-3 bg-purple-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-800 font-semibold">View all bookings</p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-600 hover:shadow-lg transition">
                  <span className="w-3 h-3 bg-orange-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-800 font-semibold">Manage discounts</p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-600 hover:shadow-lg transition">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-800 font-semibold">View analytics</p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border-l-4 border-pink-600 hover:shadow-lg transition">
                  <span className="w-3 h-3 bg-pink-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-800 font-semibold">System admin control</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
