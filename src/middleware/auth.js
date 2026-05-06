import { verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

// Verify authentication and extract user from JWT
export async function requireAuth(req) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    console.log('Auth middleware: looking for auth_token cookie');
    console.log('Cookies available:', Array.from(req.cookies).map(c => c[0]));
    
    if (!token) {
      console.log('No auth_token found in cookies');
      return null;
    }

    console.log('Found auth_token, verifying...');
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      console.log('Token verification failed');
      return null;
    }

    console.log('Token verified, userId:', decoded.userId);
    
    // Fetch full user from database
    await connectDB();
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

// Check if user has admin role - can be called with request object or user object
export async function requireAdmin(reqOrUser) {
  // If it's a request object, extract the user first
  if (reqOrUser && typeof reqOrUser.cookies === 'object') {
    const user = await requireAuth(reqOrUser);
    return user && user.role === 'admin' ? user : null;
  }
  // Otherwise assume it's a user object
  return reqOrUser && reqOrUser.role === 'admin' ? reqOrUser : null;
}

// Format success response
export function handleResponse(data, status = 200) {
  return NextResponse.json(data, { status });
}

// Format error response
export function handleError(message, status = 500) {
  console.error('API Error:', message);
  return NextResponse.json({ error: message }, { status });
}
