import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireAdmin, handleResponse, handleError } from '@/middleware/auth';

export async function PUT(request, { params }) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return handleError('Not authorized', 401);
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError('Invalid user ID', 400);
    }

    const { name, email } = await request.json();
    if (!name?.trim() || !email?.trim()) {
      return handleError('Name and email are required', 400);
    }

    await connectDB();
    const user = await User.findByIdAndUpdate(
      id,
      { name: name.trim(), email: email.trim().toLowerCase() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user || user.role !== 'admin') {
      return handleError('Admin user not found', 404);
    }

    return handleResponse({ user });
  } catch (error) {
    if (error.code === 11000) {
      return handleError('That email address is already in use', 409);
    }
    console.error('Update user error:', error);
    return handleError('Failed to update admin profile', 500);
  }
}
