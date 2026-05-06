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
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105">
        {/* Image */}
        <div className="relative w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          {boat.images && boat.images.length > 0 ? (
            <img
              src={boat.images[0]}
              alt={boat.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <FaImage className="text-5xl text-gray-400" />
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
            {boat.type}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{boat.discountPercentage}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{boat.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{boat.location}</p>

          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {boat.category}
            </span>
          </div>

          {/* Info Row */}
          <div className="flex justify-center items-center mb-4 text-sm text-gray-600">
            <span>{boat.available ? '✅ Available' : '❌ Unavailable'}</span>
          </div>

          {/* Price Section */}
          <div className="border-t pt-3">
            {hasDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-teal-600">{getPrice()}</span>
                <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-900">{getPrice()}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
