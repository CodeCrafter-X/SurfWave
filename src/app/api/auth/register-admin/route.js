import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { setAuthCookie } from '@/lib/auth';
import { handleResponse, handleError } from '@/middleware/auth';

export async function POST(request) {
  try {
    const { name, email, password, registrationCode } = await request.json();

    const expectedCode = process.env.ADMIN_REGISTRATION_CODE?.trim();
    if (!expectedCode || registrationCode?.trim() !== expectedCode) {
      return handleError('Invalid registration code', 403);
    }
    if (!name?.trim() || !email?.trim() || !password) {
      return handleError('Name, email, and password are required', 400);
    }
    if (password.length < 6) {
      return handleError('Password must be at least 6 characters', 400);
    }

    await connectDB();
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) {
      return handleError('An account with this email already exists', 409);
    }

    const admin = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'admin',
    });
    await setAuthCookie(admin._id.toString());

    return handleResponse({
      message: 'Admin account created successfully',
      user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    }, 201);
  } catch (error) {
    console.error('Admin registration error:', error);
    if (error.name === 'ValidationError') {
      return handleError(Object.values(error.errors).map((entry) => entry.message).join(', '), 400);
    }
    return handleError('Failed to create admin account', 500);
  }
}
