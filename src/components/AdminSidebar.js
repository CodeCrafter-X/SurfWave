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
        className="fixed top-4 left-4 z-40 md:hidden bg-blue-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl transform transition-transform duration-300 z-30 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-600">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white text-blue-700 p-2 rounded-lg font-bold text-lg">SW</div>
            <div>
              <h1 className="font-bold text-xl">SurfWave</h1>
              <p className="text-blue-200 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-white text-blue-700 font-semibold shadow-lg'
                      : 'text-blue-100 hover:bg-blue-600 hover:text-white'
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
        <div className="border-t border-blue-600 p-4">
          <Link
            href="/api/auth/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-600 hover:text-white transition-all duration-200"
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
