'use client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSpinner, FaSave, FaUser, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
          setFormData({
            name: data.user.name,
          });
          if (data.user.profileImage) {
            setImagePreview(data.user.profileImage);
          }
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

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setImagePreview(reader.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleRemoveImage() {
    if (confirm('Remove your profile image?')) {
      try {
        setSaving(true);
        setError(null);
        const response = await fetch(`/api/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...formData, profileImage: null }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setImagePreview(null);
          setProfileImage(null);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError('Failed to remove image');
        }
      } catch (err) {
        setError('An error occurred while removing image');
        console.error(err);
      } finally {
        setSaving(false);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      const updateData = { ...formData };

      // If new image was selected, include it
      if (profileImage && imagePreview) {
        updateData.profileImage = imagePreview;
      }

      const response = await fetch(`/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setProfileImage(null);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating your profile');
      console.error(err);
    } finally {
      setSaving(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg flex items-center gap-2">
            <span className="font-semibold">✓ Profile updated successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{user?.email}</p>
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div>
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="font-semibold text-gray-900">Regular User</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FaUser className="text-blue-600" /> Full Name
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Profile Image Section */}
                <div className="border-t border-gray-200 pt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Profile Picture
                  </label>

                  <div className="space-y-4">
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="relative w-40 h-40 mx-auto mb-4">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-lg border-2 border-blue-300"
                        />
                      </div>
                    )}

                    {/* File Input */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profile-image-input"
                      />
                      <label
                        htmlFor="profile-image-input"
                        className="block w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                      >
                        <p className="text-blue-600 font-medium">
                          {profileImage ? 'Change Image' : 'Upload Profile Picture'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                      </label>
                    </div>

                    {/* Remove Image Button */}
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={saving}
                        className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <FaTrash /> Remove Image
                      </button>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <FaSpinner className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                  <Link
                    href="/dashboard"
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-center"
                  >
                    Cancel
                  </Link>
                </div>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can update your name and profile picture. To change your email or password, please contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
