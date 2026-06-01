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
    <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white sticky top-0 z-50 shadow-2xl border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="relative h-12 md:h-14 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg group-hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <img src="/surf-img/rimaz-logo.jpeg" alt="SurfWave Logo" className="h-10 md:h-12 object-contain drop-shadow-lg" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-300 transition font-medium text-lg relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/boats" className="hover:text-blue-300 transition font-medium text-lg relative group">
              Boards
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="hover:text-blue-300 transition font-medium text-lg relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user && user.role === 'admin' ? (
              <div className="flex items-center gap-4 ml-8 border-l-2 border-blue-600 pl-8">
                <Link
                  href="/admin/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <FaUser size={18} />
                  Admin Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </div>
            ) : user ? (
              <div className="flex items-center gap-4 ml-8 border-l-2 border-blue-600 pl-8">
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-8 border-l-2 border-blue-600 pl-8">
                <Link href="/login" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                  <FaSignInAlt size={18} />
                  Admin Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl p-2 hover:bg-blue-800 rounded-lg transition transform hover:scale-110"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 bg-gradient-to-b from-blue-900 to-gray-900 border-t-2 border-blue-700">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <Link 
                href="/" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 rounded-xl font-medium text-white transition transform hover:translate-x-1"
              >
                <FaHome size={20} />
                <span className="text-lg">Home</span>
              </Link>
              <Link 
                href="/boats" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 rounded-xl font-medium text-white transition transform hover:translate-x-1"
              >
                <span className="text-xl">🏄</span>
                <span className="text-lg">Browse Boards</span>
              </Link>
              <Link 
                href="/contact" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-600 rounded-xl font-medium text-white transition transform hover:translate-x-1"
              >
                <FaPhone size={20} />
                <span className="text-lg">Contact</span>
              </Link>

              {/* Divider */}
              <div className="my-2 border-t border-blue-700 opacity-50"></div>

              {/* Auth Section */}
              {user ? (
                <>
                  <div className="px-5 py-3 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl border border-blue-700">
                    <p className="text-sm text-blue-300 mb-1">Logged in as:</p>
                    <p className="font-bold text-white text-lg">{user.name}</p>
                    <p className="text-xs text-blue-300 capitalize">{user.role} {user.role === 'admin' && '(Owner)'}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin/dashboard"
                      onClick={closeMobileMenu}
                      className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                    >
                      <FaUser size={20} />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
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
                    className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                  >
                    <FaSignInAlt size={20} />
                    Admin Login
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
