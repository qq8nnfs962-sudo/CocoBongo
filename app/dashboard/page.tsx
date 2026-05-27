'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabaseHelpers } from '../lib/supabase';
import type { Reservation, Event, GalleryItem } from '../lib/supabase';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    setAuthenticated(isAuth);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const loadData = async () => {
    setLoading(true);
    const { data: resData } = await supabaseHelpers.reservations.getAll();
    const { data: eventsData } = await supabaseHelpers.events.getAll();
    const { data: galleryData } = await supabaseHelpers.gallery.getAll();

    if (resData) setReservations(resData);
    if (eventsData) setEvents(eventsData);
    if (galleryData) setGallery(galleryData);

    setLoading(false);
  };

  const updateReservationStatus = async (id: string, status: string) => {
    const { error } = await supabaseHelpers.reservations.update(id, {
      status: status as 'pending' | 'confirmed' | 'cancelled',
    });

    if (!error) {
      loadData();
    }
  };

  const deleteReservation = async (id: string) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabaseHelpers.reservations.delete(id);
      if (!error) {
        loadData();
      }
    }
  };

  const deleteEvent = async (id: string) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabaseHelpers.events.delete(id);
      if (!error) {
        loadData();
      }
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-card flex items-center justify-center px-4">
        <motion.form
          onSubmit={handleAuth}
          className="glass p-8 rounded-lg w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="text-gold-gradient">Admin</span> Dashboard
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-gold border-opacity-30 rounded-lg text-white focus:outline-none focus:border-gold"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-dark-bg font-bold rounded-lg hover:shadow-lg transition-smooth"
          >
            Access Dashboard
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-card p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl font-bold font-display">
            Admin <span className="text-gold">Dashboard</span>
          </h1>
          <button
            onClick={() => {
              setAuthenticated(false);
              localStorage.removeItem('adminAuth');
            }}
            className="px-4 py-2 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg hover:bg-opacity-30 transition-smooth"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Reservations', value: reservations.length, color: 'gold' },
            { label: 'Upcoming Events', value: events.length, color: 'purple' },
            { label: 'Gallery Items', value: gallery.length, color: 'pink' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="glass p-6 rounded-lg"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-4xl font-bold text-gold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div className="glass rounded-lg overflow-hidden">
          <div className="flex border-b border-gold border-opacity-20">
            {[
              { id: 'reservations', label: 'Reservations' },
              { id: 'events', label: 'Events' },
              { id: 'gallery', label: 'Gallery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-semibold transition-smooth ${
                  activeTab === tab.id
                    ? 'bg-gold text-dark-bg'
                    : 'text-gray-400 hover:text-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
              </div>
            ) : activeTab === 'reservations' ? (
              <div className="space-y-4">
                {reservations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gold border-opacity-20">
                          <th className="text-left py-3 px-4 text-gold">Name</th>
                          <th className="text-left py-3 px-4 text-gold">Phone</th>
                          <th className="text-left py-3 px-4 text-gold">Date</th>
                          <th className="text-left py-3 px-4 text-gold">Guests</th>
                          <th className="text-left py-3 px-4 text-gold">Table Type</th>
                          <th className="text-left py-3 px-4 text-gold">Status</th>
                          <th className="text-left py-3 px-4 text-gold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((res) => (
                          <tr
                            key={res.id}
                            className="border-b border-gold border-opacity-10 hover:bg-white hover:bg-opacity-5"
                          >
                            <td className="py-3 px-4">{res.full_name}</td>
                            <td className="py-3 px-4">{res.phone}</td>
                            <td className="py-3 px-4">{new Date(res.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{res.guests}</td>
                            <td className="py-3 px-4 capitalize">{res.table_type}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  res.status === 'confirmed'
                                    ? 'bg-green-500 bg-opacity-20 text-green-400'
                                    : res.status === 'pending'
                                      ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                                      : 'bg-red-500 bg-opacity-20 text-red-400'
                                }`}
                              >
                                {res.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 space-x-2">
                              <button
                                onClick={() => updateReservationStatus(res.id, 'confirmed')}
                                className="text-xs px-2 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded hover:bg-opacity-30"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => deleteReservation(res.id)}
                                className="text-xs px-2 py-1 bg-red-500 bg-opacity-20 text-red-400 rounded hover:bg-opacity-30"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No reservations yet</p>
                )}
              </div>
            ) : activeTab === 'events' ? (
              <div className="space-y-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-gold border-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-5"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{event.title}</h3>
                          <p className="text-gray-400 text-sm">{event.performer}</p>
                          <p className="text-sm text-gold mt-2">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="px-3 py-1 text-sm bg-red-500 bg-opacity-20 text-red-400 rounded hover:bg-opacity-30"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">No events yet</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {gallery.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {gallery.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 border border-gold border-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-5"
                      >
                        <p className="font-semibold text-sm mb-2">{item.title}</p>
                        <p className="text-xs text-gray-400 mb-3">{item.type}</p>
                        <button className="w-full px-2 py-1 text-xs bg-red-500 bg-opacity-20 text-red-400 rounded hover:bg-opacity-30">
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No gallery items yet</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
