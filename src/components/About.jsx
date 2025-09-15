import { Award, Calendar, GitCommit, MapPin } from "lucide-react";
import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { icon: Calendar, label: 'Years Experience', value: '+3' },
        { icon: Award, label: 'Certifications', value: '3' },
        // { icon: GitCommit, label: '' }
        { icon: MapPin, label: 'Based In', value: 'México | Remote' }
    ];

    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="tetx-4xl md:text-5xl font-bold mb-6 gardient-text">About me!</h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Automating complexity, building for resilience.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12-items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotateY: 15 }}
                        whileInView={{ opacity: 1, x:0, rotateY: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="relative transfor-gpu hover:scale-105 transition-transofrm duration-500">
                            <img 
                            src="..." 
                            alt="Rene Cruz working on a DevOps pipeline at his desk c:" 
                            className="rounder-2xl glass hover-lift w-full" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="glass rounded-2xl p-8 transform-gpu hover:rotate-y-2 transition-transform duration-500">
                            <h3 className="text-2xl font-bold mb-4 text-blue-300">My Philosophy</h3>
                            <p className="text-white/80 leading-relaxed mb-6">
                                With a background in Software Development, I transitioned to DevOps to bridge the gap between writing code and deploying it effectively. I believe in the power of "Infrastructure as Code" and robust automation to create self-healing, scalable systems. My goal is to empower development teams to ship features faster and more reliably.
                            </p>
                            <p className="text-white80 leading-relaxed">

                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;