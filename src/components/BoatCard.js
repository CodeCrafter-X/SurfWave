'use client';

import Link from 'next/link';
import { FaImage, FaWhatsapp, FaStar, FaMapMarkerAlt, FaWaveSquare } from 'react-icons/fa';
import { generateInquiryMessage, generateWhatsAppLink } from '@/lib/whatsapp';

export default function BoatCard({ boat }) {
  const getPrice = () => {
    if (boat.type === 'rent') {
      return `$${boat.finalPrice || boat.pricePerHour}/hr`;
    }
    return `$${(boat.finalPrice || boat.price).toLocaleString()}`;
  };

  const hasDiscount = boat.discountPercentage > 0 && boat.finalPrice < (boat.type === 'rent' ? boat.pricePerHour : boat.price);
  const originalPrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;

  function handleInquiry(e) {
    e.stopPropagation();
    const message = generateInquiryMessage(boat.title, boat._id, boat.type, boat.finalPrice || originalPrice);
    window.open(generateWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="group relative glass-sea-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(0,180,216,0.25)] hover:border-[#00f5d4]/60 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative w-full h-60 sm:h-64 overflow-hidden bg-gradient-to-br from-[#06283d] to-[#031726] shimmer-trigger">
        {boat.images && boat.images.length > 0 ? (
          <Link href={`/boats/${boat._id}`} className="block w-full h-full">
            <img
              src={boat.images[0]}
              alt={boat.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
          </Link>
        ) : (
          <Link href={`/boats/${boat._id}`} className="flex flex-col items-center justify-center w-full h-full bg-[#06283d] text-[#90e0ef]">
            <FaImage className="text-4xl text-[#00b4d8] mb-2" />
            <span className="text-xs font-semibold">No Image Preview</span>
          </Link>
        )}

        {/* Ambient Oceanic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#031726]/80 via-transparent to-black/20 pointer-events-none"></div>

        {/* Type Badge (Rental / Sale) */}
        <div className="absolute top-3.5 right-3.5">
          <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-lg backdrop-blur-md ${
            boat.type === 'rent'
              ? 'bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white border border-white/20'
              : 'bg-gradient-to-r from-[#00f5d4] to-[#00b4d8] text-[#031726] border border-white/40'
          }`}>
            {boat.type === 'rent' ? '🌊 Rental' : '⚡ For Sale'}
          </span>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-[#ff6b6b] to-[#f72585] text-white px-2.5 py-1 rounded-full text-xs font-black shadow-[0_0_15px_rgba(255,107,107,0.6)] animate-pulse">
            SAVE {boat.discountPercentage}%
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute bottom-3 left-3.5">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md ${
            boat.available 
              ? 'bg-[#00f5d4]/20 border border-[#00f5d4]/60 text-[#00f5d4]' 
              : 'bg-black/50 border border-white/20 text-gray-300'
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${boat.available ? 'bg-[#00f5d4] animate-ping' : 'bg-gray-400'}`}></span>
            {boat.available ? 'Ready to Ride' : 'Reserved'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white/70 backdrop-blur-sm">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0077b6] bg-[#00b4d8]/10 px-2.5 py-0.5 rounded-md border border-[#00b4d8]/20">
              {boat.category || 'Surfboard'}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#06283d]">
              <FaStar className="text-[#ffd166]" size={12} />
              <span>4.9</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/boats/${boat._id}`}>
            <h3 className="text-base sm:text-lg font-bold text-[#031726] mb-2 line-clamp-1 group-hover:text-[#0077b6] transition-colors duration-200">
              {boat.title}
            </h3>
          </Link>
          
          {/* Location */}
          <p className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-[#00b4d8]" size={12} />
            <span>{boat.location || 'Pottuvil Arugam Bay'}</span>
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Pricing</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
                  {getPrice()}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-gray-400 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
            </div>

            {hasDiscount && (
              <span className="text-[11px] font-bold text-[#ff6b6b] bg-[#ff6b6b]/10 px-2 py-0.5 rounded-full">
                Save ${(originalPrice - (boat.finalPrice || boat.price)).toFixed(0)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            <Link
              href={`/boats/${boat._id}`}
              className="col-span-2 py-2.5 px-3 rounded-2xl font-bold text-xs text-[#06283d] bg-gray-100 hover:bg-[#e0fbfc] hover:text-[#0077b6] transition text-center flex items-center justify-center"
            >
              Details
            </Link>

            {boat.available ? (
              <button
                type="button"
                onClick={handleInquiry}
                className="col-span-3 shimmer-trigger bg-gradient-to-r from-[#00b4d8] via-[#00f5d4] to-[#00b4d8] animate-sea-gradient text-[#031726] font-extrabold py-2.5 px-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(0,245,212,0.35)] hover:shadow-[0_6px_22px_rgba(0,245,212,0.6)] transform hover:scale-102 active:scale-95 text-xs"
              >
                <FaWhatsapp size={14} className="text-[#031726]" />
                <span>Book Now</span>
              </button>
            ) : (
              <button
                disabled
                className="col-span-3 bg-gray-200 text-gray-400 font-bold py-2.5 px-3 rounded-2xl cursor-not-allowed text-xs text-center"
              >
                Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
