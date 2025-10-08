import React from 'react';
import { motion } from 'framer-motion';
import { timeline } from '../../data/Experience'
import UnifiedTimelineCard from '../layout/UnifiedTimeLineCard';

const UnifiedTimeline = () => {
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  return (
    <section id="timeline" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Timeline</h2>
          <p className="text-xl text-secondary-themed max-w-3xl mx-auto">
            A chronological overview of my work experience and education.
          </p>
        </motion.div>

        <div className="relative">
          {sortedTimeline.map((item, idx) => (
            <UnifiedTimelineCard
              key={idx}
              item={item}
              isLast={idx === sortedTimeline.length - 1}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedTimeline;
