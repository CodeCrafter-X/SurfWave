import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireAuth, handleResponse, handleError } from '@/middleware/auth';

// Allow authenticated users to update their own profile
export async function PUT(request) {
  try {
    // Verify user is authenticated
    const authUser = await requireAuth(request);
    if (!authUser) {
      return handleError('Unauthorized', 401);
    }

    await connectDB();
    const body = await request.json();

    // Update only allowed fields
    const updateData = {
      name: body.name,
    };

    // Add profileImage if provided
    if (body.profileImage !== undefined) {
      updateData.profileImage = body.profileImage;
    }

    const user = await User.findByIdAndUpdate(authUser._id, updateData, { new: true }).select('-password');

    if (!user) {
      return handleError('User not found', 404);
    }

    return handleResponse({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return handleError(error.message, 400);
  }
}
