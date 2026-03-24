import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Wait a bit after 100%
                    return 100;
                }
                return prev + Math.floor(Math.random() * 3) + 1; // Random speed up
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-auto"
        >
            <div className="relative w-full max-w-md px-10">
                {/* Main Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase italic">
                        Palak <span className="text-primary italic">Sapra</span>
                    </h1>
                    <div className="h-1 w-12 bg-primary mx-auto mt-4 rounded-full"></div>
                </motion.div>

                {/* Progress Bar Container */}
                <div className="relative h-px w-full bg-white/10 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage Text */}
                <div className="flex justify-between mt-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Initializing Portfolio</span>
                    <span className="text-xl font-black text-white italic tracking-tighter">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* Background Aesthetic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10"></div>
        </motion.div>
    );
};

export default Preloader;
