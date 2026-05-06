'use client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaMapMarkerAlt, FaUsers, FaArrowLeft, FaImage, FaCheck } from 'react-icons/fa';

export default function BoatDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [boat, setBoat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState('1');
  const [bookingMessage, setBookingMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchBoat();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

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

  async function handleBooking(e) {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          boatId: id,
          date: bookingDate,
          time: bookingTime,
          duration: parseInt(bookingDuration),
        }),
      });

      if (response.ok) {
        setBookingMessage('Booking confirmed! Check your dashboard for details.');
        setBookingDate('');
        setBookingTime('');
        setBookingDuration('1');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        const data = await response.json();
        setBookingMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setBookingMessage('Failed to create booking');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading boat details...</p>
        </div>
      </div>
    );
  }

  if (error || !boat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || 'Boat not found'}</p>
          <Link href="/boats" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg">
            Back to Boats
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = boat.discountPercentage > 0 && boat.finalPrice < (boat.type === 'rent' ? boat.pricePerHour : boat.price);
  const originalPrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;
  const calculateTotalPrice = () => {
    if (boat.type !== 'rent') return boat.finalPrice;
    const basePrice = boat.finalPrice || boat.pricePerHour;
    return basePrice * parseInt(bookingDuration);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/boats"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold"
        >
          <FaArrowLeft /> Back to Boats
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 h-96">
              {boat.images && boat.images.length > 0 ? (
                <img
                  src={boat.images[currentImageIndex]}
                  alt={boat.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <FaImage className="text-6xl text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {boat.images && boat.images.length > 1 && (
              <div className="flex gap-2">
                {boat.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${boat.title} ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Boat Details */}
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
              {/* <div className="flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                <span>Capacity: {boat.capacity} people</span>
              </div> */}
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
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{boat.description}</p>
            </div>

            {/* Booking Form (Only for Rent) */}
            {boat.type === 'rent' ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Boat</h3>

                {bookingMessage && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    bookingMessage.includes('confirmed') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {bookingMessage}
                  </div>
                )}

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
                    <input
                      type="number"
                      value={bookingDuration}
                      onChange={(e) => setBookingDuration(e.target.value)}
                      min="1"
                      max="24"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-2xl font-bold text-blue-600">${calculateTotalPrice().toFixed(2)}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    <FaCheck className="inline mr-2" /> Book Now
                  </button>

                  {!isAuthenticated && (
                    <p className="text-sm text-center text-gray-600">
                      You'll be redirected to login to complete your booking
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <p className="text-gray-700 mb-4">Interested in purchasing this boat?</p>
                <a
                  href="https://wa.me/94727578276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Contact via WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
