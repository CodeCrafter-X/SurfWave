'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaSearch, 
  FaChevronLeft, 
  FaChevronRight, 
  FaWater, 
  FaWhatsapp, 
  FaStar, 
  FaShieldAlt, 
  FaBolt, 
  FaCompass,
  FaWind,
  FaTemperatureHigh,
  FaCheckCircle
} from 'react-icons/fa';
import BoatCard from '@/components/BoatCard';

export default function Home() {
  const [featuredBoats, setFeaturedBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('rent'); // 'rent' or 'sale' or 'all'

  useEffect(() => {
    fetchFeaturedBoats(activeTab);
  }, [activeTab]);

  async function fetchFeaturedBoats(tab = 'rent') {
    try {
      setLoading(true);
      const url = tab === 'all' 
        ? '/api/boats?limit=6' 
        : `/api/boats?limit=6&type=${tab}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setFeaturedBoats(data.boats);
      }
    } catch (error) {
      console.error('Failed to fetch boats:', error);
    } finally {
      setLoading(false);
    }
  }

  const reviews = [
    {
      text: "The best surfboard rental experience in Arugam Bay! The board was in pristine condition, and the team gave incredible local tips on the morning point swell.",
      name: "Sarah Rodriguez",
      role: "Travel Surfer, Australia",
      initials: "SR",
      gradient: "from-[#00b4d8] to-[#00f5d4]"
    },
    {
      text: "Bought my first custom 6'2 shortboard from SurfWave. The transaction was effortless on WhatsApp, and the quality surpassed my expectations. Pure wave bliss!",
      name: "Michael Johnson",
      role: "Intermediate Surfer, UK",
      initials: "MJ",
      gradient: "from-[#0077b6] to-[#00b4d8]"
    },
    {
      text: "Rented boards for our whole family during our Pottuvil vacation. Flexible hours, top safety gear, and super warm hospitality. We'll be back next season!",
      name: "Emily Watson",
      role: "Family Surf Explorer, Germany",
      initials: "EW",
      gradient: "from-[#00f5d4] to-[#48cae4]"
    },
    {
      text: "Sold my old twin-fin and upgraded to a performance fish through their trade-in program. Honest pricing, friendly advice, and zero hassle.",
      name: "David Kumar",
      role: "Local Charger, Sri Lanka",
      initials: "DK",
      gradient: "from-[#00b4d8] to-[#00f5d4]"
    },
    {
      text: "Unbeatable beachfront convenience. You can literally book a high-end epoxy board on WhatsApp and be paddling out into Main Point in 10 minutes.",
      name: "Jessica Lee",
      role: "Frequent Renter, Singapore",
      initials: "JL",
      gradient: "from-[#0077b6] to-[#00f5d4]"
    },
    {
      text: "High-grade board selection. They have everything from beginner foamies to razor-sharp performance boards. 10/10 recommend to all ocean lovers!",
      name: "Alex Patel",
      role: "Surf Enthusiast, India",
      initials: "AP",
      gradient: "from-[#48cae4] to-[#0077b6]"
    }
  ];

  return (
    <div className="w-full bg-[#f4fbfd] text-[#082133] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH ENERGETIC SEA VIBE & MULTI-LAYER ANIMATED WAVES     */}
      {/* ========================================================================= */}
      <section 
        className="relative min-h-[90vh] md:min-h-[95vh] flex flex-col justify-between pt-16 md:pt-24 pb-28 md:pb-36 px-4 overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/surf-img/home-surf.png)',
        }}
      >
        {/* Deep Ocean Liquid Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#031726]/85 via-[#031726]/70 to-[#031726]/90 backdrop-blur-[2px]"></div>

        {/* Ambient Bioluminescent Radial Lights */}
        <div className="absolute top-10 left-10 w-72 md:w-96 h-72 md:h-96 bg-[#00f5d4]/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 md:w-[30rem] h-80 md:h-[30rem] bg-[#00b4d8]/25 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto w-full relative z-20 flex-grow flex flex-col justify-center items-center text-center px-4">
          
          {/* Live Surf Beacon Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#06283d]/80 border border-[#00f5d4]/40 px-4 py-2 rounded-full mb-6 backdrop-blur-xl shadow-[0_0_25px_rgba(0,245,212,0.3)] animate-surf-bob">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f5d4]"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#e0fbfc] uppercase">
              ⚡ Pottuvil Arugam Bay • Indian Ocean
            </span>
          </div>

          {/* Dynamic Liquid Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-5xl">
            Ride the Rhythm of <br className="hidden sm:inline" />
            <span className="ocean-gradient-text animate-sea-gradient">
              The Indian Ocean
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-[#e0fbfc]/90 font-medium mb-8 md:mb-10 max-w-3xl leading-relaxed">
            Premium hand-selected surfboard rentals, expert advice, and vessel sales at Sri Lanka’s world-renowned right-hand point breaks.
          </p>

          {/* Energetic Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-12">
            <Link
              href="/boats?type=rent"
              className="w-full sm:w-auto shimmer-trigger bg-gradient-to-r from-[#00f5d4] via-[#00b4d8] to-[#0077b6] animate-sea-gradient text-[#031726] font-black text-base md:text-lg py-4 px-8 md:px-10 rounded-full shadow-[0_0_35px_rgba(0,245,212,0.5)] hover:shadow-[0_0_50px_rgba(0,245,212,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>🏄</span>
              <span>Rent a Surfboard</span>
              <FaArrowRight className="text-sm" />
            </Link>

            <Link
              href="/boats?type=sale"
              className="w-full sm:w-auto glass-sea-card-dark text-[#e0fbfc] hover:text-white font-black text-base md:text-lg py-4 px-8 md:px-10 rounded-full border border-[#00f5d4]/40 hover:border-[#00f5d4] shadow-[0_0_25px_rgba(0,180,216,0.25)] hover:shadow-[0_0_40px_rgba(0,245,212,0.4)] transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>⚡</span>
              <span>Buy a Surfboard</span>
            </Link>
          </div>

          {/* Floating Live Swell Glass Pill Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl bg-[#06283d]/70 border border-[#00f5d4]/25 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl">
              <div className="p-2.5 rounded-xl bg-[#00f5d4]/10 text-[#00f5d4]">
                <FaWater size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-400 font-medium">Point Break Swell</p>
                <p className="text-sm sm:text-base font-black text-white">4 – 6 FT Clean</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl">
              <div className="p-2.5 rounded-xl bg-[#00b4d8]/10 text-[#00b4d8]">
                <FaTemperatureHigh size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-400 font-medium">Water Temp</p>
                <p className="text-sm sm:text-base font-black text-white">28°C Tropical</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl">
              <div className="p-2.5 rounded-xl bg-[#48cae4]/10 text-[#48cae4]">
                <FaWind size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-400 font-medium">Wind Condition</p>
                <p className="text-sm sm:text-base font-black text-white">8 kts Offshore</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl">
              <div className="p-2.5 rounded-xl bg-[#ffd166]/10 text-[#ffd166]">
                <FaBolt size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-400 font-medium">Quiver Status</p>
                <p className="text-sm sm:text-base font-black text-[#00f5d4]">50+ Boards Ready</p>
              </div>
            </div>
          </div>

        </div>

        {/* Multi-Tier Animated Organic Wave Dividers */}
        <div className="ocean-waves-container">
          {/* Back Wave Layer (Slow & Translucent) */}
          <svg 
            className="ocean-wave-layer animate-wave-slow text-[#0077b6]/30 fill-current" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
          {/* Middle Wave Layer */}
          <svg 
            className="ocean-wave-layer animate-wave-fast text-[#00b4d8]/40 fill-current -mt-10" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C200,80 400,-20 600,70 C800,160 1000,20 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
          {/* Front Solid Wave Layer Matching Next Section Background */}
          <svg 
            className="ocean-wave-layer text-[#031726] fill-current -mt-10" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,20 C180,90 380,10 580,75 C780,140 980,30 1200,80 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS RIBBON (OCEANIC TRENCH WITH GLOWING COUNTERS)                   */}
      {/* ========================================================================= */}
      <section className="bg-[#031726] py-10 px-4 relative z-20 -mt-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-white/5 border border-[#00f5d4]/20 hover:border-[#00f5d4]/60 transition-all hover:scale-105 duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f5d4] to-[#00b4d8] mb-1">
                50+
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#e0fbfc] tracking-wide">Elite Handcrafted Boards</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-[#00f5d4]/20 hover:border-[#00f5d4]/60 transition-all hover:scale-105 duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] to-[#48cae4] mb-1">
                1,500+
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#e0fbfc] tracking-wide">Thrilled Surfers Served</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-[#00f5d4]/20 hover:border-[#00f5d4]/60 transition-all hover:scale-105 duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd166] to-[#ffb703] mb-1">
                4.9 ★
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#e0fbfc] tracking-wide">Top Arugam Bay Rating</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-[#00f5d4]/20 hover:border-[#00f5d4]/60 transition-all hover:scale-105 duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#f72585] mb-1">
                24/7
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#e0fbfc] tracking-wide">WhatsApp Beach Concierge</p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED BOATS & SURF COLLECTION                                      */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 relative bg-[#f4fbfd]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#0077b6] uppercase bg-[#00b4d8]/15 px-4 py-1.5 rounded-full mb-3">
              <FaWater size={12} className="text-[#00b4d8]" />
              <span>The Quiver Collection</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#031726] tracking-tight mb-4">
              Featured Boards & Craft
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base mb-8">
              From responsive epoxy shortboards for Main Point barrels to high-buoyancy longboards for Baby Point glides.
            </p>

            {/* Quick Filter Pill Controls */}
            <div className="inline-flex p-1.5 rounded-full bg-gray-200/80 backdrop-blur-md border border-gray-300">
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === 'rent'
                    ? 'bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🌊 For Rent
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === 'sale'
                    ? 'bg-gradient-to-r from-[#00b4d8] to-[#00f5d4] text-[#031726] shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ⚡ For Sale
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-[#031726] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Quiver
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="relative inline-flex">
                <div className="w-16 h-16 rounded-full border-4 border-[#00b4d8]/20 border-t-[#00f5d4] animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-xl">🏄</div>
              </div>
              <p className="mt-4 text-gray-500 font-bold tracking-wide">Summoning boards from the surf rack...</p>
            </div>
          ) : featuredBoats.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
                {featuredBoats.map((boat) => (
                  <BoatCard key={boat._id} boat={boat} />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center">
                <Link
                  href="/boats"
                  className="inline-flex items-center gap-3 shimmer-trigger bg-gradient-to-r from-[#0077b6] via-[#00b4d8] to-[#00f5d4] animate-sea-gradient text-white hover:text-[#031726] font-black py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(0,180,216,0.3)] hover:shadow-[0_15px_40px_rgba(0,245,212,0.5)] transform hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
                >
                  <span>Explore Full Surf Inventory</span>
                  <FaArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 glass-sea-card rounded-3xl max-w-lg mx-auto">
              <div className="text-5xl mb-3">🌊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No boards found right now</h3>
              <p className="text-gray-500 text-sm mb-6">Check back in a moment or chat with us on WhatsApp to check offline stock.</p>
              <a
                href="https://wa.me/94727578276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md"
              >
                <FaWhatsapp size={16} />
                <span>Ask via WhatsApp</span>
              </a>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY SURFWAVE? (FROSTED GLASS OCEANIC FEATURE CARDS)                   */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#f4fbfd] to-[#e0fbfc] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#0077b6] uppercase bg-white px-4 py-1.5 rounded-full mb-3 shadow-sm border border-blue-100">
              <FaShieldAlt size={12} className="text-[#00f5d4]" />
              <span>The SurfWave Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#031726] tracking-tight">
              Why Surfers Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="group glass-sea-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,216,0.2)] hover:border-[#00f5d4]/60">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0077b6] to-[#00f5d4] flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                🏄
              </div>
              <h3 className="text-xl font-extrabold text-[#031726] mb-3">Premium Hand-Shaped Quiver</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Meticulously waxed, ding-free boards tailored for every wave condition—from gentle rollers at Baby Point to hollow tubes at Peanut Farm.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group glass-sea-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,216,0.2)] hover:border-[#00f5d4]/60">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00b4d8] to-[#48cae4] flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                💎
              </div>
              <h3 className="text-xl font-extrabold text-[#031726] mb-3">Transparent Island Pricing</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Clear hourly and daily rental rates with zero hidden beach surcharges. Multi-day discounts and try-before-you-buy programs available.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group glass-sea-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,216,0.2)] hover:border-[#00f5d4]/60">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#00f5d4] flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-extrabold text-[#031726] mb-3">Instant WhatsApp Lock</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Skip tedious paperwork. Connect directly with our beach crew on WhatsApp, lock in your board, and pick it up beachside in minutes.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ABOUT US (OCEAN PANORAMA WITH GLASS EMBED)                           */}
      {/* ========================================================================= */}
      <section 
        className="py-24 md:py-32 px-4 relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/surf-img/about-surf.png)',
        }}
      >
        <div className="absolute inset-0 bg-[#031726]/85 backdrop-blur-[3px]"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="glass-sea-card-dark p-8 sm:p-12 md:p-16 rounded-3xl text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            
            <div className="inline-flex items-center gap-2 bg-[#00f5d4]/10 border border-[#00f5d4]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#00f5d4] uppercase mb-4">
              <span>🌊 The Story of SurfWave</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
              Born from the Waves of Arugam Bay
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[#00f5d4] via-[#00b4d8] to-[#0077b6] mx-auto mb-8 rounded-full"></div>

            <p className="text-base sm:text-lg text-[#e0fbfc]/90 leading-relaxed mb-6">
              SurfWave is situated right at the heartbeat of Pottuvil Arugambe Beach, home to some of the world’s most consistent and beloved right-hand surf point breaks. With over a decade of riding these swells, our mission is simple: get you on the right board with the right fin setup to turn every paddle-out into pure joy.
            </p>

            <p className="text-base sm:text-lg text-[#e0fbfc]/90 leading-relaxed mb-10">
              Whether you are catching your very first green wave on a 9-foot soft-top or carving up high-performance sections at Whiskey Point, we back you with premium equipment, safety leashes, and honest wave wisdom.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="shimmer-trigger bg-gradient-to-r from-[#00f5d4] to-[#00b4d8] text-[#031726] font-extrabold py-3.5 px-8 rounded-full shadow-[0_0_25px_rgba(0,245,212,0.4)] hover:shadow-[0_0_40px_rgba(0,245,212,0.6)] transition transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Visit Our Beach Station
              </Link>
              
              <a
                href="https://wa.me/94727578276"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-8 rounded-full transition transform hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center gap-2"
              >
                <FaWhatsapp className="text-[#25D366]" />
                <span>Message Ishan on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS (CONNECTING WAVE SURGE FLOW)                              */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#0077b6] uppercase bg-blue-50 px-4 py-1.5 rounded-full mb-3 border border-blue-100">
              <FaCompass size={12} className="text-[#00b4d8]" />
              <span>4 Simple Steps</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#031726] tracking-tight mb-4">
              How to Rent or Buy
            </h2>
            
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              Get from your phone screen straight into the lineup in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="glass-sea-card p-6 rounded-3xl text-center relative z-10 transition hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#0077b6] to-[#00b4d8] text-white font-black text-xl flex items-center justify-center shadow-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-[#031726] mb-2">Select Your Board</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Filter by rental, purchase, or board type to find your ideal match and volume.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-sea-card p-6 rounded-3xl text-center relative z-10 transition hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#00b4d8] to-[#00f5d4] text-[#031726] font-black text-xl flex items-center justify-center shadow-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-[#031726] mb-2">Check Specifications</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Review dimensions, fin setups, condition photos, and rental duration options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-sea-card p-6 rounded-3xl text-center relative z-10 transition hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#00f5d4] text-[#031726] font-black text-xl flex items-center justify-center shadow-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-[#031726] mb-2">Confirm on WhatsApp</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                One click sends a pre-filled booking inquiry straight to our local team.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-sea-card p-6 rounded-3xl text-center relative z-10 transition hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#00f5d4] to-[#ffd166] text-[#031726] font-black text-xl flex items-center justify-center shadow-lg">
                4
              </div>
              <h3 className="text-lg font-bold text-[#031726] mb-2">Paddle Out & Enjoy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Grab your board waxed and ready at our station and score unforgettable waves!
              </p>
            </div>

          </div>

          {/* Pro Tips Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#031726] to-[#06283d] text-white p-6 sm:p-8 rounded-3xl border border-[#00f5d4]/25 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-[#00f5d4] mb-2 flex items-center gap-2">
                  <span>💡 Local Surfer Pro Tip</span>
                </h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Dawn patrol (6:00 AM – 9:00 AM) brings glassy offshore winds and peak tide conditions at Main Point. Reserve your board the evening before on WhatsApp to hit the lineup first!
                </p>
              </div>
              <a
                href="https://wa.me/94727578276?text=Hi%20SurfWave!%20I%20want%20to%20reserve%20a%20board%20for%20tomorrow%20morning."
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-trigger bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold px-6 py-3 rounded-full text-sm shadow-md whitespace-nowrap flex items-center gap-2 hover:scale-105 transition"
              >
                <FaWhatsapp size={16} />
                <span>Reserve Morning Board</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CUSTOMER REVIEWS (OCEAN CAROUSEL)                                      */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 bg-[#f4fbfd]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#0077b6] uppercase bg-[#00b4d8]/15 px-4 py-1.5 rounded-full mb-3">
              <FaStar size={12} className="text-[#ffd166]" />
              <span>Surfer Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#031726] tracking-tight mb-3">
              What The Ocean Community Says
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">Real experiences from travelers and local rippers alike.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.slice(reviewIndex * 3, reviewIndex * 3 + 3).map((rev, idx) => (
              <div 
                key={idx}
                className="glass-sea-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,216,0.18)]"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#ffd166] text-sm mb-4">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="text-gray-500 text-xs ml-1 font-bold">(5.0)</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-r ${rev.gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#031726] text-sm">{rev.name}</h4>
                    <p className="text-xs text-gray-500">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setReviewIndex(reviewIndex === 0 ? 1 : 0)}
              className="p-3 rounded-full bg-white border border-gray-200 text-[#031726] hover:bg-[#00f5d4] hover:border-[#00f5d4] transition shadow-md hover:scale-110 active:scale-95"
              aria-label="Previous Reviews"
            >
              <FaChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setReviewIndex(0)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  reviewIndex === 0 ? 'w-8 bg-[#0077b6]' : 'w-2.5 bg-gray-300'
                }`}
                aria-label="Slide 1"
              ></button>
              <button
                onClick={() => setReviewIndex(1)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  reviewIndex === 1 ? 'w-8 bg-[#0077b6]' : 'w-2.5 bg-gray-300'
                }`}
                aria-label="Slide 2"
              ></button>
            </div>

            <button
              onClick={() => setReviewIndex(reviewIndex === 0 ? 1 : 0)}
              className="p-3 rounded-full bg-white border border-gray-200 text-[#031726] hover:bg-[#00f5d4] hover:border-[#00f5d4] transition shadow-md hover:scale-110 active:scale-95"
              aria-label="Next Reviews"
            >
              <FaChevronRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HIGH-IMPACT FINAL TIDAL CTA                                            */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-r from-[#031726] via-[#06283d] to-[#031726] text-white relative overflow-hidden">
        
        {/* Glowing Caustic Light Spotlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-[#00f5d4]/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-4xl sm:text-5xl mb-4 inline-block animate-surf-bob">🏄‍♂️</span>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Ready to Catch Your Perfect Wave?
          </h2>

          <p className="text-base sm:text-xl text-[#e0fbfc]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            The Indian Ocean is firing. Rent your board today or pick up your dream surfboard with instant local pickup at Pottuvil Arugambe Point.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/boats"
              className="w-full sm:w-auto shimmer-trigger bg-gradient-to-r from-[#00f5d4] via-[#00b4d8] to-[#0077b6] text-[#031726] font-black text-base md:text-lg py-4 px-10 rounded-full shadow-[0_0_35px_rgba(0,245,212,0.5)] hover:shadow-[0_0_50px_rgba(0,245,212,0.8)] transform hover:scale-105 active:scale-95 transition-all"
            >
              Browse Quiver Now
            </Link>

            <a
              href="https://wa.me/94727578276"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-base md:text-lg py-4 px-8 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.4)] transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={20} />
              <span>Instant WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
