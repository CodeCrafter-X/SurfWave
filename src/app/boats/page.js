'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaSlidersH, FaSearch, FaTimes, FaWater, FaWhatsapp } from 'react-icons/fa';
import BoatCard from '@/components/BoatCard';

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

  const resetAllFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setCategory('all');
    setType('all');
    setPage(1);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-[#f4fbfd] pb-20">
      
      {/* Header Sea Banner */}
      <section className="bg-gradient-to-r from-[#031726] via-[#06283d] to-[#031726] text-white py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#00f5d4]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#00f5d4] uppercase bg-white/5 border border-[#00f5d4]/20 px-3.5 py-1 rounded-full mb-3">
            <FaWater size={12} />
            <span>Pottuvil Arugam Bay Fleet</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            Explore The Surf Quiver
          </h1>
          <p className="text-[#e0fbfc]/80 text-sm sm:text-base max-w-xl">
            Choose from precision performance boards, soft-top cruisers, or find your permanent board for purchase.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Search Bar (Floating Sea Glass) */}
        <form onSubmit={handleSearch} className="glass-sea-card p-2 sm:p-3 rounded-2xl md:rounded-full shadow-[0_10px_35px_rgba(0,180,216,0.15)] mb-8 flex items-center gap-2">
          <div className="pl-4 text-[#00b4d8]">
            <FaSearch size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by surfboard name, volume, shaper or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-transparent text-sm sm:text-base text-[#031726] placeholder-gray-400 focus:outline-none font-medium"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="p-2 text-gray-400 hover:text-gray-600 mr-1"
            >
              <FaTimes size={16} />
            </button>
          )}
          <button
            type="submit"
            className="shimmer-trigger bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#00b4d8] hover:to-[#00f5d4] hover:text-[#031726] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition shadow-md whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white px-5 py-3 rounded-2xl font-bold transition shadow-md"
            >
              <FaSlidersH /> 
              <span>{showFilters ? 'Hide Filter Drawer' : 'Filter Boards'}</span>
            </button>

            {/* Filter Content */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block glass-sea-card p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,180,216,0.1)]`}>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <h3 className="font-black text-[#031726] text-base uppercase tracking-wider flex items-center gap-2">
                  <FaSlidersH size={14} className="text-[#00b4d8]" />
                  <span>Refine Quiver</span>
                </h3>
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#0077b6] hover:underline font-bold"
                >
                  Reset
                </button>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Deal Type</label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-semibold text-[#031726]"
                >
                  <option value="all">🌊 All Boards</option>
                  <option value="rent">🏄 For Rent Only</option>
                  <option value="sale">⚡ For Sale Only</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Quiver Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-semibold text-[#031726]"
                >
                  <option value="all">All Categories</option>
                  <option value="Luxury">Performance / Pro</option>
                  <option value="Fishing">Cruiser / Longboard</option>
                  <option value="Speed Boat">Shortboard / Fish</option>
                  <option value="Family">Soft-Top / Beginner</option>
                  <option value="Adventure">Funboard / Hybrid</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Price Bracket ($)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-1/2 px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-semibold"
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-1/2 px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetAllFilters}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Boards Grid & Pagination */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-24 glass-sea-card rounded-3xl">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-full border-4 border-[#00b4d8]/20 border-t-[#00f5d4] animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl">🏄</div>
                </div>
                <p className="mt-4 text-[#0077b6] font-extrabold tracking-wide text-sm">Raking the surf rack...</p>
              </div>
            ) : boats.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {boats.map((boat) => (
                    <BoatCard key={boat._id} boat={boat} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-10">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[#031726] font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#00f5d4] hover:border-[#00f5d4] transition shadow-sm"
                    >
                      ← Prev
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-gray-600 bg-white rounded-full border border-gray-200 shadow-sm">
                      Page <span className="text-[#0077b6] font-black">{page}</span> of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[#031726] font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#00f5d4] hover:border-[#00f5d4] transition shadow-sm"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 glass-sea-card rounded-3xl p-8">
                <div className="text-5xl mb-4">🌊</div>
                <h3 className="text-xl font-bold text-[#031726] mb-2">No boards matching your filters</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                  Try broadening your price range or check all deal types. Our beach station also carries offline inventory.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold py-2.5 px-6 rounded-full text-xs shadow-md"
                  >
                    Reset All Filters
                  </button>
                  <a
                    href="https://wa.me/94727578276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white font-bold py-2.5 px-6 rounded-full text-xs shadow-md flex items-center gap-2"
                  >
                    <FaWhatsapp size={14} />
                    <span>Inquire Custom Board</span>
                  </a>
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default function BoatsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f4fbfd] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00b4d8]/20 border-t-[#00f5d4]"></div>
          <p className="mt-4 text-[#0077b6] font-bold">Summoning Quiver...</p>
        </div>
      </div>
    }>
      <BoatsPageContent />
    </Suspense>
  );
}
