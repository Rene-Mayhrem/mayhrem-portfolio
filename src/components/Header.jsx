import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cloud, Menu, Moon, Sun, Zap } from "lucide-react";
import Button from "./ui/button";
import { useTheme } from "../lib/useTheme";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
            >
                <div className="relative">
                    <Cloud className="w-8 h-8 text-blue-400" />
                    <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-xl font-bold gradient-text">René Cruz</span>
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
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleTheme}
                className = 'text-primary-themed'
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-primary-themed'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <x className='w-6 h-6'/> : <Menu className='w-g h-6'/>}
            </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass rounded-lg p-4"
          >
            {
              ['about', 'skills', 'projects', 'github stats', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 text-primary-themed/80 hover:text-primary-themed transition-colors capitalize"  
                >
                  {item.replace('-', ' ')}
                </button>
              ))
            }
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleTheme}
              className='w-full justify-start text-primary-themed/80'
            >
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4"/> : <Moon className="mr-2 h-4 w-4"/>}
              Toggle Theme
            </Button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
