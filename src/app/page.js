'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BoatCard from '@/components/BoatCard';

export default function Home() {
  const [featuredBoats, setFeaturedBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    fetchFeaturedBoats();
  }, []);

  async function fetchFeaturedBoats() {
    try {
      const response = await fetch('/api/boats?limit=6&type=rent');
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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="text-white py-20 md:py-32 px-4 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/surf-img/home-surf.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
              Dive into Your Next Adventure
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-50 mb-3 md:mb-4 max-w-3xl mx-auto px-2">
              Premium surfboard rentals and sales at Pottuvil Arugambe Beach
            </p>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto px-2">
              Experience the perfect wave of luxury, comfort, and unforgettable memories on the Indian Ocean
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-12 px-2">
              <Link
                href="/boats?type=rent"
                className="bg-white hover:bg-gray-50 text-teal-600 font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 text-sm md:text-base"
              >
                Rent a Surfboard
              </Link>
              <Link
                href="/boats?type=sale"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 border-2 border-white text-sm md:text-base"
              >
                Buy a Surfboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Boats Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto"></div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading boards...</p>
            </div>
          ) : featuredBoats.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {featuredBoats.map((boat) => (
                  <BoatCard key={boat._id} boat={boat} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/boats"
                  className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 text-sm md:text-base"
                >
                  View All Boards
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg">No boats available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section 
        className="py-16 md:py-20 px-4 bg-white relative"
        style={{
          backgroundImage: 'url(/surf-img/about-surf.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for entire section */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-center items-center">
            {/* Text Content Card */}
            <div className="w-full md:w-3/4 lg:w-2/3 p-6 md:p-10 lg:p-12 rounded-2xl text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About SurfWave</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mb-8 mx-auto"></div>
              
              <p className="text-base md:text-lg text-white mb-6 leading-relaxed">
                Welcome to SurfWave, your premier destination for unforgettable ocean adventures at Pottuvil Arugambe Beach. With over a decade of experience in the boating industry, we pride ourselves on delivering exceptional service and premium vessels.
              </p>
              
              <p className="text-base md:text-lg text-white mb-6 leading-relaxed">
                Our passion for the ocean drives us to offer the finest surfboard rental and sales experiences. Whether you're seeking an exhilarating ride, exploring new breaks, or looking to purchase your dream surfboard, SurfWave has the perfect solution for you.
              </p>

              <p className="text-base md:text-lg text-white mb-8 leading-relaxed">
                With a fleet of meticulously maintained boats, experienced crew members, and world-class customer service, we ensure every moment on the water is safe, comfortable, and absolutely unforgettable.
              </p>

              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 text-sm md:text-base"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12 md:mb-16">Why SurfWave?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="text-4xl md:text-5xl mb-4 md:mb-6">🏄</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Premium Collection</h3>
              <p className="text-gray-600 text-sm md:text-lg">
                Hand-picked quality surfboards for every skill level—from beginner-friendly to professional-grade
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="text-4xl md:text-5xl mb-4 md:mb-6">💎</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Best Value</h3>
              <p className="text-gray-600 text-sm md:text-lg">
                Competitive pricing with exclusive discounts and flexible rental options year-round
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="text-4xl md:text-5xl mb-4 md:mb-6">⚡</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Quick Booking</h3>
              <p className="text-gray-600 text-sm md:text-lg">
                Secure instant bookings with professional support and hassle-free transactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-black to-blue-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <p className="text-blue-100 text-xs md:text-lg">Premium Surfboards</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <p className="text-blue-100 text-xs md:text-lg">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9★</div>
              <p className="text-blue-100 text-xs md:text-lg">Top Rated</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100 text-xs md:text-lg">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Catch the Perfect Wave?</h2>
          <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-10">
            Start your surfing adventure today. Browse our collection and find your perfect board
          </p>
          <Link
            href="/boats"
            className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 text-sm md:text-lg"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviewIndex === 0 && (
            <>
            {/* Review 1 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600 text-xs md:text-sm">(5/5)</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                "Amazing quality surfboards and excellent service! Found the perfect board for my skill level. The staff really knows their stuff!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                  SR
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-sm md:text-base">Sarah Rodriguez</p>
                  <p className="text-gray-600 text-xs md:text-sm">Surfer</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600 text-xs md:text-sm">(5/5)</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                "Great selection of boats and excellent customer service. The booking process was smooth, and everything was organized perfectly. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                  MJ
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-sm md:text-base">Michael Johnson</p>
                  <p className="text-gray-600 text-xs md:text-sm">Adventure Seeker</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600 text-xs md:text-sm">(5/5)</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                "Great selection of boards for all skill levels. I rented a few times before buying one. The rental program is perfect for trying before you buy!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                  EW
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-sm md:text-base">Emily Watson</p>
                  <p className="text-gray-600 text-xs md:text-sm">Beginner Surfer</p>
                </div>
              </div>
            </div>
            </>
            )}

            {reviewIndex === 1 && (
            <>
            {/* Review 4 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600 text-xs md:text-sm">(5/5)</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                "Sold my old boards through SurfWave and they made the process simple. Honest pricing and quick handling. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  DK
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-sm md:text-base">David Kumar</p>
                  <p className="text-gray-600 text-xs md:text-sm">Board Seller</p>
                </div>
              </div>
            </div>

            {/* Review 5 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600 text-xs md:text-sm">(5/5)</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                "Best surfboard rental service in the area! All boards are well-maintained, and prices are fair. I rent every weekend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  JL
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-sm md:text-base">Jessica Lee</p>
                  <p className="text-gray-600 text-xs md:text-sm">Frequent Renter</p>
                </div>
              </div>
            </div>

            {/* Review 6 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600 text-xs md:text-sm">(5/5)</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                "Exceptional selection and customer service! Got expert advice on board selection. Really helped me improve my surfing!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  AP
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-sm md:text-base">Alex Patel</p>
                  <p className="text-gray-600 text-xs md:text-sm">Intermediate Surfer</p>
                </div>
              </div>
            </div>
            </>
            )}
            </div>

            {/* Navigation Buttons - Mobile Optimized */}
            <div className="flex justify-between items-center mt-8 md:mt-12 px-2">
              <button
                onClick={() => setReviewIndex(reviewIndex === 0 ? 1 : 0)}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white p-2 md:p-3 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95"
                aria-label="Previous reviews"
              >
                <FaChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              
              {/* Dot Indicators */}
              <div className="flex gap-2 justify-center flex-1 mx-4">
                <button
                  onClick={() => setReviewIndex(0)}
                  className={`h-3 rounded-full transition-all duration-300 ${reviewIndex === 0 ? 'bg-teal-600 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'}`}
                  aria-label="Reviews 1-3"
                ></button>
                <button
                  onClick={() => setReviewIndex(1)}
                  className={`h-3 rounded-full transition-all duration-300 ${reviewIndex === 1 ? 'bg-blue-600 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'}`}
                  aria-label="Reviews 4-6"
                ></button>
              </div>
              
              <button
                onClick={() => setReviewIndex(reviewIndex === 0 ? 1 : 0)}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white p-2 md:p-3 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95"
                aria-label="Next reviews"
              >
                <FaChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
