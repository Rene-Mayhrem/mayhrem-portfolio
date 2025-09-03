import { useEffect, useRef } from "react";

const ParticleBackground = () => {
    const particlesRef = useRef(null);

    useEffect(() => {
        const createParticle = () => {
            if (!particlesRef.current) return;

            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15 + 's');
            
            particlesRef.current.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        };

        const interval = setInterval(createParticle, 300);

        return () => clearInterval(interval);
    }, []);

    return <div ref={particlesRef} className="particles" />
}; 

export default ParticleBackground;