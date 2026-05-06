'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaTicketAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChartLine,
} from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
    { label: 'Analytics', href: '/admin/analytics', icon: FaChartLine },
    { label: 'Manage Boats', href: '/admin/boats', icon: FaBox },
    { label: 'Manage Users', href: '/admin/users', icon: FaUsers },
    { label: 'Manage Bookings', href: '/admin/bookings', icon: FaTicketAlt },
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
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-2xl transform transition-transform duration-300 z-30 md:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-blue-600 sticky top-0 bg-gradient-to-b from-blue-700 to-blue-800">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-white to-blue-100 text-blue-700 p-2 rounded-lg font-bold text-lg shadow-md">SW</div>
            <div>
              <h1 className="font-bold text-lg md:text-xl">SurfWave</h1>
              <p className="text-blue-200 text-xs">Admin Panel</p>
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
                  className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base ${
                    active
                      ? 'bg-white text-blue-700 font-semibold shadow-lg scale-105 transform'
                      : 'text-blue-100 hover:bg-blue-600 hover:text-white transform hover:translate-x-1'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-blue-600 p-3 md:p-4 bg-gradient-to-t from-blue-900 to-blue-800 sticky bottom-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-blue-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-200 text-sm md:text-base font-medium"
          >
            <FaSignOutAlt size={18} />
            <span>Logout</span>
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
