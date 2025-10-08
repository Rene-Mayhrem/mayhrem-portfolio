import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitCommit, GitPullRequest, Code, Calendar } from 'lucide-react';

const GITHUB_USERNAME = 'Rene-Mayhrem';

const StatCardSkeleton = () => (
  <div className="glass rounded-2xl p-6 animate-pulse hover-lift">
    <div className="w-12 h-12 bg-gray-400/30 rounded-full mx-auto mb-4"></div>
    <div className="h-8 bg-gray-400/30 rounded-md w-3/4 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-400/30 rounded-md w-1/2 mx-auto"></div>
  </div>
);

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

const TopLanguagesSection = ({ topLanguages }) => {
  const languageColors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'C++': '#f34b7d',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
  };

  if (!topLanguages || topLanguages.length === 0) return null;

  return (
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
            {topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: languageColors[lang.name] || '#ccc',
                  width: `${lang.percentage}%`,
                }}
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: languageColors[lang.name] || '#ccc' }}
                ></div>
                <span className="text-primary-themed">{lang.name}</span>
                <span className="ml-auto text-tertiary-themed">
                  {lang.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GithubStats = () => {
  const [stats, setStats] = useState([]);
  const [topLanguages, setTopLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const headers = {
          Accept: 'application/vnd.github.cloak-preview',
          // Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // optional for higher rate limit
        };

        const [userRes, reposRes, commitsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, { headers }),
          fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&per_page=1`, { headers }),
        ]);

        if (!userRes.ok || !reposRes.ok || !commitsRes.ok) throw new Error('GitHub API failed');

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const commitsData = await commitsRes.json();

        let totalStars = 0;
        let totalBytes = 0;
        let totalPullRequests = 0;
        const languageBytes = {};

        // Aggregate repo data
        for (const repo of reposData) {
          if (!repo.fork) {
            totalStars += repo.stargazers_count;
            const langRes = await fetch(repo.languages_url, { headers });
            const langData = await langRes.json();
            for (const [lang, bytes] of Object.entries(langData)) {
              languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
              totalBytes += bytes;
            }
          }
        }

        // Pull requests
        const prRes = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`,
          { headers }
        );
        const prData = await prRes.json();
        totalPullRequests = prData.total_count || 0;

        const sortedLanguages = Object.entries(languageBytes).sort(([, a], [, b]) => b - a);
        const updatedLanguages = totalBytes
          ? sortedLanguages.slice(0, 5).map(([name, bytes]) => ({
              name,
              percentage: (bytes / totalBytes) * 100,
            }))
          : [];

        setStats([
          { icon: GitCommit, label: 'Total Commits', value: commitsData.total_count || 0, color: 'text-green-400' },
          { icon: GitPullRequest, label: 'Pull Requests', value: totalPullRequests, color: 'text-purple-400' },
          { icon: Star, label: 'Stars Received', value: totalStars, color: 'text-yellow-400' },
          { icon: Github, label: 'Public Repositories', value: userData.public_repos, color: 'text-blue-400' },
        ]);
        setTopLanguages(updatedLanguages);
        setHasError(false);
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  const GithubActivityGraph = () => (
    <div className="flex justify-center my-6">
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=react-dark`}
        alt="GitHub Activity Graph"
        className="w-full max-w-4xl rounded-lg shadow-lg"
      />
    </div>
  );

  if (isLoading) {
    return (
      <section id="github-stats" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-pulse">
              My Coding Footprint
            </h2>
            <p className="text-xl text-secondary-themed max-w-3xl mx-auto animate-pulse">
              A snapshot of my activity and contributions on GitHub.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="grid grid-cols-2 gap-6">{[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}</div>
            <div className="glass rounded-2xl p-8 animate-pulse h-64"></div>
          </div>
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section id="github-stats" className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-red-500">
            Failed to load GitHub stats. Please try again later.
          </p>
        </div>
      </section>
    );
  }

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
            {stats.map((stat, idx) => (
              <StatCard key={stat.label} {...stat} index={idx} />
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
          <GithubActivityGraph />
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
