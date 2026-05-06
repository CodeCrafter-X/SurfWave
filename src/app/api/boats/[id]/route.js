import { connectDB } from '@/lib/db';
import { Boat } from '@/models/Boat';
import { requireAuth, requireAdmin, handleResponse, handleError } from '@/middleware/auth';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError('Invalid boat ID', 400);
    }

    const boat = await Boat.findById(id).populate('createdBy', 'name email');
    if (!boat) {
      return handleError('Boat not found', 404);
    }

    return handleResponse({
      boat: { ...boat.toObject(), finalPrice: calculateFinalPrice(boat) },
    });
  } catch (error) {
    console.error('Get boat error:', error);
    return handleError('Failed to fetch boat', 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await requireAdmin(request);
    if (!user) {
      return handleError('Not authorized', 401);
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError('Invalid boat ID', 400);
    }

    const data = await request.json();

    const boat = await Boat.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!boat) {
      return handleError('Boat not found', 404);
    }

    return handleResponse({
      message: 'Boat updated successfully',
      boat: { ...boat.toObject(), finalPrice: calculateFinalPrice(boat) },
    });
  } catch (error) {
    console.error('Update boat error:', error);
    return handleError('Failed to update boat', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await requireAdmin(request);
    if (!user) {
      return handleError('Not authorized', 401);
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError('Invalid boat ID', 400);
    }

    const boat = await Boat.findByIdAndDelete(id);
    if (!boat) {
      return handleError('Boat not found', 404);
    }

    return handleResponse({ message: 'Boat deleted successfully' });
  } catch (error) {
    console.error('Delete boat error:', error);
    return handleError('Failed to delete boat', 500);
  }
}

function calculateFinalPrice(boat) {
  const basePrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;
  if (!basePrice) return basePrice;

  const now = new Date();
  const isDiscountValid =
    boat.discountPercentage > 0 &&
    boat.discountStartDate &&
    boat.discountEndDate &&
    now >= boat.discountStartDate &&
    now <= boat.discountEndDate;

  if (isDiscountValid) {
    return basePrice - (basePrice * boat.discountPercentage) / 100;
  }

  return basePrice;
}
