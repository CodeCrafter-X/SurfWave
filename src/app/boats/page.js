'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaSlidersH } from 'react-icons/fa';
import BoatCard from '@/components/BoatCard';

export default function BoatsPage() {
  const searchParams = useSearchParams();
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBoats();
  }, [search, minPrice, maxPrice, category, type, page]);

  async function fetchBoats() {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (search) params.append('search', search);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (category !== 'all') params.append('category', category);
      if (type !== 'all') params.append('type', type);
      params.append('page', page);
      params.append('limit', 12);

      const response = await fetch(`/api/boats?${params}`);
      if (response.ok) {
        const data = await response.json();
        setBoats(data.boats);
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error('Failed to fetch boats:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find Your Perfect Boat</h1>
          <p className="text-gray-600 mt-2">Browse and filter our collection of boats</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow mb-8">
          <input
            type="text"
            placeholder="Search boats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </form>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <FaSlidersH /> Filters
            </button>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Types</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Categories</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Fishing">Fishing</option>
                  <option value="Speed Boat">Speed Boat</option>
                  <option value="Family">Family</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearch('');
                  setMinPrice('');
                  setMaxPrice('');
                  setCategory('all');
                  setType('all');
                  setPage(1);
                }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 rounded-lg transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Boats Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading boats...</p>
              </div>
            ) : boats.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {boats.map((boat) => (
                    <BoatCard key={boat._id} boat={boat} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 text-lg mb-4">No boats found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setMinPrice('');
                    setMaxPrice('');
                    setCategory('all');
                    setType('all');
                    setPage(1);
                  }}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
