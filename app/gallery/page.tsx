'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabaseHelpers } from '../lib/supabase';
import type { GalleryItem } from '../lib/supabase';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabaseHelpers.gallery.getAll();
      if (data) {
        setItems(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const filteredItems = filter === 'all' ? items : items.filter((item) => item.type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
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
              Photo <span className="text-gold">&</span> Video Gallery
            </h1>
            <p className="text-gray-400 text-lg">
              Explore the energy and excitement of CocoBongo
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { label: 'All', value: 'all' },
              { label: 'Photos', value: 'photo' },
              { label: 'Videos', value: 'video' },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
                  filter === btn.value
                    ? 'bg-gradient-to-r from-gold to-gold-light text-dark-bg'
                    : 'border-2 border-gold text-gold hover:bg-gold hover:text-dark-bg'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gold"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative cursor-pointer group rounded-lg overflow-hidden glass hover:glow-gold transition-smooth"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="aspect-square bg-gradient-to-b from-neon-purple to-neon-pink relative">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : item.video_url ? (
                        <video
                          src={item.video_url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          Media
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <motion.div
                          className="text-gold text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        >
                          {item.type === 'video' ? '▶' : '🔍'}
                        </motion.div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gold text-dark-bg text-xs font-bold rounded-full">
                          {item.type === 'video' ? 'VIDEO' : 'PHOTO'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white truncate">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Lightbox Modal */}
              {selectedItem && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedItem(null)}
                >
                  <motion.div
                    className="relative max-w-4xl w-full h-96 md:h-full max-h-96 md:max-h-screen rounded-lg overflow-hidden glass"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selectedItem.image_url ? (
                      <img
                        src={selectedItem.image_url}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : selectedItem.video_url ? (
                      <video
                        src={selectedItem.video_url}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : null}

                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-gold text-dark-bg rounded-full flex items-center justify-center font-bold hover:bg-gold-light transition-smooth"
                    >
                      ✕
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No gallery items yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
