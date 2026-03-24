import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ExternalLink, Github, Code2, X, Award, Zap, ChevronDown } from 'lucide-react';

// Accent colours cycling per card
const CARD_COLORS = ['#A5B4FC', '#F9A8D4', '#67E8F9', '#86EFAC', '#FDE68A', '#C4B5FD'];

// ─── Sticky Stacking Card ─────────────────────────────────────────────────────
const ProjectCard = ({ project, index, total, containerRef, onSelect }) => {
    const color = CARD_COLORS[index % CARD_COLORS.length];
    const isEven = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // This card starts shrinking once the *next* card starts coming in
    const segStart = index / total;
    const segEnd = (index + 1) / total;

    const scale = useTransform(scrollYProgress, [segStart, segEnd], [1, 0.90]);

    // Slightly increment top so each card peeks behind the one above
    const stickyTop = 100 + index * 14;

    return (
        <div
            style={{
                position: 'sticky',
                top: `${stickyTop}px`,
                zIndex: index + 1,
                marginBottom: index < total - 1 ? '12rem' : 0,
            }}
        >
            <motion.div
                style={{ scale, transformOrigin: 'top center' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
                    whileHover={{ y: -8 }}
                    onClick={() => onSelect(project)}
                    className="relative cursor-pointer rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#1E293B] group shadow-2xl"
                    style={{
                        boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${color}18`,
                    }}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[3px] z-10"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent 70%)` }}
                    />

                    {/* Background glow blob */}
                    <div
                        className="absolute pointer-events-none opacity-[0.07] blur-3xl rounded-full w-72 h-72"
                        style={{
                            background: color,
                            top: '-4rem',
                            right: isEven ? '-4rem' : 'auto',
                            left: isEven ? 'auto' : '-4rem',
                        }}
                    />

                    <div className="flex flex-col lg:flex-row min-h-[520px]">
                        {/* ── Image side ── */}
                        <div
                            className={`relative overflow-hidden bg-[#0F172A] aspect-video lg:aspect-auto lg:w-[45%] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                        >
                            <img
                                src={project.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            {/* gradient overlay toward content side */}
                            <div
                                className="absolute inset-0 hidden lg:block"
                                style={{
                                    background: isEven
                                        ? 'linear-gradient(to left, #1E293B 0%, transparent 60%)'
                                        : 'linear-gradient(to right, #1E293B 0%, transparent 60%)',
                                }}
                            />
                            <div className="absolute inset-0 block lg:hidden"
                                style={{ background: 'linear-gradient(to top, #1E293B 0%, transparent 60%)' }}
                            />

                            {/* Index badge */}
                            <div
                                className="absolute top-5 left-5 w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shadow-lg z-10"
                                style={{ background: color, color: '#0F172A' }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Code icon */}
                            <div className="absolute top-5 right-5 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 z-10">
                                <Code2 size={18} className="text-white" />
                            </div>
                        </div>

                        {/* ── Content side ── */}
                        <div
                            className={`flex-1 p-8 md:p-10 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                        >
                            <div>
                                {/* Case label */}
                                <div className="flex items-center gap-3 mb-5">
                                    <span
                                        className="text-[10px] font-black uppercase tracking-[0.35em]"
                                        style={{ color }}
                                    >
                                        Case Study {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="h-px flex-grow" style={{ background: `${color}30` }} />
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-[0.95] mb-5">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.slice(0, 4).map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest"
                                            style={{
                                                background: `${color}15`,
                                                color,
                                                border: `1px solid ${color}30`,
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3">
                                <a
                                    href={project.links?.github || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 py-3 px-5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 border"
                                    style={{
                                        background: `${color}10`,
                                        color,
                                        borderColor: `${color}30`,
                                    }}
                                >
                                    <Github size={16} /> GitHub
                                </a>
                                <a
                                    href={project.links?.live || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 py-3 px-5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl"
                                    style={{ background: color, color: '#0F172A' }}
                                >
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const ProjectModal = ({ project, index, onClose }) => {
    if (!project) return null;
    const color = CARD_COLORS[index % CARD_COLORS.length];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl"
                style={{
                    background: '#1E293B',
                    border: `1px solid ${color}25`,
                    boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px ${color}15`,
                }}
            >
                {/* Accent bar */}
                <div className="h-1 rounded-t-[2.5rem]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                >
                    <X size={20} />
                </button>

                {/* Hero image */}
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                    <img
                        src={project.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'}
                        className="w-full h-full object-cover"
                        alt={project.title}
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #1E293B 0%, transparent 60%)` }} />
                </div>

                {/* Content */}
                <div className="p-8 md:p-14 -mt-24 relative z-10">
                    <div className="bg-[#1E293B] rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl">
                        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 block" style={{ color }}>
                                    Featured Project
                                </span>
                                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <a
                                    href={project.links?.github || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all hover:scale-105"
                                    style={{ background: `${color}10`, color, borderColor: `${color}30` }}
                                >
                                    <Github size={16} /> Repository
                                </a>
                                <a
                                    href={project.links?.live || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl"
                                    style={{ background: color, color: '#0F172A' }}
                                >
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10">
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-40 text-white">Description</h4>
                                    <p className="text-base text-slate-300 leading-relaxed font-medium italic">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="p-8 rounded-[1.5rem] border border-white/5 bg-white/5">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-5 flex items-center gap-2 opacity-40 text-white">
                                        <Zap size={14} /> Key Technologies
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {project.tags.map((t, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-300 italic">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-8 rounded-[1.5rem] shadow-xl" style={{ background: color }}>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 mb-6" style={{ color: '#0F172A' }}>
                                        Technical Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest"
                                                style={{ background: 'rgba(0,0,0,0.15)', color: '#0F172A' }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-6 rounded-[1.5rem] border border-white/10 opacity-60 italic">
                                    <Award className="text-white shrink-0" size={22} />
                                    <span className="text-xs font-bold leading-tight uppercase tracking-widest text-slate-300">
                                        Patent-level architectural innovation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Fallback data ────────────────────────────────────────────────────────────
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
        description: 'A dynamic platform that connects users with a variety of delicious foods, offering seamless browsing, ordering, and delivery experiences in one place.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        links: { github: 'https://github.com/Palak-sapra05/Food-Hub/blob/main/website%20to%20github.zip' },
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgroBssODz0qPYzwAS4O3KjXq1zpe1pqx5Q&s'
    }
];

// ─── Main Section ─────────────────────────────────────────────────────────────
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data.length ? res.data : fallbackProjects);
            } catch {
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    const handleSelect = (project, index) => {
        setSelectedProject(project);
        setSelectedIndex(index);
    };

    return (
        <section id="projects" className="relative bg-bg-main transition-colors duration-300">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* ── Section header ── */}
            <div className="pt-24 md:pt-32 pb-16 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-100 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Projects
                    </span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-white">
                        Featured <span className="gradient-text italic">Work.</span>
                    </h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full mb-6" />
                    <p className="text-slate-400 text-sm font-medium max-w-md mx-auto">
                        Scroll down to browse each project — cards stack as you go.
                    </p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        className="flex justify-center mt-8"
                    >
                        <ChevronDown size={24} className="text-slate-500" />
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Stacking scroll container ── */}
            <div
                ref={containerRef}
                className="relative max-w-4xl mx-auto px-6"
                style={{ paddingBottom: '8rem' }}
            >
                {loading
                    ? [...Array(4)].map((_, i) => (
                        <div key={i} className="h-72 rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10 mb-8" />
                    ))
                    : projects.map((project, index) => (
                        <ProjectCard
                            key={project._id || index}
                            project={project}
                            index={index}
                            total={projects.length}
                            containerRef={containerRef}
                            onSelect={(p) => handleSelect(p, index)}
                        />
                    ))
                }
            </div>

            {/* ── Detail modal ── */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        index={selectedIndex}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
