import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Trophy, Award, Star, Zap, Terminal, Cpu } from 'lucide-react';

const IconMap = {
    Trophy: <Trophy className="text-primary" size={32} />,
    Award: <Award className="text-secondary" size={32} />,
    Star: <Star className="text-yellow-500" size={32} />,
    Zap: <Zap className="text-orange-500" size={32} />
};

const fallbackAchievements = [
    {
        title: '150+ LeetCode Questions',
        description: 'Successfully solved over 150 complex Data Structures and Algorithms problems on LeetCode.',
        icon: 'Star',
        type: 'Star'
    },
    {
        title: '5-Star LeetCode Rating',
        description: 'Achieved and maintained a 5-star rating on LeetCode, demonstrating consistent performance.',
        icon: 'Trophy',
        type: 'Achievement'
    },
    {
        title: 'Patent Holder (Inventor)',
        description: 'Filed a patent for an AI-powered Threat Detection System using machine learning.',
        icon: 'Award',
        type: 'Patent'
    }
];

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/achievements');
                setAchievements(res.data.length ? res.data : fallbackAchievements);
            } catch (error) {
                console.error('Error fetching achievements, using fallback:', error);
                setAchievements(fallbackAchievements);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    return (
        <section id="achievements" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-200 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Trophies
                    </span>
                    <span className="relative z-10 text-primary uppercase tracking-[0.4em] font-black text-xs mb-4 block font-medium">Milestones</span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main">Global <span className="gradient-text italic">Wins.</span></h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </motion.div>

                {/* Left side floating profiles panel (Icon-based) - Repositioned to avoid overlap */}
                <div className="hidden xl:block absolute -left-20 top-0 h-full">
                    <div className="sticky top-1/2 -translate-y-1/2 flex flex-col gap-4 p-3 glass-card border-none rounded-2xl shadow-2xl z-20 backdrop-blur-xl bg-white/5">
                        <a
                            href="https://leetcode.com/u/saprapalak69/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-[#FF9B51] hover:bg-primary hover:text-white transition-all group relative animate-in fade-in slide-in-from-left duration-500"
                            title="LeetCode Profile"
                        >
                            <Trophy size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-text-main text-bg-main text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all translate-x-1 group-hover:translate-x-0 shadow-2xl">
                                LeetCode
                            </span>
                        </a>
                        <a
                            href="https://www.hackerrank.com/profile/Palak_12326835"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-[#2EC866] hover:bg-[#2EC866] hover:text-white transition-all group relative animate-in fade-in slide-in-from-left duration-700"
                            title="HackerRank Profile"
                        >
                            <Terminal size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-text-main text-bg-main text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all translate-x-1 group-hover:translate-x-0 shadow-2xl">
                                HackerRank
                            </span>
                        </a>
                        <a
                            href="https://www.hackerearth.com/@saprapalak69/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-[#323754] dark:text-[#E2E8F0] hover:bg-text-main hover:text-bg-main transition-all group relative animate-in fade-in slide-in-from-left duration-1000"
                            title="HackerEarth Profile"
                        >
                            <Cpu size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-text-main text-bg-main text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all translate-x-1 group-hover:translate-x-0 shadow-2xl">
                                HackerEarth
                            </span>
                        </a>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="aspect-video rounded-[2rem] bg-white/5 animate-pulse border border-white/10" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 translate-x-0">
                        {achievements.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="glass-card rounded-[2.5rem] group p-10 h-full flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
                                    <div className="flex justify-center mb-8">
                                        <div className="p-5 rounded-[2rem] bg-gray-100 dark:bg-white/5 group-hover:bg-primary/10 transition-colors shadow-inner text-primary">
                                            {IconMap[item.icon] || <Award className="text-secondary" size={32} />}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black mb-5 dark:text-white group-hover:text-primary transition-colors tracking-tight italic">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium flex-grow">
                                        {item.description}
                                    </p>

                                    <div className="mt-8 pt-6 border-t border-primary/5 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
                                        <span>Verified Achievement</span>
                                        <Zap size={14} className="text-primary/50" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Achievements;
