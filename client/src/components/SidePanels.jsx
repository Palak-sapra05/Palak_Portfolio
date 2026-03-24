import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Code2, Terminal, Cpu, Home, User, Layers, Award, Mail, Trophy, Star, GraduationCap } from 'lucide-react';

const SidePanels = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: "-10% 0px -10% 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

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
        <>
            {/* Left Panel: Social & Profiles */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 p-3 bg-card-bg backdrop-blur-xl border border-border-main !rounded-full shadow-2xl transition-colors duration-500">
                <SocialIcon icon={<Code2 size={24} />} tooltip="LeetCode" link="https://leetcode.com/u/saprapalak69/" />
                <SocialIcon icon={<Terminal size={24} />} tooltip="HackerRank" link="https://www.hackerrank.com/profile/Palak_12326835" />
                <SocialIcon icon={<Cpu size={24} />} tooltip="HackerEarth" link="https://www.hackerearth.com/@saprapalak69/" />
                <SocialIcon icon={<Github size={24} />} tooltip="GitHub" link="https://github.com/Palak-sapra05" />
            </div>

            {/* Right Panel: Navigation */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 p-3 bg-card-bg backdrop-blur-xl border border-border-main !rounded-full shadow-2xl transition-colors duration-500">
                <NavIcon 
                    icon={<Home size={24} />} 
                    tooltip="Home" 
                    active={activeSection === 'hero'} 
                    onClick={() => scrollToSection('hero')} 
                />
                <NavIcon 
                    icon={<User size={24} />} 
                    tooltip="About" 
                    active={activeSection === 'about'} 
                    onClick={() => scrollToSection('about')} 
                />
                <NavIcon 
                    icon={<GraduationCap size={24} />} 
                    tooltip="Education" 
                    active={activeSection === 'capabilities-education'} 
                    onClick={() => scrollToSection('capabilities-education')} 
                />
                <NavIcon 
                    icon={<Cpu size={24} />} 
                    tooltip="Skills" 
                    active={activeSection === 'capabilities-education'} 
                    onClick={() => scrollToSection('capabilities-education')} 
                />
                <NavIcon 
                    icon={<Layers size={24} />} 
                    tooltip="Featured Work" 
                    active={activeSection === 'projects'} 
                    onClick={() => scrollToSection('projects')} 
                />
                <NavIcon 
                    icon={<Award size={24} />} 
                    tooltip="Certifications" 
                    active={activeSection === 'certifications'} 
                    onClick={() => scrollToSection('certifications')} 
                />
                <NavIcon 
                    icon={<Trophy size={24} />} 
                    tooltip="Achievements" 
                    active={activeSection === 'achievements'} 
                    onClick={() => scrollToSection('achievements')} 
                />
                <NavIcon 
                    icon={<Mail size={24} />} 
                    tooltip="Contact" 
                    active={activeSection === 'contact'} 
                    onClick={() => scrollToSection('contact')} 
                />
            </div>
        </>
    );
};

const SocialIcon = ({ icon, tooltip, link }) => (
    <div className="relative group">
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-text-main/60 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-lg group"
        >
            {icon}
        </a>
        <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {tooltip}
        </span>
    </div>
);

const NavIcon = ({ icon, tooltip, active, onClick }) => (
    <div className="relative group">
        <button 
            onClick={onClick}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-sm ${
                active 
                ? 'bg-primary text-white shadow-primary/40 shadow-xl accent-glow scale-110 border-primary' 
                : 'bg-gray-100 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-text-main/60 hover:bg-primary/20 hover:text-primary'
            }`}
        >
            {icon}
        </button>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {tooltip}
        </span>
    </div>
);

export default SidePanels;
