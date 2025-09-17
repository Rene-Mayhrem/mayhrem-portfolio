import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Server, 
  Code, 
  Database, 
  Shield, 
  Container,
  GitBranch,
  Monitor,
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cloud & Virtualization',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'AWS', level: 95 },
        { name: 'GCP', level: 80 },
        { name: 'Azure', level: 70 }
      ]
    },
    {
      title: 'Containerization',
      icon: Container,
      color: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'Kubernetes', level: 95 },
        { name: 'Docker', level: 90 },
        { name: 'Istio', level: 80 }
      ]
    },
    {
      title: 'Infrastructure as Code',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Terraform', level: 95 },
        { name: 'Ansible', level: 85 },
        { name: 'Pulumi', level: 75 }
      ]
    },
    {
      title: 'CI/CD & GitOps',
      icon: GitBranch,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'GitHub Actions', level: 95 },
        { name: 'Jenkins', level: 90 },
      ]
    },
    {
      title: 'Observability',
      icon: Monitor,
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Prometheus', level: 90 },
        { name: 'Grafana', level: 85 },
        { name: 'Datadog', level: 80 }
      ]
    },
    {
      title: 'Languages & Scripting',
      icon: Code,
      color: 'from-indigo-500 to-blue-500',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Bash', level: 95 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Skills & Expertise</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            My toolkit for building modern, scalable, and resilient software systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/90 font-medium">{skill.name}</span>
                      <span className="text-white/60 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional certifications section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-blue-300">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Certified Kubernetes Administrator (CKA)',
              'AWS Certified DevOps Engineer - Professional',
              'HashiCorp Certified: Terraform Associate',
              'Google Certified Professional Cloud Architect'
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-full px-6 py-3 text-white/90 font-medium hover-lift"
              >
                <Shield className="w-4 h-4 inline mr-2 text-green-400" />
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;