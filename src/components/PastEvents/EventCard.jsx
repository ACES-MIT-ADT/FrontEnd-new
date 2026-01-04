import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const EventCard = ({ event, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === event.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-black rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500"
      style={{
        boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/30 blur-md" />
          <span className="relative block bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-white text-xs font-bold px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden bg-black">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={event.images[currentImageIndex]}
            alt={`${event.title} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400/000000/FFFFFF?text=Event+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>

        {/* Image Navigation */}
        {event.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {event.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/30 w-4 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors duration-300">
          {event.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-white/60 rounded-full" />
            <FaCalendarAlt className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-white/60 rounded-full" />
            <FaUsers className="w-3 h-3" />
            <span>{event.participants}+ Participants</span>
          </div>
        </div>

        <p className={`text-white/70 mb-4 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
          {event.description}
        </p>

        {/* Highlights */}
        <div className={`mb-4 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />
          <h4 className="text-white/90 font-semibold mb-3 text-sm uppercase tracking-wider">Highlights</h4>
          <ul className="space-y-2">
            {event.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 text-white/60 text-sm"
              >
                <span className="w-1 h-1 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/80 hover:text-white font-medium text-sm transition-colors duration-300 flex items-center gap-2 group/btn"
        >
          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>

      {/* Bottom Border Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default EventCard;
