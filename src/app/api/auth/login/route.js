import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { setAuthCookie } from '@/lib/auth';
import { handleResponse, handleError } from '@/middleware/auth';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return handleError('Please provide email and password', 400);
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return handleError('Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return handleError('Invalid credentials', 401);
    }

    // Set auth cookie
    await setAuthCookie(user._id.toString());

    return handleResponse({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return handleError('Login failed', 500);
  }
}
