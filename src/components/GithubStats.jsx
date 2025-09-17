import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitCommit, GitPullRequest, Code, Calendar } from 'lucide-react';

// Your GitHub username
const GITHUB_USERNAME = 'Rene-Mayhrem'; 

// === 1. MODULAR COMPONENTS ===

// Skeleton loader for a stat card
const StatCardSkeleton = () => (
  <div className="glass rounded-2xl p-6 animate-pulse hover-lift">
    <div className="w-12 h-12 bg-gray-400/30 rounded-full mx-auto mb-4"></div>
    <div className="h-8 bg-gray-400/30 rounded-md w-3/4 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-400/30 rounded-md w-1/2 mx-auto"></div>
  </div>
);

// Individual Stat Card component
const StatCard = ({ icon: Icon, label, value, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -30 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="glass rounded-2xl p-6 text-center hover-lift transform-gpu"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <motion.div style={{ transform: 'translateZ(20px)' }}>
      <Icon className={`w-12 h-12 ${color} mx-auto mb-4`} />
      <div className="text-4xl font-bold text-primary-themed mb-2">{value}</div>
      <div className="text-md text-tertiary-themed">{label}</div>
    </motion.div>
  </motion.div>
);

// Top Languages Bar and Legend
const TopLanguagesSection = ({ topLanguages }) => (
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
          {topLanguages.map((lang, index) => (
            <div key={index} className={`bg-[${lang.color}]`} style={{ width: `${lang.percentage}%` }}></div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {topLanguages.map((lang, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className={`w-3 h-3 rounded-full bg-[${lang.color}] mr-2`}></div>
              <span className="text-primary-themed">{lang.name}</span>
              <span className="ml-auto text-tertiary-themed">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// === 2. MAIN COMPONENT WITH IMPROVEMENTS ===

const GithubStats = () => {
  const [stats, setStats] = useState([]);
  const [topLanguages, setTopLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const statsResponse = await fetch(`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&count_private=true&show_icons=true&theme=dark`);
        const statsData = await statsResponse.json();
        
        const langResponse = await fetch(`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide=css,html&theme=dark`);
        const langData = await langResponse.json();

        // Check for API errors
        if (statsData.error || langData.error) {
          throw new Error('API returned an error.');
        }

        const updatedStats = [
          { icon: GitCommit, label: 'Total Commits', value: statsData.commits.total || 'N/A', color: 'text-green-400' },
          { icon: GitPullRequest, label: 'Pull Requests', value: statsData.pull_requests.total || 'N/A', color: 'text-purple-400' },
          { icon: Star, label: 'Stars Received', value: `${statsData.stargazers_count}+` || 'N/A', color: 'text-yellow-400' },
          { icon: Github, label: 'Repositories', value: statsData.public_repos || 'N/A', color: 'text-blue-400' },
        ];
        setStats(updatedStats);

        const updatedLanguages = Object.keys(langData).map(key => ({
            name: langData[key].name,
            percentage: Math.round(langData[key].percent),
            // The API returns hex codes, so we pass them directly to the style attribute
            color: langData[key].color
        }));
        setTopLanguages(updatedLanguages);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setIsLoading(false);
        setHasError(true);
      }
    }
    fetchGithubStats();
  }, []);

  // Show skeleton loaders while data is fetching
  if (isLoading) {
    return (
      <section id="github-stats" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-pulse">My Coding Footprint</h2>
            <p className="text-xl text-secondary-themed max-w-3xl mx-auto animate-pulse">
              A snapshot of my activity and contributions on GitHub.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
            </div>
            <div className="glass rounded-2xl p-8 animate-pulse h-64"></div>
          </div>
        </div>
      </section>
    );
  }

  // Handle API fetching errors
  if (hasError) {
    return (
      <section id="github-stats" className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-red-500">
            Failed to load GitHub stats. Please check your internet connection or try again later.
          </p>
        </div>
      </section>
    );
  }

  // Main content after data is loaded
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
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
          <TopLanguagesSection topLanguages={topLanguages} />
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
          <div className="flex justify-center my-6">
              <img 
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=react-dark`} 
                  alt="GitHub Activity Graph" 
                  className="w-full max-w-4xl rounded-lg shadow-lg"
              />
          </div>
          <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
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