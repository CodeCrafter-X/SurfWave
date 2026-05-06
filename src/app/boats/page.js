'use client';

// Don't try to prerender this page - always fetch fresh data
export const dynamic = 'force-dynamic';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaSlidersH } from 'react-icons/fa';
import BoatCard from '@/components/BoatCard';

// Move component that uses useSearchParams into a separate component
function BoatsPageContent() {
  const searchParams = useSearchParams();
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Initialize from URL params on mount
    setSearch(searchParams.get('search') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setCategory(searchParams.get('category') || 'all');
    setType(searchParams.get('type') || 'all');
    setPage(1);
  }, [searchParams]);

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
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
        {/* Page Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Find Your Perfect Board</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Browse and filter our collection of boards</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-3 md:p-4 rounded-lg shadow mb-6 md:mb-8">
          <input
            type="text"
            placeholder="Search boards by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
          />
        </form>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-bold transition transform hover:scale-105 active:scale-95"
            >
              <FaSlidersH /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white p-4 md:p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-6">Filters</h3>

              {/* Type Filter */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
                >
                  <option value="all">All Types</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
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
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range ($)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-1/2 px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-1/2 px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
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
                  setShowFilters(false);
                }}
                className="w-full bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-900 font-bold py-2 md:py-3 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm md:text-base"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Boats Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
                <p className="mt-4 text-gray-600 text-sm md:text-base">Loading boards...</p>
              </div>
            ) : boats.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                  {boats.map((boat) => (
                    <BoatCard key={boat._id} boat={boat} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 mt-8 md:mt-12">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-bold text-sm md:text-base"
                    >
                      ← Previous
                    </button>
                    <span className="px-3 md:px-4 py-2 text-sm md:text-base font-medium text-gray-700">
                      Page <span className="font-bold text-teal-600">{page}</span> of <span className="font-bold text-teal-600">{totalPages}</span>
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-bold text-sm md:text-base"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 text-base md:text-lg mb-4">No boards found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setMinPrice('');
                    setMaxPrice('');
                    setCategory('all');
                    setType('all');
                    setPage(1);
                    setShowFilters(false);
                  }}
                  className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm md:text-base"
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

// Default export with Suspense boundary
export default function BoatsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading boats...</p>
        </div>
      </div>
    }>
      <BoatsPageContent />
    </Suspense>
  );
}
