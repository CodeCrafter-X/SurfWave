'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-teal-400">🌊 SurfWave</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">Premium board rentals and sales at Pottuvil Arugambe Beach, Sri Lanka.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-teal-400 transition text-sm md:text-base">Home</Link></li>
              <li><Link href="/boats" className="text-gray-400 hover:text-teal-400 transition text-sm md:text-base">Browse Boards</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-teal-400 transition text-sm md:text-base">My Bookings</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-teal-400 transition text-sm md:text-base">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Get in Touch</h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start md:items-center gap-3">
                <FaPhone className="text-teal-400 text-lg flex-shrink-0 mt-1 md:mt-0" />
                <span className="text-gray-400 text-sm md:text-base">0727578276</span>
              </div>
              <div className="flex items-start md:items-center gap-3">
                <FaEnvelope className="text-teal-400 text-lg flex-shrink-0 mt-1 md:mt-0" />
                <a href="mailto:ishanknight01@gmail.com" className="text-gray-400 hover:text-teal-400 transition text-sm md:text-base break-all">Email Us</a>
              </div>
              <div className="flex items-start md:items-center gap-3">
                <FaMapMarkerAlt className="text-teal-400 text-lg flex-shrink-0 mt-1 md:mt-0" />
                <span className="text-gray-400 text-sm md:text-base">Pottuvil Arugambe Beach</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex flex-col">
            <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Connect</h4>
            <a
              href="https://wa.me/94727578276"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 md:gap-3 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl transition font-bold text-sm md:text-base w-full md:w-auto"
            >
              <FaWhatsapp className="text-lg md:text-xl" /> 
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">© 2024 SurfWave. All rights reserved. | Pottuvil Arugambe, Sri Lanka</p>
            <div className="flex gap-4 md:gap-8">
              <a href="#" className="text-gray-500 hover:text-teal-400 transition text-xs md:text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-teal-400 transition text-xs md:text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-teal-400 transition text-xs md:text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
