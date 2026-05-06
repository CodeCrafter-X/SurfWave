import { clearAuthCookie } from '@/lib/auth';
import { handleResponse } from '@/middleware/auth';

export async function POST(request) {
  try {
    await clearAuthCookie();
    return handleResponse({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return handleResponse({ error: 'Logout failed' }, 500);
  }
}
