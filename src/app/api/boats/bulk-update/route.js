import { connectDB } from '@/lib/db';
import { Boat } from '@/models/Boat';
import { requireAdmin, handleResponse, handleError } from '@/middleware/auth';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    const user = await requireAdmin(request);
    if (!user) {
      return handleError('Not authorized', 401);
    }

    await connectDB();

    const { ids, updateData } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return handleError('Please provide an array of boat IDs', 400);
    }

    if (!updateData || typeof updateData !== 'object') {
      return handleError('Please provide update data', 400);
    }

    // Validate all IDs
    const validIds = ids.every((id) => mongoose.Types.ObjectId.isValid(id));
    if (!validIds) {
      return handleError('One or more invalid boat IDs', 400);
    }

    // Update multiple boats
    const result = await Boat.updateMany({ _id: { $in: ids } }, updateData);

    return handleResponse({
      message: `Updated ${result.modifiedCount} boats successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    return handleError('Failed to update boats', 500);
  }
}
