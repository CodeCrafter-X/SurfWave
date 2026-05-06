import { connectDB } from '@/lib/db';
import { Booking } from '@/models/Booking';
import { Boat } from '@/models/Boat';
import { requireAuth, handleResponse, handleError } from '@/middleware/auth';

export async function GET(request) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return handleError('Not authenticated', 401);
    }

    await connectDB();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    let query = {};

    // Admins can see all bookings, users can only see their own
    if (user.role !== 'admin') {
      query.userId = user._id;
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .populate('boatId', 'title images type pricePerHour price category')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    // Map booking details for easier frontend access
    const mappedBookings = bookings.map((booking) => {
      const bookingObj = booking.toObject();
      return {
        ...bookingObj,
        customerName: booking.userId?.name || 'N/A',
        customerEmail: booking.userId?.email || 'N/A',
        boatName: booking.boatId?.title || 'N/A',
        boatType: booking.boatId?.type || 'N/A',
        boatCategory: booking.boatId?.category || 'N/A',
      };
    });

    return handleResponse({
      bookings: mappedBookings,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    return handleError('Failed to fetch bookings', 500);
  }
}

export async function POST(request) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return handleError('Not authenticated', 401);
    }

    await connectDB();

    const { boatId, date, time, duration } = await request.json();

    if (!boatId || !date || !time || !duration) {
      return handleError('Please provide all required fields', 400);
    }

    if (duration < 1) {
      return handleError('Duration must be at least 1 hour', 400);
    }

    // Get boat
    const boat = await Boat.findById(boatId);
    if (!boat) {
      return handleError('Boat not found', 404);
    }

    // Only rent boats can be booked
    if (boat.type !== 'rent') {
      return handleError('This boat is for sale, not rent', 400);
    }

    // Calculate total price
    const basePrice = boat.pricePerHour;
    let totalPrice = basePrice * duration;

    // Apply discount if valid
    const now = new Date();
    const isDiscountValid =
      boat.discountPercentage > 0 &&
      boat.discountStartDate &&
      boat.discountEndDate &&
      now >= boat.discountStartDate &&
      now <= boat.discountEndDate;

    if (isDiscountValid) {
      totalPrice = totalPrice - (totalPrice * boat.discountPercentage) / 100;
    }

    // Create booking
    const booking = await Booking.create({
      userId: user._id,
      boatId,
      date: new Date(date),
      time,
      duration,
      totalPrice,
      status: 'pending',
    });

    const populatedBooking = await booking.populate('boatId', 'title images');

    return handleResponse(
      {
        message: 'Booking created successfully',
        booking: populatedBooking,
      },
      201
    );
  } catch (error) {
    console.error('Create booking error:', error);
    return handleError('Failed to create booking', 500);
  }
}
