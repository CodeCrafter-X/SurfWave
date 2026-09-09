'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaWater, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Message sent successfully! Our surf station team will reply shortly.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Failed to send message. Please try WhatsApp for instant support.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="min-h-screen bg-[#f4fbfd] pb-24">
      
      {/* Header Sea Banner */}
      <section className="bg-gradient-to-r from-[#031726] via-[#06283d] to-[#031726] text-white py-14 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#00f5d4]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#00f5d4] uppercase bg-white/5 border border-[#00f5d4]/20 px-4 py-1.5 rounded-full mb-3">
            <FaWater size={12} />
            <span>Pottuvil Arugam Bay Station</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
            Connect with SurfWave
          </h1>
          <p className="text-[#e0fbfc]/80 text-sm sm:text-base max-w-xl mx-auto">
            Questions about board availability, wave forecasting, or custom purchases? Reach out directly or message our beach shack on WhatsApp.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Info & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Sea Card */}
            <div className="glass-sea-card p-6 sm:p-8 rounded-3xl shadow-[0_10px_35px_rgba(0,180,216,0.12)]">
              <h2 className="text-xl font-black text-[#031726] mb-6 flex items-center gap-2">
                <span className="text-2xl">🏄</span>
                <span>Beach Station Info</span>
              </h2>

              <div className="space-y-4 text-sm">
                
                {/* WhatsApp Priority Card */}
                <a
                  href="https://wa.me/94727578276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#25D366]/15 to-[#00f5d4]/10 border border-[#25D366]/30 hover:border-[#25D366] transition-all hover:scale-102"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                      <FaWhatsapp size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#031726] text-sm">WhatsApp Concierge</p>
                      <p className="text-xs text-gray-500">Fastest response time (5 mins)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#25D366] group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* Phone */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/60 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#0077b6]/10 text-[#0077b6] flex items-center justify-center">
                    <FaPhone size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Direct Hotline</p>
                    <a href="tel:0727578276" className="font-bold text-[#031726] hover:text-[#0077b6]">072 757 8276</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/60 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/10 text-[#00b4d8] flex items-center justify-center">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Dispatch</p>
                    <a href="mailto:ishanknight01@gmail.com" className="font-bold text-[#031726] hover:text-[#0077b6] break-all">ishanknight01@gmail.com</a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/60 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b6b]/10 text-[#ff6b6b] flex items-center justify-center">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Surf Station</p>
                    <p className="font-bold text-[#031726]">Pottuvil Arugam Bay, Sri Lanka</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map Frame */}
            <div className="glass-sea-card p-3 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,180,216,0.1)]">
              <div className="w-full h-52 rounded-2xl overflow-hidden">
                <iframe
                  title="SurfWave Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.1234567890!2d81.9234!3d6.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2d5c5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sPottuvil%20Arugambe%20Beach!5e0!3m2!1sen!2slk!4v1234567890"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-sea-card p-6 sm:p-10 rounded-3xl shadow-[0_15px_45px_rgba(0,180,216,0.15)]">
              
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#031726] tracking-tight mb-2">
                  Drop Us a Line
                </h2>
                <p className="text-gray-500 text-sm">
                  Fill in the details below and we will get back to you within a few hours.
                </p>
              </div>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${
                    message.includes('successfully') 
                      ? 'bg-[#00f5d4]/15 text-[#0077b6] border border-[#00f5d4]/40' 
                      : 'bg-[#ff6b6b]/15 text-[#d90429] border border-[#ff6b6b]/40'
                  }`}
                >
                  <span>{message.includes('successfully') ? '🌊' : '⚠️'}</span>
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Liam Anderson"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm text-[#031726] transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. liam@surfmail.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm text-[#031726] transition font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. +94 72 757 8276"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm text-[#031726] transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Inquiry Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 3-Day Board Rental & Fin Options"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm text-[#031726] transition font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Message / Wave Requirements</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us what type of board you need, your surfing experience level, or questions about buying..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b4d8] text-sm text-[#031726] transition font-medium resize-vertical"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full shimmer-trigger bg-gradient-to-r from-[#0077b6] via-[#00b4d8] to-[#00f5d4] animate-sea-gradient text-white hover:text-[#031726] font-black py-4 px-8 rounded-2xl shadow-[0_10px_30px_rgba(0,180,216,0.3)] hover:shadow-[0_15px_40px_rgba(0,245,212,0.5)] transform hover:scale-101 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base mt-4"
                >
                  <FaPaperPlane size={16} />
                  <span>{loading ? 'Transmitting to Beach Station...' : 'Send Message'}</span>
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
