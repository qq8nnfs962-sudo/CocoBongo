'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabaseHelpers } from '../lib/supabase';

export default function ReservePage() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: '',
    time: '20:00',
    guests: '2',
    table_type: 'standard',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: supabaseError } = await supabaseHelpers.reservations.create({
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        table_type: formData.table_type as 'standard' | 'vip' | 'ultra_vip',
        notes: formData.notes,
        status: 'pending',
      });

      if (supabaseError) {
        setError('Failed to create reservation. Please try again.');
        console.error(supabaseError);
      } else {
        setSuccess(true);
        setFormData({
          full_name: '',
          phone: '',
          email: '',
          date: '',
          time: '20:00',
          guests: '2',
          table_type: 'standard',
          notes: '',
        });

        // Scroll to success message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-card">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {success && (
            <motion.div
              className="mb-8 p-6 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-green-400 font-semibold mb-2">Reservation Submitted!</h3>
              <p className="text-green-300 text-sm">
                Thank you! We've received your reservation request. Our team will contact you shortly to confirm.
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              className="mb-8 p-6 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-red-400 font-semibold mb-2">Error</h3>
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold font-display mb-4">
              Reserve Your <span className="text-gold">Table</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Secure your spot at CocoBongo for an unforgettable night
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-lg p-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth"
                  placeholder="+421 900 000 000"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth"
                  placeholder="john@example.com"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white focus:outline-none focus:border-gold transition-smooth"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white focus:outline-none focus:border-gold transition-smooth"
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Number of Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white focus:outline-none focus:border-gold transition-smooth"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table Type */}
              <div>
                <label className="block text-sm font-semibold text-gold mb-2">Table Type *</label>
                <select
                  name="table_type"
                  value={formData.table_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white focus:outline-none focus:border-gold transition-smooth"
                >
                  <option value="standard">Standard Table</option>
                  <option value="vip">VIP Table</option>
                  <option value="ultra_vip">Ultra VIP Table</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gold mb-2">Special Requests</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-smooth resize-none"
                placeholder="Any special requests or occasions?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-bold rounded-lg hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Reserving...' : 'Reserve Now'}
            </motion.button>

            <p className="text-center text-gray-400 text-sm">
              We'll confirm your reservation via email. Have questions? Call us at +421 908 331 165
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
