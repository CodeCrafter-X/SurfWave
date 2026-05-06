import { connectDB } from '@/lib/db';
import { Booking } from '@/models/Booking';
import { requireAuth, requireAdmin, handleResponse, handleError } from '@/middleware/auth';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return handleError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError('Invalid booking ID', 400);
    }

    const booking = await Booking.findById(id).populate('userId', 'name email').populate('boatId');

    if (!booking) {
      return handleError('Booking not found', 404);
    }

    // Check authorization - user can only see their own bookings
    if (user.role !== 'admin' && booking.userId._id.toString() !== user._id.toString()) {
      return handleError('Not authorized', 401);
    }

    return handleResponse({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    return handleError('Failed to fetch booking', 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return handleError('Not authenticated', 401);
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError('Invalid booking ID', 400);
    }

    const data = await request.json();

    // Get booking first to check authorization
    const booking = await Booking.findById(id);
    if (!booking) {
      return handleError('Booking not found', 404);
    }

    // Only admin or the booking owner can update
    if (user.role !== 'admin' && booking.userId.toString() !== user._id.toString()) {
      return handleError('Not authorized', 401);
    }

    // Only admin can change status
    if (data.status && user.role !== 'admin') {
      return handleError('Only admin can change booking status', 401);
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('userId', 'name email').populate('boatId');

    return handleResponse({
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Update booking error:', error);
    return handleError('Failed to update booking', 500);
  }
}
