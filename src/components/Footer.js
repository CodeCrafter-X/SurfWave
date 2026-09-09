'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaWater } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-[#031726] text-white mt-auto overflow-hidden">
      
      {/* Top Wave Transition Divider */}
      <div className="w-full overflow-hidden leading-none rotate-180 -mb-1">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 md:h-16 text-[#031726] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Ambient Sea Mesh Light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00f5d4]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0077b6]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 md:pt-14 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group transition-transform hover:scale-102">
              <img 
                src="/surf-img/surf-logo.svg" 
                alt="SurfWave Logo" 
                className="h-10 md:h-12 w-auto object-contain drop-shadow-lg" 
              />
            </Link>
            
            <p className="text-[#e0fbfc]/80 text-sm leading-relaxed">
              Ride the legendary swells of Sri Lanka. From high-performance shortboards to easy cruiser soft-tops, we fuel your Indian Ocean adventures.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#00f5d4] bg-[#06283d] px-3 py-1.5 rounded-full w-fit border border-[#00f5d4]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5d4]"></span>
              </span>
              <span>Open Daily: 6:00 AM – 7:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-base tracking-wider uppercase mb-5 text-[#00f5d4] flex items-center gap-2">
              <FaWater size={14} />
              <span>Explore Waves</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#00f5d4] transition-all flex items-center gap-2 text-sm group">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-500 group-hover:bg-[#00f5d4] group-hover:w-3 transition-all"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/boats?type=rent" className="text-gray-300 hover:text-[#00f5d4] transition-all flex items-center gap-2 text-sm group">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-500 group-hover:bg-[#00f5d4] group-hover:w-3 transition-all"></span>
                  <span>Rent Surfboards</span>
                </Link>
              </li>
              <li>
                <Link href="/boats?type=sale" className="text-gray-300 hover:text-[#00f5d4] transition-all flex items-center gap-2 text-sm group">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-500 group-hover:bg-[#00f5d4] group-hover:w-3 transition-all"></span>
                  <span>Buy Premium Boards</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#00f5d4] transition-all flex items-center gap-2 text-sm group">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-500 group-hover:bg-[#00f5d4] group-hover:w-3 transition-all"></span>
                  <span>Beach Station & Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-extrabold text-base tracking-wider uppercase mb-5 text-[#00f5d4] flex items-center gap-2">
              <FaMapMarkerAlt size={14} />
              <span>Beach Station</span>
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#06283d] text-[#00b4d8] border border-white/5 mt-0.5">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <span className="text-gray-200 font-semibold block">Pottuvil Arugam Bay</span>
                  <span className="text-gray-400 text-xs">Eastern Province, Sri Lanka</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#06283d] text-[#00b4d8] border border-white/5">
                  <FaPhone size={14} />
                </div>
                <a href="tel:0727578276" className="text-gray-300 hover:text-[#00f5d4] transition">
                  072 757 8276
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#06283d] text-[#00b4d8] border border-white/5">
                  <FaEnvelope size={14} />
                </div>
                <a href="mailto:ishanknight01@gmail.com" className="text-gray-300 hover:text-[#00f5d4] transition break-all text-xs sm:text-sm">
                  ishanknight01@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Line Card */}
          <div className="bg-gradient-to-br from-[#06283d] to-[#041d30] p-5 rounded-3xl border border-[#00f5d4]/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#25D366] font-bold text-sm mb-2">
                <FaWhatsapp size={18} />
                <span>Direct WhatsApp Support</span>
              </div>
              <p className="text-xs text-[#e0fbfc]/80 mb-4 leading-relaxed">
                Need advice on swell conditions or which board suits your wave level? Reach out anytime!
              </p>
            </div>

            <a
              href="https://wa.me/94727578276"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-trigger bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1ebd59] hover:to-[#0f7569] text-white py-3 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] transition transform hover:scale-102 active:scale-95"
            >
              <FaWhatsapp size={16} />
              <span>Chat with Coach</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} SurfWave Lanka. All rights reserved. Crafting Indian Ocean memories.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#00f5d4]">Pottuvil Wave Report: 4-6ft Clean</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300">Ride Safe & Respect the Ocean</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
