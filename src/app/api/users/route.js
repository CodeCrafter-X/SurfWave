import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireAdmin, handleResponse, handleError } from '@/middleware/auth';

export async function GET(request) {
  try {
    await connectDB();
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return handleError('Unauthorized', 401);
    }

    const users = await User.find({}).select('-password');
    return handleResponse({ users });
  } catch (error) {
    return handleError('Failed to fetch users', 500);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return handleError('Unauthorized', 401);
    }

    const body = await request.json();
    const user = await User.create(body);
    
    return handleResponse({ user }, 201);
  } catch (error) {
    return handleError(error.message, 400);
  }
}
