import { requireAuth, handleResponse, handleError } from '@/middleware/auth';

export async function GET(request) {
  try {
    const authUser = await requireAuth(request);
    if (!authUser || !authUser._id) {
      return handleError('Not authenticated - no user in auth result', 401);
    }

    // User is already fetched from database by requireAuth
    return handleResponse({
      user: {
        id: authUser._id,
        name: authUser.name,
        email: authUser.email,
        role: authUser.role,
        profileImage: authUser.profileImage,
      },
    });
  } catch (error) {
    console.error('Me error:', error);
    return handleError('Failed to fetch user', 500);
  }
}
