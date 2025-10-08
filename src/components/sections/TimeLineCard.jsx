import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TimelineCard = ({ title, subtitle, period, description, logo, isLast }) => {
  const lineRef = useRef(null);
  const inView = useInView(lineRef, { margin: '-50px', once: true });

  return (
    <div className="flex relative mb-8">
      {/* Timeline dot & growing line */}
      <div className="flex flex-col items-center mr-6">
        <div className="w-4 h-4 rounded-full bg-blue-400 z-10"></div>
        {!isLast && (
          <motion.div
            ref={lineRef}
            initial={{ height: 0 }}
            animate={{ height: inView ? '100%' : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-1 bg-blue-300"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-6 flex-1 hover-lift transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {logo && <img src={logo} alt={title} className="w-12 h-12 object-contain rounded-md mb-2" />}
        <h3 className="text-xl font-bold text-primary-themed">{title}</h3>
        <p className="text-tertiary-themed text-sm mb-2">{subtitle} | {period}</p>
        <p className="text-secondary-themed">{description}</p>
      </motion.div>
    </div>
  );
};

export default TimelineCard;
