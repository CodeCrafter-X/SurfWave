import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { setAuthCookie } from '@/lib/auth';
import { handleResponse, handleError } from '@/middleware/auth';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password, confirmPassword } = await request.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return handleError('Please provide all required fields', 400);
    }

    if (password !== confirmPassword) {
      return handleError('Passwords do not match', 400);
    }

    if (password.length < 6) {
      return handleError('Password must be at least 6 characters', 400);
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return handleError('Email already registered', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // Set auth cookie and generate token
    await setAuthCookie(user._id.toString());

    return handleResponse(
      {
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      201
    );
  } catch (error) {
    console.error('Register error:', error);
    return handleError('Registration failed', 500);
  }
}
