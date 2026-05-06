'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaImage, FaTimes } from 'react-icons/fa';

export default function AdminBoatsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Luxury',
    type: 'rent',
    pricePerHour: '',
    price: '',
    location: '',
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

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

  function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    
    // Check maximum 5 images
    if (imagePreviews.length + files.length > 5) {
      setUploadError('Maximum 5 images allowed');
      return;
    }

    setUploadError(null);
    const newPreviews = [...imagePreviews];
    const newImages = [...formData.images];

    files.forEach((file) => {
      // Check file size (max 5MB per file)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`File ${file.name} is too large (max 5MB)`);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setUploadError(`File ${file.name} is not a valid image`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newImages.push(reader.result);
          newPreviews.push(reader.result);
          setFormData({ ...formData, images: newImages });
          setImagePreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index) {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Check at least one image
      if (formData.images.length === 0) {
        setUploadError('Please upload at least one image');
        return;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/boats/${editingId}` : '/api/boats';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          category: 'Luxury',
          type: 'rent',
          pricePerHour: '',
          price: '',
          location: '',
          capacity: '',
          images: [],
        });
        setImagePreviews([]);
        setUploadError(null);
        setShowForm(false);
        setEditingId(null);
        fetchBoats();
      }
    } catch (error) {
      console.error('Failed to save boat:', error);
      setUploadError('Failed to save boat. Please try again.');
    }
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this boat?')) {
      try {
        const response = await fetch(`/api/boats/${id}`, { 
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          fetchBoats();
        }
      } catch (error) {
        console.error('Failed to delete boat:', error);
      }
    }
  }

  function handleEdit(boat) {
    setFormData({
      ...boat,
      images: boat.images || [],
    });
    setImagePreviews(boat.images || []);
    setEditingId(boat._id);
    setShowForm(true);
    setUploadError(null);
  }

  const filteredBoats = boats.filter((boat) =>
    boat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boat.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Manage Boats</h1>
            <p className="text-gray-600 mt-2">Total boats: {boats.length}</p>
          </div>
          <button
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                category: 'Luxury',
                type: 'rent',
                pricePerHour: '',
                price: '',
                location: '',

                images: [],
              });
              setImagePreviews([]);
              setUploadError(null);
              setEditingId(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaPlus /> Add New Boat
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Boat' : 'Create New Boat'}
            </h2>
            {uploadError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                {uploadError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., Luxury Sunset Cruiser"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Luxury">Luxury</option>
                  <option value="Fishing">Fishing</option>
                  <option value="Speed Boat">Speed Boat</option>
                  <option value="Family">Family</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formData.type === 'rent' ? 'Price Per Hour' : 'Sale Price'}
                </label>
                <input
                  type="number"
                  value={formData.type === 'rent' ? formData.pricePerHour : formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [formData.type === 'rent' ? 'pricePerHour' : 'price']: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., Marina Bay"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Describe your boat..."
                />
              </div>

              {/* Images Upload Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Boat Images * ({imagePreviews.length}/5)
                </label>
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imagePreviews.length >= 5}
                    className="hidden"
                    id="boat-images-input"
                  />
                  <label
                    htmlFor="boat-images-input"
                    className={`block w-full px-4 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                      imagePreviews.length >= 5
                        ? 'border-gray-300 bg-gray-50 text-gray-400'
                        : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <FaImage className="mx-auto text-2xl mb-2" />
                    <p className="font-medium">
                      {imagePreviews.length === 0
                        ? 'Click to upload boat images'
                        : 'Click to add more images'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB each (max 5 images)</p>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg opacity-0 group-hover:opacity-100 transition"
                        >
                          <FaTimes size={12} />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  {editingId ? 'Update Boat' : 'Create Boat'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setUploadError(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6 relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search boats by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Boats Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <FaSpinner className="inline text-4xl text-blue-600 animate-spin" />
            </div>
          ) : filteredBoats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBoats.map((boat) => (
                    <tr key={boat._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{boat.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{boat.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{boat.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {boat.type === 'rent' ? `$${boat.pricePerHour}/hr` : `$${boat.price}`}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            boat.type === 'rent'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {boat.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(boat)}
                          className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(boat._id)}
                          className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {boats.length === 0 ? 'No boats yet. Create your first boat!' : 'No boats match your search.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
