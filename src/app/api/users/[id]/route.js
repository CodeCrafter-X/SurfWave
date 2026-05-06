import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireAdmin, handleResponse, handleError } from '@/middleware/auth';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return handleError('Unauthorized', 401);
    }

    const user = await User.findById(params.id).select('-password');
    
    if (!user) {
      return handleError('User not found', 404);
    }

    return handleResponse({ user });
  } catch (error) {
    return handleError('Failed to fetch user', 500);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return handleError('Unauthorized', 401);
    }

    const body = await request.json();
    const user = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password');
    
    if (!user) {
      return handleError('User not found', 404);
    }

    return handleResponse({ user });
  } catch (error) {
    return handleError(error.message, 400);
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return handleError('Unauthorized', 401);
    }

    const user = await User.findByIdAndDelete(params.id);
    
    if (!user) {
      return handleError('User not found', 404);
    }

    return handleResponse({ message: 'User deleted successfully' });
  } catch (error) {
    return handleError('Failed to delete user', 500);
  }
}
