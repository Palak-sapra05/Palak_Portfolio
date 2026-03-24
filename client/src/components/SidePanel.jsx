import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    User,
    GraduationCap,
    Cpu,
    Layers,
    Award,
    Trophy,
    Mail
} from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
    { id: 'hero', icon: <Home size={22} />, tooltip: 'Home' },
    { id: 'about', icon: <User size={22} />, tooltip: 'About' },
    { id: 'capabilities-education', icon: <GraduationCap size={22} />, tooltip: 'Education' },
    { id: 'capabilities-education', icon: <Cpu size={22} />, tooltip: 'Skills' },
    { id: 'projects', icon: <Layers size={22} />, tooltip: 'Featured Work' },
    { id: 'certifications', icon: <Award size={22} />, tooltip: 'Certifications' },
    { id: 'achievements', icon: <Trophy size={22} />, tooltip: 'Achievements' },
    { id: 'contact', icon: <Mail size={22} />, tooltip: 'Contact' }
];

const SidePanel = () => {
    const scrollProgress = useScrollProgress();
    const activeSection = useActiveSection(NAV_ITEMS.map(item => item.id));
    const [hoveredItem, setHoveredItem] = useState(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed right-6 top-[55%] -translate-y-1/2 z-[100] hidden lg:flex flex-row items-center gap-6"
        >
            {/* Tooltip Overlay */}
            <AnimatePresence>
                {hoveredItem && (
                    <motion.div
                        key={hoveredItem}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute right-20 px-3 py-1.5 bg-[#0A0A0A]/95 border border-white/10 rounded-lg backdrop-blur-xl shadow-2xl z-[110]"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">
                            {hoveredItem}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Icons Container */}
            <div className="flex flex-col gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary font-black text-xl mb-6 shadow-sm select-none">
                    P
                </div>
                {NAV_ITEMS.map((item, index) => (
                    <motion.button
                        key={`${item.id}-${index}`}
                        onClick={() => scrollToSection(item.id)}
                        onMouseEnter={() => setHoveredItem(item.tooltip)}
                        onMouseLeave={() => setHoveredItem(null)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative group w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 border backdrop-blur-md ${activeSection === item.id
                                ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                                : 'bg-[#0A0A0A]/20 border-white/5 text-text-muted hover:border-white/20 hover:text-white'
                            }`}
                    >
                        {/* Glow on active */}
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 bg-primary/20 rounded-xl -z-10 blur-xl animate-pulse"
                            />
                        )}
                        {React.cloneElement(item.icon, { size: 18 })}
                    </motion.button>
                ))}
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-[320px] w-1 bg-gray-800/20 backdrop-blur-xl rounded-full border border-white/5 overflow-hidden flex flex-col-reverse shadow-2xl">
                {/* Track Background */}
                <div className="absolute inset-0 bg-gray-700/20"></div>

                {/* Dynamic Progress Fill */}
                <motion.div
                    className="w-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] rounded-full relative z-10 origin-bottom"
                    style={{
                        height: `${scrollProgress}%`,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 120
                    }}
                >
                    {/* Glow at the top of the fill */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full blur-md opacity-60"></div>
                </motion.div>

                {/* Vertical Accents (Markers) */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute left-1/2 -translate-x-1/2 w-1.5 h-px ${scrollProgress > (i * 25) ? 'bg-white/40' : 'bg-white/10'
                            }`}
                        style={{ bottom: `${i * 25}%` }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default SidePanel;
