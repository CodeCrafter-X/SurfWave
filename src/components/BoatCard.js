'use client';

import Link from 'next/link';
import { FaImage, FaWhatsapp, FaStar } from 'react-icons/fa';

export default function BoatCard({ boat }) {
  const getPrice = () => {
    if (boat.type === 'rent') {
      return `$${boat.finalPrice || boat.pricePerHour}/hr`;
    }
    return `$${(boat.finalPrice || boat.price).toLocaleString()}`;
  };

  const hasDiscount = boat.discountPercentage > 0 && boat.finalPrice < (boat.type === 'rent' ? boat.pricePerHour : boat.price);
  const originalPrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-102">
      {/* Image Container with Overlay */}
      <div className="relative w-full h-56 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {boat.images && boat.images.length > 0 ? (
          <Link href={`/boats/${boat._id}`}>
            <img
              src={boat.images[0]}
              alt={boat.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
        ) : (
          <Link href={`/boats/${boat._id}`} className="flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 w-full h-full">
            <FaImage className="text-4xl sm:text-5xl text-gray-500" />
          </Link>
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          {boat.type}
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
            -{boat.discountPercentage}%
          </div>
        )}

        {/* Available Badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <span className={`inline-block text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg ${
            boat.available 
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
              : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
          }`}>
            {boat.available ? '✓ Available' : '✗ Unavailable'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-14 group-hover:text-teal-600 transition-colors duration-300">{boat.title}</h3>
        
        {/* Location */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 flex items-center gap-1">
          <span>📍</span> {boat.location}
        </p>

        {/* Category Badge */}
        <div className="mb-4 inline-flex items-center">
          <span className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
            {boat.category}
          </span>
          {boat.available && (
            <span className="ml-2 inline-block text-yellow-400">
              <FaStar size={14} />
            </span>
          )}
        </div>

        {/* Rating/Reviews (mockup) */}
        <div className="flex items-center mb-4 text-xs sm:text-sm text-gray-600">
          <span className="text-yellow-400 flex gap-0.5">★★★★★</span>
          <span className="ml-2">(4.9)</span>
        </div>

        {/* Price Section */}
        <div className="border-t border-gray-200 pt-4 mb-4">
          {hasDiscount ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">{getPrice()}</span>
              <span className="text-xs sm:text-sm text-gray-400 line-through">${originalPrice}</span>
              <span className="text-xs font-bold text-green-600 ml-auto">Save ${(originalPrice - (boat.finalPrice || boat.price)).toFixed(2)}</span>
            </div>
          ) : (
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">{getPrice()}</div>
          )}
        </div>

        {/* View Details Button */}
        {boat.available ? (
          <Link
            href={`/boats/${boat._id}`}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <FaWhatsapp size={16} />
            <span>Quick Chat</span>
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-2.5 px-3 rounded-xl cursor-not-allowed opacity-60"
          >
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}
