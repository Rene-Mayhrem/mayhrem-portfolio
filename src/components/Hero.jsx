import { useEffect, useState } from "react";

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Software Engineer & DevOps Junior'

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <fullText.length) {
                setDisplayText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);
};

export default Hero;