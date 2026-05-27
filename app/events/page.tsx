'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabaseHelpers } from '../lib/supabase';
import type { Event } from '../lib/supabase';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabaseHelpers.events.getAll();
      if (data) {
        setEvents(data);
        setFilteredEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const filterEvents = (filter: string) => {
    setSelectedFilter(filter);

    if (filter === 'all') {
      setFilteredEvents(events);
    } else if (filter === 'upcoming') {
      const now = new Date();
      setFilteredEvents(
        events.filter((event) => new Date(event.date) > now)
      );
    } else if (filter === 'vip') {
      setFilteredEvents(events.filter((event) => event.vip_available > 0));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-card">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold font-display mb-4">
              Upcoming <span className="text-gold">Events</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Discover and book tickets for our hottest parties and exclusive experiences
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex justify-center gap-4 mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { label: 'All Events', value: 'all' },
              { label: 'Upcoming', value: 'upcoming' },
              { label: 'VIP Available', value: 'vip' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => filterEvents(filter.value)}
                className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-to-r from-gold to-gold-light text-dark-bg'
                    : 'border-2 border-gold text-gold hover:bg-gold hover:text-dark-bg'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gold"></div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="glass rounded-lg overflow-hidden hover:glow-gold transition-smooth"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-b from-neon-purple to-neon-pink">
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            Event Image
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
                        <p className="text-gray-400 mb-4">{event.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-400">Date & Time</p>
                            <p className="text-gold font-semibold">
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Performer</p>
                            <p className="text-white font-semibold">{event.performer}</p>
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="flex gap-6 mb-6">
                          <div>
                            <p className="text-sm text-gray-400">Regular Tickets</p>
                            <p className="text-lg font-bold">
                              <span className="text-gold">{event.tickets_available}</span> Available
                            </p>
                            <p className="text-sm text-gold">${event.ticket_price}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">VIP Tickets</p>
                            <p className="text-lg font-bold">
                              <span className="text-neon-purple">{event.vip_available}</span> Available
                            </p>
                            <p className="text-sm text-neon-purple">${event.vip_price}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-bold rounded-lg hover:shadow-lg transition-smooth hover:scale-105 active:scale-95">
                          Get Tickets
                        </button>
                        <button className="flex-1 px-6 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-dark-bg transition-smooth">
                          More Info
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
