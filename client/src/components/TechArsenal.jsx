import React from 'react';
import { motion } from 'framer-motion';
import { 
    Code2, 
    Layers, 
    Monitor, 
    Server, 
    Database, 
    Settings, 
    Layout, 
    Cpu,
    Terminal,
    GitBranch,
    Box,
    FastForward,
    Shield,
    Globe,
    Zap
} from 'lucide-react';
import './TechArsenal.css';

const techData = [
    {
        category: "Core Programming",
        icon: <Code2 className="w-6 h-6" />,
        skills: ["C++", "Python", "JavaScript", "Java"],
        color: "from-blue-500 to-cyan-400"
    },
    {
        category: "Data Structures & Algorithms",
        icon: <Layers className="w-6 h-6" />,
        skills: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Problem Solving"],
        color: "from-purple-500 to-pink-500"
    },
    {
        category: "Frontend Development",
        icon: <Monitor className="w-6 h-6" />,
        skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Animations"],
        color: "from-cyan-500 to-blue-500"
    },
    {
        category: "Backend Development",
        icon: <Server className="w-6 h-6" />,
        skills: ["Node.js", "Express.js", "PHP", "Laravel", "REST APIs", "Authentication"],
        color: "from-green-500 to-emerald-400"
    },
    {
        category: "Database & Storage",
        icon: <Database className="w-6 h-6" />,
        skills: ["MongoDB", "MySQL", "Firebase"],
        color: "from-orange-500 to-yellow-500"
    },
    {
        category: "DevOps & Tools",
        icon: <Settings className="w-6 h-6" />,
        skills: ["Docker", "Git", "GitHub", "Linux", "Postman"],
        color: "from-indigo-500 to-purple-500"
    },
    {
        category: "System Design",
        icon: <Layout className="w-6 h-6" />,
        skills: ["API Design", "Client-Server Architecture", "Scalability Basics"],
        color: "from-red-500 to-orange-500"
    },
    {
        category: "Specialized Skills",
        icon: <Cpu className="w-6 h-6" />,
        skills: ["AI Threat Detection System", "Full Stack Projects", "Voice-Controlled Apps"],
        color: "from-pink-500 to-rose-500"
    }
];

const SkillCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="tech-card relative group"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
            <div className={`absolute -inset-[1px] bg-gradient-to-br ${item.color} rounded-2xl opacity-20 group-hover:opacity-40 blur-[2px] transition-opacity duration-500`}></div>
            
            <div className="relative h-full glass-container p-6 rounded-2xl flex flex-col gap-4 border border-white/10 overflow-hidden">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-black/20`}>
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{item.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {item.skills.map((skill, idx) => (
                        <span 
                            key={idx} 
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:text-white group-hover:border-white/20 transition-all duration-300"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                    <Zap size={40} className="text-white" />
                </div>
            </div>
        </motion.div>
    );
};

const TechArsenal = () => {
    return (
        <section id="tech-arsenal" className="relative py-24 px-6 overflow-hidden bg-[#050505]">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#00f0ff] uppercase tracking-[0.4em] font-black text-xs mb-4 block">Capabilities</span>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#00f0ff] italic">Arsenal.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            Technologies and tools I use to design, build, and scale <span className="text-white underline decoration-[#ff003c]/40 underline-offset-4">applications.</span>
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techData.map((item, index) => (
                        <SkillCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechArsenal;
