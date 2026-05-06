'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

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
        setMessage('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Failed to send message');
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
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
        {/* Page Title */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">Get in Touch</h1>
          <p className="text-sm md:text-lg text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Contact Information</h2>

            <div className="space-y-5 md:space-y-6">
              {/* Phone */}
              <div className="flex gap-3 md:gap-4">
                <FaPhone className="text-teal-600 text-xl md:text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Phone</h3>
                  <p className="text-gray-600 text-sm md:text-base">0727578276</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 md:gap-4">
                <FaEnvelope className="text-teal-600 text-xl md:text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Email</h3>
                  <a href="mailto:ishanknight01@gmail.com" className="text-teal-600 hover:text-teal-700 text-sm md:text-base break-all">
                    ishanknight01@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3 md:gap-4">
                <FaMapMarkerAlt className="text-teal-600 text-xl md:text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Location</h3>
                  <p className="text-gray-600 text-sm md:text-base">Pottuvil Arugambe Beach<br />Sri Lanka</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-3 md:gap-4">
                <FaWhatsapp className="text-green-600 text-xl md:text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">WhatsApp</h3>
                  <a
                    href="https://wa.me/94727578276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-sm md:text-base"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-8 md:mt-12">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Location</h3>
              <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="SurfWave Location"
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

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="bg-white p-5 md:p-8 rounded-lg shadow-lg">
              {message && (
                <div
                  className={`mb-4 p-3 md:p-4 rounded-lg text-sm md:text-base ${
                    message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mb-3 md:mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-3 md:mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-3 md:mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
                  placeholder="Your phone number"
                />
              </div>

              <div className="mb-3 md:mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
                  placeholder="Subject"
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base resize-vertical"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-2 md:py-3 rounded-lg transition disabled:opacity-50 transform hover:scale-105 active:scale-95 text-sm md:text-base"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
