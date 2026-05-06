'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-3 text-teal-400">SurfWave</h3>
            <p className="text-gray-400 text-lg mb-4">Premium boat rentals and sales at Pottuvil Arugambe Beach, Sri Lanka.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-teal-400 transition">Home</Link></li>
              <li><Link href="/boats" className="text-gray-400 hover:text-teal-400 transition">Browse Boats</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-teal-400 transition">My Bookings</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-teal-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-teal-400 text-lg" />
                <span className="text-lg">0727578276</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-teal-400 text-lg" />
                <a href="mailto:ishanknight01@gmail.com" className="hover:text-teal-400 transition text-lg">Email Us</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-teal-400 text-lg" />
                <span className="text-lg">Pottuvil Arugambe Beach</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-xl mb-6 text-white">Connect</h4>
            <a
              href="https://wa.me/94727578276"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition font-bold text-lg"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 SurfWave. All rights reserved. | Pottuvil Arugambe, Sri Lanka</p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 hover:text-teal-400 transition text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-teal-400 transition text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-teal-400 transition text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
