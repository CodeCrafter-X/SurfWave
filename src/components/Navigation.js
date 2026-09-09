'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaSignOutAlt, FaHome, FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 30000);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
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
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
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

  const isActive = (path) => pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#031726] border-b border-white/10 py-3' 
        : 'bg-[#031726] border-b border-white/10 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Custom Modern Surf Logo */}
          <Link href="/" className="inline-flex items-center transition-transform duration-200 hover:scale-102">
            <img 
              src="/surf-img/surf-logo.svg" 
              alt="SurfWave Logo" 
              className="h-10 sm:h-12 md:h-13 w-auto object-contain drop-shadow-md" 
            />
          </Link>

          {/* Desktop Navigation Links (Increased Size, Modern & Responsive) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <Link 
              href="/" 
              className={`text-base md:text-lg lg:text-xl font-extrabold tracking-wide transition-colors duration-200 py-1.5 relative ${
                isActive('/') 
                  ? 'text-[#00f5d4]' 
                  : 'text-gray-200 hover:text-[#00f5d4]'
              }`}
            >
              Home
              {isActive('/') && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#00f5d4]"></span>
              )}
            </Link>

            <Link 
              href="/boats" 
              className={`text-base md:text-lg lg:text-xl font-extrabold tracking-wide transition-colors duration-200 py-1.5 relative ${
                isActive('/boats') 
                  ? 'text-[#00f5d4]' 
                  : 'text-gray-200 hover:text-[#00f5d4]'
              }`}
            >
              Boards
              {isActive('/boats') && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#00f5d4]"></span>
              )}
            </Link>

            <Link 
              href="/contact" 
              className={`text-base md:text-lg lg:text-xl font-extrabold tracking-wide transition-colors duration-200 py-1.5 relative ${
                isActive('/contact') 
                  ? 'text-[#00f5d4]' 
                  : 'text-gray-200 hover:text-[#00f5d4]'
              }`}
            >
              Contacts
              {isActive('/contact') && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#00f5d4]"></span>
              )}
            </Link>
          </nav>

          {/* Right Action Area (Larger Responsive Text for WhatsApp & Sign In) */}
          <div className="hidden md:flex items-center gap-4">
            {/* WhatsApp Connect */}
            <a
              href="https://wa.me/94727578276"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:text-white px-2 py-2 transition-colors"
            >
              <FaWhatsapp size={19} />
              <span>WhatsApp</span>
            </a>

            {/* User / Admin Action */}
            {user && user.role === 'admin' ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 border-l border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:text-[#00f5d4]"
                >
                  <FaUser size={15} />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 transition-colors hover:text-red-400"
                  title="Logout"
                >
                  <FaSignOutAlt size={18} />
                </button>
              </div>
            ) : user ? (
              <button
                onClick={handleLogout}
                className="text-sm md:text-base lg:text-lg font-extrabold text-gray-200 hover:text-red-400 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-white/20 hover:border-red-400/40 transition flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <FaSignOutAlt size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                href="/login" 
                className="bg-white/10 hover:bg-white/20 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-extrabold text-sm md:text-base lg:text-lg transition border-2 border-white/20 hover:border-[#00f5d4] flex items-center gap-2 hover:scale-105 active:scale-95 shadow-sm"
              >
                <FaSignInAlt size={16} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-200 hover:text-[#00f5d4] p-2 focus:outline-none transition-transform active:scale-95"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes size={26} className="text-[#00f5d4]" /> : <FaBars size={26} />}
          </button>
        </div>

        {/* Mobile Menu Drawer (Responsive, Large & Clear Typography) */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-6 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2 pt-2">
              <Link 
                href="/" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-extrabold text-lg sm:text-xl transition ${
                  isActive('/') 
                    ? 'border-l-2 border-[#00f5d4] bg-white/10 text-[#00f5d4]' 
                    : 'text-gray-100 hover:bg-white/5'
                }`}
              >
                <FaHome size={20} />
                <span>Home</span>
              </Link>

              <Link 
                href="/boats" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-extrabold text-lg sm:text-xl transition ${
                  isActive('/boats') 
                    ? 'border-l-2 border-[#00f5d4] bg-white/10 text-[#00f5d4]' 
                    : 'text-gray-100 hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">🏄</span>
                <span>Boards</span>
              </Link>

              <Link 
                href="/contact" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-extrabold text-lg sm:text-xl transition ${
                  isActive('/contact') 
                    ? 'border-l-2 border-[#00f5d4] bg-white/10 text-[#00f5d4]' 
                    : 'text-gray-100 hover:bg-white/5'
                }`}
              >
                <FaPhone size={18} />
                <span>Contacts</span>
              </Link>

              {/* Mobile WhatsApp Button (Prominent) */}
              <div className="pt-3">
                <a
                  href="https://wa.me/94727578276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 border border-[#25D366]/70 py-3.5 text-base font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
                >
                  <FaWhatsapp size={22} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Auth Section Mobile */}
              <div className="pt-4 border-t border-white/10 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-3 bg-white/5 rounded-2xl">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="font-extrabold text-white text-base">{user.name}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={closeMobileMenu}
                        className="flex w-full items-center justify-center gap-2 border border-[#00f5d4] px-4 py-3.5 text-base font-semibold text-[#00f5d4] transition hover:bg-[#00f5d4] hover:text-[#031726]"
                      >
                        <FaUser size={18} />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="flex w-full items-center justify-center gap-2 border border-red-400/50 px-4 py-3.5 text-base font-semibold text-red-300 transition hover:bg-red-400/10"
                    >
                      <FaSignOutAlt size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    onClick={closeMobileMenu}
                    className="flex w-full items-center justify-center gap-2 border border-white/20 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    <FaSignInAlt size={18} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}
