import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Terminal, Database, Server, Smartphone, Globe } from 'lucide-react';
import './SkillsTimeline.css';

const timelineData = [
    {
        year: '2021',
        title: 'Foundations & Frontend Basics',
        description: 'Began the programming journey with core structural concepts and basic UI design.',
        icon: <Globe size={24} />,
        techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'C++']
    },
    {
        year: '2022',
        title: 'Advanced JavaScript & Frameworks',
        description: 'Transitioned into single-page application development and modern state management.',
        icon: <Layers size={24} />,
        techs: ['React.js', 'Redux', 'Tailwind CSS', 'Framer Motion']
    },
    {
        year: '2023',
        title: 'Backend & APIs',
        description: 'Expanded into the server-side, building RESTful APIs and database schemas.',
        icon: <Server size={24} />,
        techs: ['Node.js', 'Express.js', 'MongoDB', 'PHP']
    },
    {
        year: '2024 Phase 1',
        title: 'Full Stack & System Architecture',
        description: 'Integrated frontend and backend systems to build fully functional web applications.',
        icon: <Database size={24} />,
        techs: ['MERN Stack', 'PostgreSQL', 'Firebase', 'System Design']
    },
    {
        year: 'Present',
        title: 'DevOps & Advanced Implementations',
        description: 'Currently focusing on deployment cycles, containerization, and writing scalable architecture.',
        icon: <Terminal size={24} />,
        techs: ['Docker', 'AWS Concepts', 'CI/CD Pipeline', 'Next.js']
    }
];

const SkillsTimeline = () => {
    return (
        <section id="skills-timeline" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[10vw] font-black text-gray-200 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Evolution
                    </span>
                    <span className="relative z-10 text-primary uppercase tracking-[0.4em] font-black text-xs mb-4 block">Timeline</span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main">Learning <span className="gradient-text italic">Progression.</span></h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </motion.div>

                <div className="relative wrap overflow-hidden p-10 h-full">
                    {/* Centered Glowing Line */}
                    <div className="absolute border-opacity-20 border-gray-400 h-full border" style={{ left: '50%' }}>
                        <div className="absolute h-full w-full bg-gradient-to-b from-primary via-secondary to-primary shadow-[0_0_15px_3px_rgba(253,186,116,0.5)] dark:shadow-[0_0_15px_3px_rgba(165,180,252,0.5)] -left-[2px] w-[5px]"></div>
                    </div>

                    <div className="flex flex-col gap-12 sm:gap-0">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                                    className={`mb-8 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse sm:flex-row-reverse' : 'sm:flex-row'} timeline-row`}
                                >
                                    {/* Empty space for alternating sides */}
                                    <div className="order-1 sm:w-[45%] hidden sm:block"></div>

                                    {/* Center Icon/Dot */}
                                    <div className="z-20 flex items-center order-1 drop-shadow-lg shadow-xl shadow-primary/20 w-12 h-12 rounded-full absolute left-1/2 -translate-x-1/2 bg-card-bg border-4 border-primary dark:border-primary text-text-main p-2">
                                        <div className="text-primary w-full h-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="order-1 w-[85%] sm:w-[45%] glass-card p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30 group">
                                        <h3 className="mb-1 font-black text-primary text-sm tracking-widest uppercase">{item.year}</h3>
                                        <h4 className="mb-3 font-bold text-xl md:text-2xl text-text-main leading-tight italic group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm md:text-base leading-snug text-text-muted mb-5 font-medium">
                                            {item.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {item.techs.map((tech, i) => (
                                                <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-text-main tracking-wide">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsTimeline;
