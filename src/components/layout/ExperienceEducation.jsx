import React from 'react';
import TimelineCard from './TimelineCard';
import { workExperience, education } from '../data/workEducation';
import { motion } from 'framer-motion';

const ExperienceEducationSection = () => (
  <section id="experience-education" className="py-20 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Experience & Education</h2>
        <p className="text-xl text-secondary-themed max-w-3xl mx-auto">
          A summary of my professional journey and academic background.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Work Experience */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary-themed">Work Experience</h3>
          {workExperience.map((job, idx) => (
            <TimelineCard key={idx} {...job} isLast={idx === workExperience.length - 1} />
          ))}
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary-themed">Education</h3>
          {education.map((edu, idx) => (
            <TimelineCard key={idx} {...edu} isLast={idx === education.length - 1} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceEducationSection;
