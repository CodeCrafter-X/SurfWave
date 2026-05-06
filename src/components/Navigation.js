'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    
    // Set up an interval to check auth periodically
    const interval = setInterval(checkAuth, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST', 
        credentials: 'include',
      });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-teal-100 transition">
            🌊 SurfWave
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-teal-100 transition font-medium">
              Home
            </Link>
            <Link href="/boats" className="hover:text-teal-100 transition font-medium">
              Boats
            </Link>
            <Link href="/contact" className="hover:text-teal-100 transition font-medium">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                {/* <span className="text-sm font-medium">{user.name}</span> */}
                <Link
                  href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
                >
                  <FaUser size={18} />
                  {user.role === 'admin' ? 'Dashboard' : 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link href="/login" className="bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-lg font-bold transition flex items-center gap-2">
                  <FaSignInAlt size={18} />
                  Sign In
                </Link>
                <Link href="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold transition flex items-center gap-2">
                  <FaUserPlus size={18} />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? '×' : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-gradient-to-b from-teal-700 to-blue-700 rounded-lg mx-2 my-2 p-4 shadow-lg">
            <Link href="/" className="block px-4 py-3 hover:bg-teal-600 hover:bg-opacity-60 rounded font-medium text-center text-white">
              Home
            </Link>
            <Link href="/boats" className="block px-4 py-3 hover:bg-teal-600 hover:bg-opacity-60 rounded font-medium text-center text-white">
              Boards
            </Link>
            <Link href="/contact" className="block px-4 py-3 hover:bg-teal-600 hover:bg-opacity-60 rounded font-medium text-center text-white">
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="block px-4 py-3 bg-teal-800 rounded hover:bg-teal-900 font-bold text-center flex items-center justify-center gap-2 text-white"
                >
                  <FaUser size={18} />
                  {user.role === 'admin' ? 'Dashboard' : 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-600 rounded hover:bg-red-700 font-bold text-center flex items-center justify-center gap-2 text-white"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-3 bg-teal-800 rounded hover:bg-teal-900 font-bold text-center text-white">
                  Sign In
                </Link>
                <Link href="/register" className="block px-4 py-3 bg-green-600 rounded hover:bg-green-700 font-bold text-center text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
