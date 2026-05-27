'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-card">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold font-display mb-4">
              Get In <span className="text-gold">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Have questions? We'd love to hear from you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                <p className="text-gray-400">Get in touch with our team</p>
              </div>

              {/* Phone */}
              <div className="glass p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl text-gold">📞</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Phone</h4>
                    <a
                      href="tel:+421908331165"
                      className="text-gold hover:text-gold-light transition-smooth"
                    >
                      +421 908 331 165
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="glass p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl text-gold">✉️</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Email</h4>
                    <a
                      href="mailto:info@cocobongo.sk"
                      className="text-gold hover:text-gold-light transition-smooth"
                    >
                      info@cocobongo.sk
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="glass p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl text-gold">📍</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Location</h4>
                    <p className="text-gray-400">Bratislava, Slovakia</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="glass p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl text-gold">🕐</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Hours</h4>
                    <p className="text-gray-400">Wednesday - Sunday</p>
                    <p className="text-gray-400">20:00 - 06:00</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/421908331165"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-6 py-3 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg hover:bg-opacity-30 transition-smooth"
              >
                <span>💬</span>
                <span className="font-semibold">Message on WhatsApp</span>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {success && (
                <motion.div
                  className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-green-400 font-semibold">Thank you! We'll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="glass p-8 rounded-lg space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth"
                    placeholder="+421 900 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth resize-none"
                    placeholder="Tell us what you'd like to know..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-bold rounded-lg hover:shadow-lg transition-smooth disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <motion.div
            className="glass rounded-lg overflow-hidden h-96"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.3305897261684!2d17.1077!3d48.1486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8a7c0f0f0f0f%3A0x0!2sBratislava!5e0!3m2!1sen!2ssk!4v"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
