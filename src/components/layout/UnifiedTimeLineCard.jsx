import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiGraduationCap } from 'react-icons/fi';

const UnifiedTimelineCard = ({ item, isLast, index }) => {
  const lineRef = useRef(null);
  const inView = useInView(lineRef, { margin: '-50px', once: true });

  const DotIcon = item.type === 'work' ? FiBriefcase : FiGraduationCap;
  const color = item.type === 'work' ? 'bg-blue-400' : 'bg-purple-400';

  const isLeft = index % 2 === 0;

  return (
    <div className="relative mb-12 flex flex-col md:flex-row items-center w-full">
      {/* Left spacer for desktop */}
      <div className={`hidden md:flex flex-1 ${isLeft ? 'justify-end pr-6' : 'pl-6'}`}></div>

      {/* Timeline dot & line */}
      <div className="flex flex-col items-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white z-10 ${color}`}
        >
          <DotIcon className="w-4 h-4" />
        </motion.div>

        {!isLast && (
          <motion.div
            ref={lineRef}
            initial={{ height: 0 }}
            animate={{ height: inView ? '100%' : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`w-1 ${color} mt-1`}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-6 transform-gpu hover-lift mt-6 md:mt-0 md:flex-1"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {item.logo && (
          <img src={item.logo} alt={item.title} className="w-12 h-12 object-contain rounded-md mb-2" />
        )}
        <h3 className="text-xl font-bold text-primary-themed">{item.title}</h3>
        <p className="text-tertiary-themed text-sm mb-2">{item.subtitle} | {item.period}</p>
        <p className="text-secondary-themed">{item.description}</p>
      </motion.div>

      {/* Right spacer for desktop */}
      <div className={`hidden md:flex flex-1 ${!isLeft ? 'justify-start pl-6' : 'pr-6'}`}></div>
    </div>
  );
};

export default UnifiedTimelineCard;
