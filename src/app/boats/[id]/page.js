'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaMapMarkerAlt, FaArrowLeft, FaImage, FaWhatsapp, FaPlus, FaMinus, FaCheck, FaHandPaper } from 'react-icons/fa';
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
    // Reset pan when zoom changes
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
        setError('Boat not found');
      }
    } catch (error) {
      setError('Failed to fetch boat details');
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
  }, [isDragging, dragStart, zoom, panX, panY]);

  const handleBuyClick = () => {
    if (!boat) return;
    const buyMessage = generateBuyMessage(boat.title, boat._id, boat.finalPrice || boat.price);
    const whatsappLink = generateWhatsAppLink(buyMessage);
    window.open(whatsappLink, '_blank');
  };

  const handleRentClick = (e) => {
    e.preventDefault();
    
    if (!rentalDate) {
      setMessage('Please select a rental date');
      return;
    }

    if (!boat) return;
    const rentMessage = generateRentMessage(boat.title, boat._id, rentalDate, rentalHours, quantity);
    const whatsappLink = generateWhatsAppLink(rentMessage);
    window.open(whatsappLink, '_blank');
    setMessage('Redirecting to WhatsApp...');
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

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 200));
  };
  const zoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 20, 100);
      if (newZoom === 100) {
        setPanX(0);
        setPanY(0);
      }
      return newZoom;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading board details...</p>
        </div>
      </div>
    );
  }

  if (error || !boat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || 'Board not found'}</p>
          <Link href="/boats" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg">
            Back to Boards
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = boat.discountPercentage > 0 && boat.finalPrice < (boat.type === 'rent' ? boat.pricePerHour : boat.price);
  const originalPrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/boats"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold"
        >
          <FaArrowLeft /> Back to Boards
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery with Zoom */}
          <div>
            {/* Main Image with Zoom and Pan */}
            <div 
              ref={imageContainerRef}
              className={`relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-4 h-96 flex items-center justify-center group ${zoom > 100 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
              onMouseDown={handleMouseDown}
            >
              {boat.images && boat.images.length > 0 ? (
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <img
                    src={boat.images[currentImageIndex]}
                    alt={boat.title}
                    className="transition-all duration-300 select-none pointer-events-none"
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
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <FaImage className="text-6xl text-gray-400" />
                </div>
              )}

              {/* Zoom/Pan Hint */}
              {zoom > 100 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 animate-pulse">
                  <FaHandPaper size={14} /> Drag to move
                </div>
              )}

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex gap-2 bg-black bg-opacity-60 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={zoomOut}
                  className="bg-white text-black p-2 rounded hover:bg-gray-200 transition transform hover:scale-110 active:scale-95"
                  title="Zoom Out"
                >
                  <FaMinus size={16} />
                </button>
                <span className="text-white px-3 py-2 text-sm font-semibold w-12 text-center">{zoom}%</span>
                <button
                  onClick={zoomIn}
                  className="bg-white text-black p-2 rounded hover:bg-gray-200 transition transform hover:scale-110 active:scale-95"
                  title="Zoom In"
                >
                  <FaPlus size={16} />
                </button>
              </div>

              {/* Navigation Arrows */}
              {boat.images && boat.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition transform hover:scale-110 active:scale-95"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition transform hover:scale-110 active:scale-95"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Image Counter */}
              {boat.images && boat.images.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {currentImageIndex + 1} / {boat.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {boat.images && boat.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {boat.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setZoom(100);
                    }}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                      index === currentImageIndex ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img src={image} alt={`${boat.title} ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {/* Badge */}
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {boat.type}
              </span>
              {hasDiscount && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {boat.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{boat.title}</h1>

            {/* Info */}
            <div className="flex flex-col gap-3 mb-6 text-gray-700">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>{boat.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded">{boat.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              {hasDiscount ? (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Discounted Price</p>
                    <p className="text-3xl font-bold text-green-600">
                      {boat.type === 'rent' ? `$${boat.finalPrice}/hr` : `$${boat.finalPrice.toLocaleString()}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Original Price</p>
                    <p className="text-xl line-through text-gray-500">
                      {boat.type === 'rent' ? `$${originalPrice}/hr` : `$${originalPrice.toLocaleString()}`}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {boat.type === 'rent' ? `$${boat.finalPrice}/hr` : `$${boat.finalPrice.toLocaleString()}`}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{boat.description}</p>
            </div>

            {/* Contact Buttons */}
            {boat.available ? (
              <div className="space-y-3">
                {boat.type === 'rent' ? (
                  <>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                      <FaWhatsapp size={20} />
                      Connect on WhatsApp to Rent
                    </button>
                    <p className="text-xs text-center text-gray-600">
                      Select your rental details and we'll connect you with the owner
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleBuyClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                      <FaWhatsapp size={20} />
                      Connect on WhatsApp to Buy
                    </button>
                    <p className="text-xs text-center text-gray-600">
                      Chat directly with the owner to discuss purchase details
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-gray-700 text-lg font-semibold">This board is currently unavailable</p>
                <p className="text-gray-600 mt-2">Please check back soon or contact us for more options</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rental Details Modal */}
      {modalOpen && boat.type === 'rent' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Details</h2>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes('Redirecting') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleRentClick} className="space-y-5">
              {/* Rental Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  When would you like to rent? 📅
                </label>
                <input
                  type="date"
                  value={rentalDate}
                  onChange={(e) => {
                    setRentalDate(e.target.value);
                    setMessage('');
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Rental Hours */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  How many hours? ⏱️
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRentalHours(Math.max(1, rentalHours - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg transition"
                  >
                    <FaMinus size={18} />
                  </button>
                  <input
                    type="number"
                    value={rentalHours}
                    onChange={(e) => setRentalHours(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="24"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:border-blue-600 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setRentalHours(Math.min(24, rentalHours + 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg transition"
                  >
                    <FaPlus size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Min: 1 hour | Max: 24 hours</p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  How many boards? 🏄
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg transition"
                  >
                    <FaMinus size={18} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:border-blue-600 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg transition"
                  >
                    <FaPlus size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Default: 1 board</p>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">📋 Rental Summary:</p>
                <div className="space-y-1 text-sm font-semibold text-gray-900">
                  <p>Date: <span className="text-blue-600">{rentalDate ? new Date(rentalDate).toLocaleDateString() : 'Not selected'}</span></p>
                  <p>Duration: <span className="text-blue-600">{rentalHours} hour{rentalHours > 1 ? 's' : ''}</span></p>
                  <p>Quantity: <span className="text-blue-600">{quantity} board{quantity > 1 ? 's' : ''}</span></p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isRentalFormValid}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition transform ${
                    isRentalFormValid
                      ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaWhatsapp size={18} />
                  Send to WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
