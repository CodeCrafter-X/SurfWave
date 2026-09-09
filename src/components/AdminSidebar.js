'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaBox, FaTicketAlt, FaUser, FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: FaTachometerAlt },
    { label: 'Manage Boats', href: '/admin/boats', icon: FaBox },
    { label: 'Discounts', href: '/admin/discounts', icon: FaTicketAlt },
    { label: 'Profile', href: '/admin/profile', icon: FaUser },
  ];

  const isActive = (href) => pathname === href || (href === '/admin/dashboard' && pathname === '/admin');

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        className="fixed left-4 top-4 z-40 rounded-md border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 transform overflow-y-auto border-r border-slate-200 bg-white text-slate-900 shadow-xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="sticky top-0 border-b border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <img src="/surf-img/surf-logo.svg" alt="SurfWave" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">SurfWave</h1>
              <p className="text-xs text-slate-500">Admin workspace</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-6">
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Workspace</p>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                    active
                      ? 'bg-slate-900 font-semibold text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
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
        <div className="sticky bottom-0 border-t border-slate-200 bg-white p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            <FaArrowLeft size={16} />
            <span>Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
