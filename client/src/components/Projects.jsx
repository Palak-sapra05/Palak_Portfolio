import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ExternalLink, Github, Code2, X, Award, Zap } from 'lucide-react';

const ProjectCard = ({ project, index, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer h-full flex flex-col"
            onClick={() => onSelect(project)}
        >
            {/* Background Layers for Stacked Effect */}
            <div className="absolute -top-10 -left-5 inset-0 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100/50 -z-30 transform group-hover:-translate-y-2 transition-transform duration-700"></div>
            <div className="absolute -top-5 -left-2.5 inset-0 rounded-[2.5rem] bg-gray-100/50 dark:bg-white/5 border border-gray-100/80 -z-20 transform group-hover:-translate-y-1 transition-transform duration-700"></div>

            {/* Main Content Card */}
            <div className="relative flex-1 rounded-[2.5rem] bg-white dark:bg-card-bg border border-gray-100 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden">
                <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] min-h-[450px] h-full">
                    {/* Visual Side: Image */}
                    <div className="relative overflow-hidden group/img aspect-video lg:aspect-auto">
                        <motion.img 
                            layoutId={`img-${project._id || index}`}
                            src={project.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'} 
                            alt={project.title}
                            className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-700"></div>
                        <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-xl z-10 border border-white/20">
                            <Code2 size={24} className="text-black dark:text-white" />
                        </div>
                    </div>

                    {/* Content Side: Text & Actions */}
                    <div className="p-8 md:p-12 flex flex-col justify-between space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40">Case Study 0{index + 1}</span>
                                <div className="h-px flex-grow bg-gray-100 dark:bg-white/10"></div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-[0.9] mb-6">
                                {project.title}
                            </h3>
                            <p className="text-text-muted text-base leading-relaxed font-medium italic mb-8">
                                {project.description.length > 150 ? project.description.substring(0, 150) + '...' : project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((t) => (
                                    <span key={t} className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-text-muted">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a
                                href={project.links?.github || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-2 bg-gray-50 dark:bg-white/5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-black uppercase text-[10px] tracking-widest border border-gray-100 dark:border-white/10 shadow-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github size={18} /> GitHub
                            </a>
                            <a
                                href={project.links?.live || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-all font-black uppercase text-[10px] tracking-widest shadow-xl shadow-black/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={18} /> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const fallbackProjects = [
    {
        title: 'EcoDrive',
        description: 'A sustainable transportation hub developed using HTML, CSS, and PHP focused on promoting eco-friendly transportation solutions and optimizing travel routes.',
        tags: ['HTML', 'CSS', 'PHP'],
        links: { github: 'https://github.com/Palak-sapra05/ECO-DRIVE', live: '#' },
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'
    },
    {
        title: 'Virtual Art Gallery',
        description: 'A fully immersive MERN stack application allowing users to browse, upload, and interact with digital art in a curated virtual space with high-performance rendering.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        links: { github: 'https://github.com/Palak-sapra05/Virtual-art-gallery', live: '#' },
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'
    },
    {
        title: 'AI Health Advisor Chatbot',
        description: 'An intelligent AI-powered chatbot designed to provide preliminary health guidance, analyze symptoms, and offer wellness tips using NLP and FastAPI.',
        tags: ['Python', 'NLP', 'React', 'FastAPI'],
        links: { github: 'https://harshsharmasing.github.io/Chatbotharsh/', live: 'https://harshsharmasing.github.io/Chatbotharsh/' },
        image: 'https://www.shutterstock.com/image-vector/happy-robot-3d-ai-character-600nw-2464455965.jpg'
    },
    {
        title: 'Food Hub',
        description: 'A dynamic platform that connects users with a variety of delicious foods, offering seamless browsing, ordering, and delivery experiences in one place',
        tags: ['Html', 'Css', 'Javascript'],
        links: { github: 'https://github.com/Palak-sapra05/Food-Hub/blob/main/website%20to%20github.zip' },
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgroBssODz0qPYzwAS4O3KjXq1zpe1pqx5Q&s'
    }
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data.length ? res.data : fallbackProjects);
            } catch (error) {
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    return (
        <section id="projects" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden min-h-screen">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-100 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Projects
                    </span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main dark:text-white">
                        Featured <span className="gradient-text italic">Work.</span>
                    </h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-80 rounded-[2rem] bg-white/5 animate-pulse border border-white/10" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project._id || index}
                                project={project}
                                index={index}
                                onSelect={setSelectedProject}
                            />
                        ))}
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-white/60 dark:bg-black/90 backdrop-blur-2xl"
                        />

                        <motion.div
                            layoutId={`project-${selectedProject._id || projects.indexOf(selectedProject)}`}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-card-bg border border-gray-100 dark:border-white/10 rounded-[3rem] shadow-2xl z-10"
                        >
                            {/* Immersive Image Header */}
                            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                                <img 
                                    src={selectedProject.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'} 
                                    className="w-full h-full object-cover"
                                    alt={selectedProject.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-card-bg via-transparent to-transparent"></div>
                                <button 
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-8 right-8 p-4 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-white/20 text-black dark:text-white hover:scale-110 transition-all shadow-xl"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 md:p-16 -mt-32 relative z-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white dark:bg-card-bg p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-gray-50 dark:border-white/5"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-8 mb-12">
                                        <div className="space-y-4">
                                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40">Featured Project</span>
                                            <h3 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter uppercase italic italic italic italic">
                                                {selectedProject.title}
                                            </h3>
                                        </div>

                                        <div className="flex gap-4">
                                            <a href={selectedProject.links?.github || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-50 dark:bg-white/10 border border-gray-100 text-[10px] font-black uppercase tracking-widest text-black dark:text-white hover:bg-black hover:text-white transition-all">
                                                <Github size={20} /> Repository
                                            </a>
                                            <a href={selectedProject.links?.live || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-black dark:bg-white text-[10px] font-black uppercase tracking-widest text-white dark:text-black hover:scale-105 transition-all shadow-xl shadow-black/10">
                                                <ExternalLink size={20} /> Live Demo
                                            </a>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-[1.5fr_1fr] gap-16">
                                        <div className="space-y-10">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 dark:text-white/30 mb-6 underline decoration-black/10 underline-offset-8">Description</h4>
                                                <p className="text-xl text-text-muted dark:text-gray-400 leading-relaxed font-medium italic">
                                                    {selectedProject.description}
                                                </p>
                                            </div>
                                            
                                            <div className="p-10 rounded-[2.5rem] bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 dark:text-white/30 mb-6 flex items-center gap-3">
                                                    < Zap size={16} /> Key Features
                                                </h4>
                                                <ul className="grid sm:grid-cols-2 gap-4">
                                                    {selectedProject.tags.map((t, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-text-muted italic">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"></div> {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-10">
                                            <div className="p-10 rounded-[2.5rem] bg-black dark:bg-white text-white dark:text-black shadow-2xl">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8">Technical Stack</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {selectedProject.tags.map((t) => (
                                                        <span key={t} className="px-5 py-2.5 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-black/10 text-[10px] font-black uppercase tracking-widest">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 opacity-60 italic">
                                                <Award className="text-black dark:text-white shrink-0" size={24} />
                                                <span className="text-xs font-bold leading-tight uppercase tracking-widest">Patent-level architectural innovation.</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
