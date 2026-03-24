import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    Terminal,
    Database,
    BrainCircuit,
    Wrench,
    GraduationCap,
    Calendar,
    MapPin,
    Award,
    Code
} from 'lucide-react';
import './CapabilitiesEducation.css';

const IconMap = {
    Terminal: <Terminal size={32} className="text-primary mb-2" />,
    Database: <Database size={32} className="text-primary mb-2" />,
    BrainCircuit: <BrainCircuit size={32} className="text-primary mb-2" />,
    Wrench: <Wrench size={32} className="text-primary mb-2" />,
    Code: <Code size={32} className="text-primary mb-2" />
};

const fallbackCapabilities = [
    {
        title: 'Full Stack Development',
        icon: 'Terminal',
        skills: ['Frontend: React, HTML, CSS', 'Backend: Node.js, Express', 'Database: MongoDB, SQL']
    },
    {
        title: 'Programming Languages',
        icon: 'Code',
        skills: ['Languages: Python, JavaScript, C++, SQL, Java, PHP']
    },
    {
        title: 'Databases',
        icon: 'Database',
        skills: ['MongoDB, MySQL', 'PostgreSQL', 'Firebase']
    },
    {
        title: 'Tools & Platforms',
        icon: 'Wrench',
        skills: ['Git, GitHub', 'Docker, Postman', 'VS Code, Linux']
    }
];

const fallbackEducation = [
    {
        degree: 'B.Tech – Computer Science & Engineering',
        institution: 'Lovely Professional University',
        period: "AUG'23 – Present",
        score: 'CGPA: 7.87',
        location: 'INDIA'
    },
    {
        degree: 'Intermediate (Class XII)',
        institution: 'Cambridge International School, Phagwara',
        period: "APR'22 – MAR'23",
        score: 'Score: 77%',
        location: 'INDIA'
    },
    {
        degree: 'Matriculation (Class X)',
        institution: 'Cambridge International School, Phagwara',
        period: "APR'20 – MAR'21",
        score: 'Score: 85%',
        location: 'INDIA'
    }
];

const CapabilitiesEducation = () => {
    const [capabilities, setCapabilities] = useState([]);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [capRes, eduRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/experience'),
                    axios.get('http://localhost:5000/api/education')
                ]);
                setCapabilities(capRes.data.length ? capRes.data : fallbackCapabilities);
                setEducation(eduRes.data.length ? eduRes.data : fallbackEducation);
            } catch (error) {
                console.error('Error fetching data, using fallback:', error);
                setCapabilities(fallbackCapabilities);
                setEducation(fallbackEducation);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <section id="capabilities-education" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-200 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Experience
                    </span>
                    <span className="relative z-10 text-primary uppercase tracking-[0.4em] font-black text-xs mb-4 block">Capabilities</span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main">Expertise & <span className="gradient-text italic">Education.</span></h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Capabilities Column */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg">
                                <Award size={24} />
                            </div>
                            <h3 className="text-3xl font-black italic">Core <span className="text-primary">Competencies</span></h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {capabilities.map((cap, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flip-card h-[220px]"
                                >
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front glass-card border-none p-10">
                                            <div className="p-4 rounded-3xl bg-gray-50 dark:bg-gray-800/80 mb-6 group-hover:bg-primary/10 transition-colors">
                                                {IconMap[cap.icon] || <Terminal size={32} className="text-primary" />}
                                            </div>
                                            <h4 className="text-xl font-black tracking-tight italic">{cap.title}</h4>
                                        </div>
                                        <div className="flip-card-back bg-primary text-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center shadow-2xl shadow-primary/20">
                                            <h4 className="text-xl font-black italic mb-6 opacity-40 uppercase tracking-tighter self-start absolute top-8 left-8">
                                                {cap.title === "Full Stack Development" ? "Full Stack" : cap.title}
                                            </h4>
                                            <div className="skill-tag-container">
                                                {cap.skills.map((skill, sIdx) => {
                                                    const hasLabel = skill.includes(':');
                                                    const label = hasLabel ? skill.split(':')[0] : null;
                                                    const cleanSkill = hasLabel ? skill.split(':')[1] : skill;
                                                    const skillItems = cleanSkill.includes(',') ? cleanSkill.split(',') : [cleanSkill];

                                                    return (
                                                        <div key={sIdx} className="flex flex-wrap justify-center gap-2 items-center">
                                                            {label && (
                                                                <span className="skill-category-label">
                                                                    {label}
                                                                </span>
                                                            )}
                                                            {skillItems.map((item, iIdx) => (
                                                                <span key={`${sIdx}-${iIdx}`} className="px-3 py-1.5 bg-white/10 rounded-xl text-[11px] font-bold border border-white/10 hover:bg-white/20 hover:scale-105 transition-all cursor-default">
                                                                    {item.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-lg">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-3xl font-black italic">Education <span className="text-secondary">Roadmap</span></h3>
                        </div>

                        <div className="education-timeline relative">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    className="timeline-item group"
                                >
                                    <div className="timeline-dot shadow-primary/50 shadow-xl border-none w-5 h-5 bg-primary"></div>
                                    <div className="glass-card p-8 border-none rounded-[2.5rem] hover:bg-white/5 dark:hover:bg-gray-800/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
                                        <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                                            <h4 className="text-2xl font-black italic dark:text-white group-hover:text-primary transition-colors tracking-tight">
                                                {edu.degree}
                                            </h4>
                                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary text-white px-4 py-1.5 rounded-full shadow-lg shadow-primary/10">
                                                <Calendar size={12} /> {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-primary font-black uppercase tracking-widest text-[11px] mb-4">{edu.institution}</p>
                                        <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                                            {edu.score && (
                                                <span className="flex items-center gap-2">
                                                    <Award size={16} className="text-secondary" /> {edu.score}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-2">
                                                <MapPin size={16} className="text-primary" /> {edu.location}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesEducation;
