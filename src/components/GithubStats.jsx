import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitCommit, GitPullRequest, Code, Calendar } from 'lucide-react';

const ContributionDay = ({ level }) => {
  const colors = [
    'bg-gray-300/10 dark:bg-gray-500/10',
    'bg-green-200 dark:bg-green-900',
    'bg-green-400 dark:bg-green-700',
    'bg-green-600 dark:bg-green-500',
    'bg-green-800 dark:bg-green-300'
  ];
  return (
    <motion.div 
      className={`w-3 h-3 rounded-sm ${colors[level]}`} 
      whileHover={{ scale: 1.5, zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
};

const GithubActivityGraph = () => {
  const weeks = Array.from({ length: 52 });
  const days = Array.from({ length: 7 });
  return (
    <div className="flex justify-start items-center gap-1 p-2 glass rounded-lg overflow-x-auto">
      {weeks.map((_, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1">
          {days.map((_, dayIndex) => (
            <ContributionDay key={dayIndex} level={Math.floor(Math.random() * 5)} />
          ))}
        </div>
      ))}
    </div>
  );
};

const GithubStats = () => {
  const stats = [
    { icon: GitCommit, label: 'Total Commits', value: '8,421', color: 'text-green-400' },
    { icon: GitPullRequest, label: 'Pull Requests', value: '1,573', color: 'text-purple-400' },
    { icon: Star, label: 'Stars Received', value: '2,300+', color: 'text-yellow-400' },
    { icon: Github, label: 'Repositories', value: '112', color: 'text-blue-400' },
  ];

  const topLanguages = [
    { name: 'Go', percentage: 45, color: 'bg-cyan-400' },
    { name: 'Python', percentage: 25, color: 'bg-blue-500' },
    { name: 'TypeScript', percentage: 15, color: 'bg-indigo-500' },
    { name: 'Terraform (HCL)', percentage: 10, color: 'bg-purple-600' },
    { name: 'Bash', percentage: 5, color: 'bg-green-500' },
  ];

  return (
    <section id="github-stats" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">My Coding Footprint</h2>
          <p className="text-xl text-secondary-themed max-w-3xl mx-auto">
            A snapshot of my activity and contributions on GitHub.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center hover-lift transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div style={{ transform: 'translateZ(20px)' }}>
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                  <div className="text-4xl font-bold text-primary-themed mb-2">{stat.value}</div>
                  <div className="text-md text-tertiary-themed">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-blue-300 mr-3" />
                <h3 className="text-2xl font-bold text-primary-themed">Top Languages</h3>
              </div>
              <p className="text-secondary-themed mb-6">
                A breakdown of my most frequently used languages across public repositories.
              </p>
              <div className="space-y-4">
                <div className="flex w-full h-4 rounded-full overflow-hidden">
                  {topLanguages.map(lang => (
                    <div key={lang.name} className={`${lang.color}`} style={{ width: `${lang.percentage}%` }}></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {topLanguages.map(lang => (
                    <div key={lang.name} className="flex items-center text-sm">
                      <div className={`w-3 h-3 rounded-full ${lang.color} mr-2`}></div>
                      <span className="text-primary-themed">{lang.name}</span>
                      <span className="ml-auto text-tertiary-themed">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center mb-4 ml-2">
            <Calendar className="w-6 h-6 text-blue-300 mr-3" />
            <h3 className="text-2xl font-bold text-primary-themed">Contribution Activity</h3>
          </div>
          <GithubActivityGraph />
           <motion.a
              href="https://github.com/Rene-Mayhrem"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="mt-6 btn-primary inline-flex items-center gap-2 px-6 py-2 text-md font-semibold rounded-full"
            >
              <Github className="w-5 h-5" />
              Explore on GitHub
            </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubStats;