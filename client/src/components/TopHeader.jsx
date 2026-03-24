import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Eye, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopHeader = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        const handleScroll = () => {
            setIsVisible(window.scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        
                        {/* Profile Capsule */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pointer-events-auto flex items-center gap-4 px-6 py-3 bg-white/60 dark:bg-[#111827]/60 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-full shadow-2xl"
                        >
                            <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-white/10">
                                <div className="flex -space-x-1">
                                    <Eye size={16} className="text-primary animate-pulse" />
                                    <Eye size={16} className="text-primary animate-pulse" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-text-main dark:text-white uppercase tracking-tighter">Palak.</span>
                                    <span className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest">{formatTime(currentTime)}</span>
                                </div>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] -mt-0.5">Undergrad</span>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-text-muted dark:text-text-main"
                            >
                                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                            </button>
                        </motion.div>

                        {/* Central Vision Text */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hidden lg:flex flex-col items-center"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-text-muted dark:text-white/40">
                                INSIGHT IS POWER — I ENGINEER BOTH
                            </span>
                            <div className="w-12 h-px bg-primary/30 mt-2"></div>
                        </motion.div>

                        {/* Availability Badge */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pointer-events-auto px-6 py-3 bg-green-500/5 dark:bg-green-500/10 backdrop-blur-2xl border border-green-500/20 dark:border-green-500/30 rounded-full shadow-xl shadow-green-500/5 flex items-center gap-3"
                        >
                            <div className="relative">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
                                Available for Opportunities
                            </span>
                        </motion.div>

                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

export default TopHeader;
