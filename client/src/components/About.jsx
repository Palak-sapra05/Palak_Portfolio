import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2, Layers, Monitor, Server,
    Database, Settings, Layout, BrainCircuit
} from 'lucide-react';

const techData = [
    {
        category: "Core Programming",
        icon: <Code2 className="w-5 h-5" />,
        skills: ["C++", "Python", "JS", "Java"],
        color: "from-[#A5B4FC] to-[#F9A8D4]"
    },
    {
        category: "Data Structures & Algorithms",
        icon: <Layers className="w-5 h-5" />,
        skills: ["Arrays", "Trees", "DP", "Algo"],
        color: "from-[#1E293B] to-[#334155]"
    },
    {
        category: "Frontend",
        icon: <Monitor className="w-5 h-5" />,
        skills: ["React", "Tailwind", "JS"],
        color: "from-[#A5B4FC] to-[#E2E8F0] opacity-90"
    },
    {
        category: "Backend",
        icon: <Server className="w-5 h-5" />,
        skills: ["Node", "PHP", "Laravel"],
        color: "from-[#1E293B] to-[#A5B4FC]"
    },
    {
        category: "Databases",
        icon: <Database className="w-5 h-5" />,
        skills: ["MongoDB", "MySQL", "Firebase"],
        color: "from-[#F9A8D4] to-[#1E293B]"
    },
    {
        category: "DevOps",
        icon: <Settings className="w-5 h-5" />,
        skills: ["Docker", "Git", "Linux"],
        color: "from-[#A5B4FC] to-[#F9A8D4]"
    },
    {
        category: "System Design",
        icon: <Layout className="w-5 h-5" />,
        skills: ["APIs", "Scalability"],
        color: "from-[#1E293B] to-[#0F172A]"
    },
    {
        category: "Languages",
        icon: <Code2 className="w-5 h-5" />,
        skills: ["Python", "JavaScript", "C++", "Java", "SQL", "PHP"],
        color: "from-[#A5B4FC] to-[#67E8F9]"
    }
];

const About = () => {
    return (
        <section id="about" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden">

            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#A5B4FC]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#F9A8D4]/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 relative"
                >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10vw] font-black text-gray-200 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none -z-10 select-none whitespace-nowrap">
                        About Me
                    </span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main">
                        About <span className="gradient-text italic">Me.</span>
                    </h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

                    {/* LEFT SIDE */}
                    <div className="space-y-8 text-text-muted">

                        {/* Glass card FIXED */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-6 bg-card-bg border border-border-main rounded-2xl shadow-md transition-colors"
                        >
                            My full stack development learning journey has been driven by a passion for creating seamless user experiences and robust backend architectures.
                        </motion.div>

                        <p className="pl-6 border-l-2 border-primary/50">
                            I have a strong interest in{" "}
                            <span className="gradient-text font-semibold italic">
                                Data Structures and Algorithms
                            </span>, continually solving problems to write efficient, optimized code.
                        </p>

                        <p className="p-4 bg-card-bg border border-border-main rounded-xl transition-colors">
                            I gain hands-on experience building applications with modern technologies, allowing me to choose the right tools for complex problems.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-5 rounded-2xl bg-card-bg border border-border-main shadow-md transition-colors text-center">
                                <h4 className="text-3xl font-bold gradient-text">150+</h4>
                                <p className="text-xs uppercase tracking-widest text-text-muted mt-1 opacity-80">
                                    Problems Solved
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-card-bg border border-border-main shadow-md transition-colors text-center">
                                <h4 className="text-3xl font-bold gradient-text">5★</h4>
                                <p className="text-xs uppercase tracking-widest text-text-muted mt-1 opacity-80">
                                    LeetCode Rating
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE (Tech Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {techData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="p-5 rounded-2xl bg-[#111827] text-white shadow-lg border border-white/10"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-wide">
                                        {item.category}
                                    </h4>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="px-2 py-1 bg-primary/10 rounded-md text-xs text-text-muted font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
