'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaHome, FaPhone } from 'react-icons/fa';

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
      setIsOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold hover:text-teal-100 transition whitespace-nowrap">
            🌊 SurfWave
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-teal-100 transition font-medium text-lg">
              Home
            </Link>
            <Link href="/boats" className="hover:text-teal-100 transition font-medium text-lg">
              Boards
            </Link>
            <Link href="/contact" className="hover:text-teal-100 transition font-medium text-lg">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4 ml-8 border-l-2 border-teal-400 pl-8">
                <Link
                  href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="bg-white text-teal-600 hover:bg-teal-50 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <FaUser size={18} />
                  {user.role === 'admin' ? 'Admin' : 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-8 border-l-2 border-teal-400 pl-8">
                <Link href="/login" className="bg-white text-teal-600 hover:bg-teal-50 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg">
                  <FaSignInAlt size={18} />
                  Sign In
                </Link>
                <Link href="/register" className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg">
                  <FaUserPlus size={18} />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl p-2 hover:bg-teal-700 rounded-lg transition"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 bg-gradient-to-b from-teal-700 to-blue-800 border-t-2 border-teal-500">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <Link 
                href="/" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-5 py-3 hover:bg-teal-600 hover:bg-opacity-70 rounded-xl font-medium text-white transition transform hover:translate-x-1"
              >
                <FaHome size={20} />
                <span className="text-lg">Home</span>
              </Link>
              <Link 
                href="/boats" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-5 py-3 hover:bg-teal-600 hover:bg-opacity-70 rounded-xl font-medium text-white transition transform hover:translate-x-1"
              >
                <span className="text-xl">🏄</span>
                <span className="text-lg">Browse Boards</span>
              </Link>
              <Link 
                href="/contact" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-5 py-3 hover:bg-teal-600 hover:bg-opacity-70 rounded-xl font-medium text-white transition transform hover:translate-x-1"
              >
                <FaPhone size={20} />
                <span className="text-lg">Contact</span>
              </Link>

              {/* Divider */}
              <div className="my-2 border-t border-teal-500 opacity-50"></div>

              {/* Auth Section */}
              {user ? (
                <>
                  <div className="px-5 py-3 bg-blue-900 bg-opacity-50 rounded-xl">
                    <p className="text-sm text-blue-100 mb-1">Logged in as:</p>
                    <p className="font-bold text-white text-lg">{user.name}</p>
                    <p className="text-xs text-blue-100 capitalize">{user.role}</p>
                  </div>
                  <Link
                    href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    onClick={closeMobileMenu}
                    className="w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                  >
                    <FaUser size={20} />
                    {user.role === 'admin' ? 'Admin Dashboard' : 'My Profile'}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                  >
                    <FaSignOutAlt size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={closeMobileMenu}
                    className="w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                  >
                    <FaSignInAlt size={20} />
                    Sign In
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={closeMobileMenu}
                    className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                  >
                    <FaUserPlus size={20} />
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
