'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { supabaseHelpers } from './lib/supabase';
import type { Event } from './lib/supabase';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabaseHelpers.events.getAll();
      if (data) {
        setUpcomingEvents(data.slice(0, 3));
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-card">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-pink rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="text-gold-gradient">WELCOME TO</span>
              <br />
              <span className="text-white">COCO</span>
              <span className="text-gold">BONGO</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the ultimate nightlife destination. Premium entertainment, exclusive events, and unforgettable moments.
            </p>

            <motion.div
              className="flex flex-col md:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                href="/reserve"
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-bold rounded-lg transition-smooth hover:shadow-lg hover:shadow-gold hover:scale-105 active:scale-95 text-lg"
              >
                Reserve Your Experience
              </Link>
              <Link
                href="/events"
                className="px-8 py-4 border-2 border-gold text-gold font-bold rounded-lg transition-smooth hover:bg-gold hover:text-dark-bg active:scale-95 text-lg"
              >
                Discover Events
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold font-display mb-4"
              variants={itemVariants}
            >
              Upcoming <span className="text-gold">Events</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg"
              variants={itemVariants}
            >
              Don't miss out on our hottest parties and exclusive experiences
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="glass rounded-lg overflow-hidden hover:glow-gold transition-smooth group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-48 bg-gradient-to-b from-neon-purple to-neon-pink overflow-hidden">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{event.performer}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gold font-semibold">{new Date(event.date).toLocaleDateString()}</span>
                      <span className="text-sm text-gray-400">{event.time}</span>
                    </div>
                    <Link
                      href={`/events?id=${event.id}`}
                      className="inline-block px-4 py-2 bg-gold text-dark-bg font-semibold rounded-lg hover:bg-gold-light transition-smooth text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No events available yet. Check back soon!
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/events"
              className="inline-block px-8 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-dark-bg transition-smooth"
            >
              View All Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VIP Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold font-display mb-6">
                Experience <span className="text-gold">VIP Luxury</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Join our exclusive VIP program and unlock premium access to private tables, dedicated service, and priority bookings for our hottest events.
              </p>
              <ul className="space-y-4 mb-8">
                {['Private VIP Tables', 'Priority Event Access', 'Dedicated Concierge', 'Exclusive Offers'].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/reserve"
                className="inline-block px-8 py-3 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-smooth"
              >
                Book VIP Experience
              </Link>
            </motion.div>

            <motion.div
              className="relative h-96 rounded-lg overflow-hidden glass glow-gold"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-neon-purple via-neon-pink to-dark-card"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              What Our Guests <span className="text-gold">Say</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Alex Johnson', role: 'Event Organizer', text: 'CocoBongo delivered an unforgettable experience. The VIP service was impeccable!' },
              { name: 'Maria Garcia', role: 'Party Enthusiast', text: 'Best nightlife experience in the city. Highly recommend for celebrations!' },
              { name: 'David Chen', role: 'Corporate Client', text: 'Perfect venue for our client entertainment. Professional and luxurious.' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-6"
                variants={itemVariants}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
