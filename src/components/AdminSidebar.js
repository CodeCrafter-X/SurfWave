'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaBox,
  FaTicketAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
    { label: 'Manage Boats', href: '/admin/boats', icon: FaBox },
    { label: 'Discounts', href: '/admin/discounts', icon: FaTicketAlt },
    { label: 'Profile', href: '/admin/profile', icon: FaUser },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-4 z-40 md:hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-lg shadow-lg transition transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transform transition-transform duration-300 z-30 md:translate-x-0 overflow-y-auto border-r border-gray-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-700 sticky top-0 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 p-3 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-white text-blue-600 p-2 rounded-lg font-bold text-lg shadow-md">
              <span>🌊</span>
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-xl">SurfWave</h1>
              <p className="text-blue-200 text-xs">Admin Control</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2 md:px-3 py-4 md:py-6">
          <div className="space-y-1 md:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 md:px-4 py-3 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg scale-105 transform'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white transform hover:translate-x-1'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 p-3 md:p-4 bg-gradient-to-t from-gray-900 to-gray-800 sticky bottom-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 md:px-4 py-3 md:py-3 rounded-lg text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 hover:text-white transition-all duration-200 text-sm md:text-base font-medium transform hover:scale-105"
          >
            <FaSignOutAlt size={20} />
            <span>Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
