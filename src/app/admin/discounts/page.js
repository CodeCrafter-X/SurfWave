'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { FaSpinner, FaPlus, FaTrash, FaTicketAlt } from 'react-icons/fa';

export default function AdminDiscountsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    boatId: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
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
          fetchBoats();
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

  async function fetchBoats() {
    try {
      setLoading(true);
      const response = await fetch('/api/boats?limit=1000');
      if (response.ok) {
        const data = await response.json();
        setBoats(data.boats || []);
      }
    } catch (error) {
      console.error('Failed to fetch boats:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/boats/${formData.boatId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discountPercentage: parseInt(formData.discountPercentage),
          discountStartDate: new Date(formData.startDate),
          discountEndDate: new Date(formData.endDate),
        }),
      });

      if (response.ok) {
        setFormData({
          boatId: '',
          discountPercentage: '',
          startDate: '',
          endDate: '',
        });
        setShowForm(false);
        fetchBoats();
      }
    } catch (error) {
      console.error('Failed to apply discount:', error);
    }
  }

  async function handleRemoveDiscount(boatId) {
    if (confirm('Remove discount from this boat?')) {
      try {
        const response = await fetch(`/api/boats/${boatId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            discountPercentage: 0,
            discountStartDate: null,
            discountEndDate: null,
          }),
        });

        if (response.ok) {
          fetchBoats();
        }
      } catch (error) {
        console.error('Failed to remove discount:', error);
      }
    }
  }

  const boatsWithDiscounts = boats.filter((b) => b.discountPercentage && b.discountPercentage > 0);
  const boatsWithoutDiscounts = boats.filter((b) => !b.discountPercentage || b.discountPercentage === 0);

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="inline text-4xl text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Manage Discounts</h1>
            <p className="text-gray-600 mt-2">Active discounts: {boatsWithDiscounts.length}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaPlus /> Add Discount
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply Discount to Boat</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Boat *</label>
                <select
                  value={formData.boatId}
                  onChange={(e) => setFormData({ ...formData, boatId: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Choose a boat...</option>
                  {boatsWithoutDiscounts.map((boat) => (
                    <option key={boat._id} value={boat._id}>
                      {boat.title} - {boat.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Percentage *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., 15"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Valid Until</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Apply Discount
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Active Discounts */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaTicketAlt /> Active Discounts ({boatsWithDiscounts.length})
              </h2>
            </div>
            {boatsWithDiscounts.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {boatsWithDiscounts.map((boat) => (
                  <div
                    key={boat._id}
                    className="p-6 hover:bg-gray-50 transition flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{boat.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">{boat.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Discount</p>
                          <p className="font-semibold text-orange-600">{boat.discountPercentage}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Original Price</p>
                          <p className="font-semibold text-gray-900">
                            ${boat.type === 'rent' ? boat.pricePerHour + '/hr' : boat.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Discounted Price</p>
                          <p className="font-semibold text-green-600">
                            $
                            {boat.type === 'rent'
                              ? (boat.pricePerHour * (1 - boat.discountPercentage / 100)).toFixed(2) +
                                '/hr'
                              : (boat.price * (1 - boat.discountPercentage / 100)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {boat.discountEndDate && (
                        <p className="text-sm text-gray-600 mt-3">
                          Valid until: {new Date(boat.discountEndDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveDiscount(boat._id)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">
                <FaTicketAlt className="inline text-4xl mb-4 text-gray-300" />
                <p>No active discounts. Create one to increase sales!</p>
              </div>
            )}
          </div>
        </div>

        {/* Available Boats for Discount */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Available for Discount ({boatsWithoutDiscounts.length})</h2>
          </div>
          {boatsWithoutDiscounts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {boatsWithoutDiscounts.map((boat) => (
                <div key={boat._id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{boat.title}</h3>
                      <p className="text-gray-600 mt-1">{boat.description}</p>
                      <div className="flex gap-6 mt-3 text-sm">
                        <div>
                          <p className="text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">{boat.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price</p>
                          <p className="font-semibold text-gray-900">
                            ${boat.type === 'rent' ? boat.pricePerHour + '/hr' : boat.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p>All boats have discounts applied!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
