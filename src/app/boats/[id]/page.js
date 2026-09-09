'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaMapMarkerAlt, FaArrowLeft, FaImage, FaWhatsapp, FaPlus, FaMinus, FaCheck, FaHandPaper, FaStar, FaWater, FaShieldAlt } from 'react-icons/fa';
import { generateWhatsAppLink, generateBuyMessage, generateRentMessage } from '@/lib/whatsapp';

export default function BoatDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [boat, setBoat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [modalOpen, setModalOpen] = useState(false);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  
  // Rental form state
  const [rentalDate, setRentalDate] = useState('');
  const [rentalHours, setRentalHours] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBoat();
  }, []);

  useEffect(() => {
    if (zoom === 100) {
      setPanX(0);
      setPanY(0);
    }
  }, [zoom]);

  async function fetchBoat() {
    try {
      setLoading(true);
      const response = await fetch(`/api/boats/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBoat(data.boat);
      } else {
        setError('Board not found in our surf rack');
      }
    } catch (error) {
      setError('Failed to fetch board details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleMouseDown = (e) => {
    if (zoom > 100) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 100) {
      const container = imageContainerRef.current;
      if (container) {
        const maxPanX = (container.offsetWidth * (zoom - 100)) / 100 / 2;
        const maxPanY = (container.offsetHeight * (zoom - 100)) / 100 / 2;

        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        newX = Math.max(-maxPanX, Math.min(maxPanX, newX));
        newY = Math.max(-maxPanY, Math.min(maxPanY, newY));

        setPanX(newX);
        setPanY(newY);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleBuyClick = () => {
    const buyMessage = generateBuyMessage(boat.title, boat._id, boat.finalPrice || boat.price);
    const whatsappLink = generateWhatsAppLink(buyMessage);
    window.open(whatsappLink, '_blank');
  };

  const handleRentClick = (e) => {
    e.preventDefault();
    if (!rentalDate || !rentalHours || !quantity) {
      setMessage('Please fill in all rental fields');
      return;
    }
    const rentMessage = generateRentMessage(
      boat.title,
      boat._id,
      boat.finalPrice || boat.pricePerHour,
      rentalDate,
      rentalHours,
      quantity
    );
    const whatsappLink = generateWhatsAppLink(rentMessage);
    window.open(whatsappLink, '_blank');
    setMessage('Redirecting to WhatsApp beach station...');
    setModalOpen(false);
  };

  const isRentalFormValid = rentalDate && rentalHours && quantity;

  const nextImage = () => {
    if (boat?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % boat.images.length);
    }
  };

  const prevImage = () => {
    if (boat?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + boat.images.length) % boat.images.length);
    }
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const zoomOut = () => setZoom((prev) => {
    const newZoom = Math.max(prev - 20, 100);
    if (newZoom === 100) {
      setPanX(0);
      setPanY(0);
    }
    return newZoom;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4fbfd]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00b4d8]/20 border-t-[#00f5d4]"></div>
          <p className="mt-4 text-[#0077b6] font-bold">Unlocking Quiver Specs...</p>
        </div>
      </div>
    );
  }

  if (error || !boat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4fbfd] px-4">
        <div className="text-center glass-sea-card p-10 rounded-3xl max-w-md">
          <div className="text-5xl mb-3">🌊</div>
          <p className="text-gray-700 text-lg font-bold mb-4">{error || 'Board not found'}</p>
          <Link href="/boats" className="inline-block bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold py-2.5 px-8 rounded-full shadow-md">
            Back to All Boards
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = boat.discountPercentage > 0 && boat.finalPrice < (boat.type === 'rent' ? boat.pricePerHour : boat.price);
  const originalPrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;

  return (
    <div className="min-h-screen bg-[#f4fbfd] pb-24">
      
      {/* Top Breadcrumb & Back Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/boats"
          className="inline-flex items-center gap-2 text-[#0077b6] hover:text-[#00b4d8] font-bold text-sm transition group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          <span>Back to All Quiver</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left: Image Viewer & Gallery (7 cols) */}
          <div className="lg:col-span-7">
            
            <div 
              ref={imageContainerRef}
              className={`relative bg-gradient-to-br from-[#06283d] to-[#031726] rounded-3xl overflow-hidden mb-4 h-96 sm:h-[450px] flex items-center justify-center shadow-[0_15px_40px_rgba(0,180,216,0.15)] group ${zoom > 100 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
              onMouseDown={handleMouseDown}
            >
              {boat.images && boat.images.length > 0 ? (
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={boat.images[currentImageIndex]}
                    alt={boat.title}
                    className="transition-all duration-300 select-none pointer-events-none rounded-2xl drop-shadow-2xl"
                    style={{
                      transform: `translate(${panX}px, ${panY}px) scale(${zoom / 100})`,
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                    draggable="false"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-[#90e0ef]">
                  <FaImage className="text-6xl text-[#00b4d8] mb-2" />
                  <span className="text-sm font-semibold">No Image Available</span>
                </div>
              )}

              {/* Drag Hint */}
              {zoom > 100 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#031726]/80 text-[#00f5d4] border border-[#00f5d4]/40 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-md">
                  <FaHandPaper size={12} /> <span>Drag to Pan</span>
                </div>
              )}

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#031726]/80 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md">
                <button
                  onClick={zoomOut}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition"
                  title="Zoom Out"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-white px-2 text-xs font-bold w-12 text-center">{zoom}%</span>
                <button
                  onClick={zoomIn}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition"
                  title="Zoom In"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Navigation Arrows */}
              {boat.images && boat.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#031726]/70 hover:bg-[#00f5d4] text-white hover:text-[#031726] w-10 h-10 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#031726]/70 hover:bg-[#00f5d4] text-white hover:text-[#031726] w-10 h-10 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-lg"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Counter */}
              {boat.images && boat.images.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                  {currentImageIndex + 1} / {boat.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {boat.images && boat.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {boat.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setZoom(100);
                    }}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition ${
                      index === currentImageIndex 
                        ? 'border-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`${boat.title} thumbnail ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Board Details & Instant Booking (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  boat.type === 'rent'
                    ? 'bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white'
                    : 'bg-gradient-to-r from-[#00f5d4] to-[#00b4d8] text-[#031726]'
                }`}>
                  {boat.type === 'rent' ? '🌊 Rental Board' : '⚡ For Purchase'}
                </span>

                {hasDiscount && (
                  <span className="bg-gradient-to-r from-[#ff6b6b] to-[#f72585] text-white px-2.5 py-1 rounded-full text-xs font-black shadow-md">
                    {boat.discountPercentage}% OFF
                  </span>
                )}

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  boat.available ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                }`}>
                  {boat.available ? '✓ Ready on Beach' : '✗ Reserved'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-[#031726] tracking-tight mb-3">
                {boat.title}
              </h1>

              {/* Location & Category */}
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[#00b4d8]" />
                  <span>{boat.location || 'Pottuvil Arugam Bay'}</span>
                </span>
                <span className="bg-[#00b4d8]/10 text-[#0077b6] px-2.5 py-0.5 rounded-md">
                  {boat.category || 'Surfboard'}
                </span>
                <span className="flex items-center gap-1 text-[#ffd166]">
                  <FaStar />
                  <span className="text-[#031726]">4.9 (24 reviews)</span>
                </span>
              </div>

              {/* Pricing Box */}
              <div className="glass-sea-card p-5 rounded-3xl mb-6 shadow-sm border border-[#00b4d8]/20">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                  {boat.type === 'rent' ? 'Rental Rate' : 'Purchase Price'}
                </p>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
                    {boat.type === 'rent' ? `$${boat.finalPrice || boat.pricePerHour}/hr` : `$${(boat.finalPrice || boat.price).toLocaleString()}`}
                  </span>
                  
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <p className="text-xs font-bold text-emerald-600 mt-1">
                    🎉 You save ${(originalPrice - (boat.finalPrice || boat.price)).toFixed(0)} today!
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="glass-sea-card p-6 rounded-3xl mb-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0077b6] mb-2">
                  Board Specifications & Wave Profile
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {boat.description || 'Expertly maintained surfboard with responsive flex, balanced volume, and premium rails. Ideal for local point breaks.'}
                </p>
              </div>

              {/* Safety & Perks */}
              <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-semibold text-gray-600">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
                  <span className="text-[#00f5d4]">✓</span> Leash & Wax Included
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
                  <span className="text-[#00f5d4]">✓</span> Instant Beach Pickup
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            {boat.available ? (
              <div className="space-y-3">
                {boat.type === 'rent' ? (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full shimmer-trigger bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black py-4 px-6 rounded-2xl shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition transform hover:scale-102 active:scale-95 flex items-center justify-center gap-2.5 text-base"
                  >
                    <FaWhatsapp size={20} />
                    <span>Reserve on WhatsApp</span>
                  </button>
                ) : (
                  <button
                    onClick={handleBuyClick}
                    className="w-full shimmer-trigger bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black py-4 px-6 rounded-2xl shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition transform hover:scale-102 active:scale-95 flex items-center justify-center gap-2.5 text-base"
                  >
                    <FaWhatsapp size={20} />
                    <span>Buy on WhatsApp</span>
                  </button>
                )}
                <p className="text-xs text-center text-gray-500 font-medium">
                  Direct connection with our Arugam Bay beach station team. Zero reservation booking fees.
                </p>
              </div>
            ) : (
              <div className="glass-sea-card p-6 rounded-2xl text-center">
                <p className="text-gray-700 font-bold text-base">This board is currently in the lineup</p>
                <p className="text-gray-500 text-xs mt-1">Chat on WhatsApp to check when it returns</p>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Rental Modal with Modern Sea Styling */}
      {modalOpen && boat.type === 'rent' && (
        <div className="fixed inset-0 bg-[#031726]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full max-h-screen overflow-y-auto border border-[#00f5d4]/30 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <h2 className="text-xl font-black text-[#031726]">Rental Booking</h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            {message && (
              <div className="mb-4 p-3 rounded-xl text-xs font-bold bg-[#00f5d4]/15 text-[#0077b6]">
                {message}
              </div>
            )}

            <form onSubmit={handleRentClick} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Rental Date 📅
                </label>
                <input
                  type="date"
                  value={rentalDate}
                  onChange={(e) => setRentalDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Duration (Hours) ⏱️
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRentalHours(Math.max(1, rentalHours - 1))}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <FaMinus size={14} />
                  </button>
                  <input
                    type="number"
                    value={rentalHours}
                    onChange={(e) => setRentalHours(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="24"
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center font-bold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setRentalHours(Math.min(24, rentalHours + 1))}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Quantity 🏄
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <FaMinus size={14} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center font-bold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-[#06283d] text-white text-xs space-y-1">
                <p className="text-[#00f5d4] font-bold">📋 Booking Overview:</p>
                <p>Date: <span className="font-bold text-white">{rentalDate || 'Select a date'}</span></p>
                <p>Duration: <span className="font-bold text-white">{rentalHours} hr{rentalHours > 1 ? 's' : ''}</span></p>
                <p>Total Estimated: <span className="font-bold text-[#00f5d4]">${((boat.finalPrice || boat.pricePerHour) * rentalHours * quantity).toFixed(0)}</span></p>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gray-100 font-bold text-xs text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isRentalFormValid}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <FaWhatsapp size={16} />
                  <span>Send to WhatsApp</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
