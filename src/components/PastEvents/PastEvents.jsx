import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import EventCard from './EventCard';
import MagicBento from '../MagicBento';
import { pastEventsData, eventCategories } from './pastEventsData';

const PastEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(pastEventsData);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [routePath]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(pastEventsData);
    } else {
      setFilteredEvents(
        pastEventsData.filter(event => event.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-16 relative overflow-hidden">
      {/* Gradient Orbs with Purple Accent */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-widest border border-purple-500/50 px-4 py-2 rounded-full bg-purple-500/10">
              Our Journey
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="inline-block text-white">Past</span>{' '}
            <span className="inline-block bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Relive the moments that defined our community through innovation, collaboration, and celebration
          </p>
        </motion.div>

        {/* Stats Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { label: 'Events Organized', value: pastEventsData.length },
            { label: 'Total Participants', value: pastEventsData.reduce((sum, event) => sum + event.participants, 0) },
            { label: 'Event Categories', value: eventCategories.length - 1 }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center group-hover:border-white/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="relative">
                  <div className="text-5xl font-bold text-white mb-2">
                    {stat.value}+
                  </div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter with Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {eventCategories.map((category, idx) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
                {selectedCategory !== category && (
                  <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-purple-500/40 transition-colors duration-300" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-white/50 text-sm">
            <span className="text-purple-400 font-medium">{filteredEvents.length}</span> {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
        </motion.div>

        {/* Events Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-32"
          >
            <div className="text-7xl mb-6">📅</div>
            <h3 className="text-3xl font-bold text-white/90 mb-3">No Events Found</h3>
            <p className="text-white/40">Try selecting a different category</p>
          </motion.div>
        )}

        {/* Event Memories Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 w-full flex flex-col items-center"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-white">Event </span>
                <span className="bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent">
                  Memories
                </span>
              </h2>
            </motion.div>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Capturing the moments that made our journey unforgettable
            </p>
          </div>
          
          <div className="w-full flex justify-center">
            <MagicBento />
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-3xl" />
          <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500" style={{
              maskImage: 'linear-gradient(to bottom, transparent, white, transparent)',
            }} />
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Join Our Next Chapter
              </h3>
              <p className="text-white/60 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Be part of groundbreaking events that push boundaries and create lasting impact in the tech community
              </p>
              <a
                href="https://chat.whatsapp.com/LSoSVdHx0cz1FfvCh3eDqk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group hover:scale-105"
              >
                <span>Join Community</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PastEvents;
