import { motion } from "framer-motion";
import { useState } from "react";
import { Cloud, Zap } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth'});
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
            <motion.div
                whileHover={{ scale: 10.5 }}
                className="flex items-center space-x-2"
            >
                <div className="relative">
                    <Cloud className="2-8 h-8 text-blue-400" />
                    <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-xl font-bold-gradient-text">René Cruz</span>
            </motion.div>
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {['about', 'skills', 'projects', 'github-stats', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-primary-themed/80 hover:text-primary-themed transition-colors capitalize font-medium"
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
