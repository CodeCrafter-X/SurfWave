'use client';

import Link from 'next/link';
import { FaImage } from 'react-icons/fa';

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
    <Link href={`/boats/${boat._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 active:scale-100">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          {boat.images && boat.images.length > 0 ? (
            <img
              src={boat.images[0]}
              alt={boat.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <FaImage className="text-4xl sm:text-5xl text-gray-400" />
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-teal-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase shadow-lg">
            {boat.type}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              -{boat.discountPercentage}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-14">{boat.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">{boat.location}</p>

          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
              {boat.category}
            </span>
          </div>

          {/* Info Row */}
          <div className="flex justify-center items-center mb-4 text-xs sm:text-sm text-gray-600">
            <span>{boat.available ? '✅ Available' : '❌ Unavailable'}</span>
          </div>

          {/* Price Section */}
          <div className="border-t pt-3">
            {hasDiscount ? (
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-bold text-teal-600">{getPrice()}</span>
                <span className="text-xs sm:text-sm text-gray-400 line-through">${originalPrice}</span>
              </div>
            ) : (
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{getPrice()}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
