import React from 'react';
import { motion } from 'framer-motion';
import { Download, Send, Linkedin, Github, Mail } from 'lucide-react';
import profileImg from '../assets/Palak3.jpeg';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-bg-main transition-colors duration-300 px-6">

            {/* Top Badges (Reference Style) */}

            <div className="relative z-10 max-w-7xl mx-auto w-full py-12">
                <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-center">

                    {/* Left Side: Content */}
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-main tracking-tighter leading-tight mb-4">
                                Hey, I'm <span className="gradient-text italic">Palak.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed font-medium mt-8"
                        >
                            I’m a Full Stack Developer specializing in MERN stack, building efficient,
                            user-focused applications that solve real-world problems.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap gap-4 pt-4 mt-8"
                        >
                            <a
                                href="/resume/PalakCv4.pdf"
                                download
                                className="group px-8 py-4 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-full font-black flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 hover:bg-primary dark:hover:bg-primary dark:hover:text-white"
                            >
                                <Download size={20} className="group-hover:-translate-y-1 transition-transform" /> Download CV
                            </a>
                            <a
                                href="#contact"
                                className="group px-8 py-4 bg-[#0F172A] dark:bg-white/10 text-white dark:text-white rounded-full font-black flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:text-primary dark:hover:bg-white/20 border border-white/10"
                            >
                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Contact Me
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Side: Visual Element (Reference Style) */}
                    <div className="relative flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative group"
                        >
                            <div className="relative z-10 w-72 h-72 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl bg-card-bg p-2 border border-border-main rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                <img
                                    src={profileImg}
                                    alt="Palak Sapra"
                                    className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            {/* Decorative Network Nodes behind image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-3xl -z-10 rounded-full animate-pulse"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Scroll Notice */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
                <div className="w-10 h-[1px] bg-text-muted"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll Down</span>
                <div className="w-10 h-[1px] bg-text-muted"></div>
            </div>
        </section>
    );
};

export default Hero;
