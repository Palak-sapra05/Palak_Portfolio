import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award, MapPin, Calendar } from 'lucide-react';

const certifications = [
    {
        title: "Master Generative AI & Generative AI tools",
        issuer: "Infosys Springboard",
        image: "/certificates/infoysis.png",
        summary: "Advanced certification covering GenAI models, prompt engineering, and industry-standard AI development tools for scalable automation.",
        period: "August 2025",
        link: "/certificates/infoysis.png"
    },
    {
        title: "Privacy And Security in Online Media",
        issuer: "NPTEL (IIT Madras)",
        image: "/certificates/Nptel.png",
        summary: "Comprehensive study on data privacy, user anonymity, and threat modeling in modern online information systems and social platforms.",
        period: "October 2025",
        link: "/certificates/Nptel.png"
    },
    {
        title: "DSA in C++",
        issuer: "CodeChef / Training Hub",
        image: "/certificates/Dsa.png",
        summary: "Rigorous training in algorithmic problem-solving, including advanced graph theory, dynamic programming, and data structures.",
        period: "July 2025",
        link: "/certificates/Dsa.png"
    },
    {
        title: "Digital System",
        issuer: "Coursera",
        image: "/certificates/DigitalSystem.png",
        summary: "A digital system is an electronic framework that processes, stores, and transmits data using discrete binary signals to perform logical and computational operations.",
        period: "October 2024",
        link: "/certificates/DigitalSystem.png"
    },
    {
        title: "Hackathon",
        issuer: "Binary Blitz",
        image: "/certificates/Binary.png",
        summary: "Binary Blitz is a high-energy hackathon where innovators rapidly build and showcase cutting-edge tech solutions under intense time constraints.",
        period: "March 2024",
        link: "/certificates/Binary.png"
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = React.useState(null);

    // Prevent body scroll when cert is expanded
    React.useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedCert]);

    return (
        <section id="certifications" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-200 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Certificates
                    </span>
                    <span className="relative z-10 text-primary uppercase tracking-[0.4em] font-black text-xs mb-4 block">Achievements</span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main">Official <span className="gradient-text italic">Certificates.</span></h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            layoutId={`cert-${index}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => setSelectedCert({ ...cert, id: index })}
                            className="glass-card group cursor-pointer flex flex-col h-full rounded-[2rem] bg-card-bg border border-border-main p-3"
                        >
                            <motion.div
                                layoutId={`cert-img-${index}`}
                                className="relative overflow-hidden rounded-[1.5rem] aspect-[4/3] bg-gray-100 dark:bg-white/5"
                            >
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm">Preview</span>
                                </div>
                            </motion.div>

                            <div className="p-8 flex flex-col items-center">
                                <motion.h3
                                    layoutId={`cert-title-${index}`}
                                    className="text-xl font-black mb-4 text-center dark:text-white group-hover:text-primary transition-colors italic tracking-tight"
                                >
                                    {cert.title}
                                </motion.h3>

                                <motion.p
                                    layoutId={`cert-issuer-${index}`}
                                    className="text-xs font-bold uppercase tracking-widest text-text-muted opacity-60 mb-8"
                                >
                                    {cert.issuer}
                                </motion.p>

                                <button className="px-6 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expanded Lightbox */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-black/60 dark:bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            layoutId={`cert-${selectedCert.id}`}
                            className="relative w-full max-w-4xl bg-card-bg border border-border-main rounded-[2.5rem] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
                        >
                            <motion.div
                                layoutId={`cert-img-${selectedCert.id}`}
                                className="w-full md:w-1/2 aspect-video md:aspect-auto"
                            >
                                <img src={selectedCert.image} className="w-full h-full object-contain bg-white/5" />

                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
                                    className="absolute top-4 right-4 md:right-auto md:left-4 p-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </motion.div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                                <motion.p
                                    layoutId={`cert-issuer-${selectedCert.id}`}
                                    className="text-primary text-xs font-black uppercase tracking-widest mb-4 block"
                                >
                                    {selectedCert.issuer}
                                </motion.p>

                                <motion.h3
                                    layoutId={`cert-title-${selectedCert.id}`}
                                    className="text-3xl font-black text-text-main italic tracking-tighter mb-8 leading-tight"
                                >
                                    {selectedCert.title}
                                </motion.h3>

                                <div className="space-y-6 flex-grow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-text-main font-bold text-sm tracking-wide">Key Insight</h4>
                                            <p className="text-sm text-text-muted mt-1 leading-relaxed">{selectedCert.summary}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-text-main font-bold text-sm tracking-wide">Completion</h4>
                                            <p className="text-sm text-text-muted">{selectedCert.period}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <a
                                        href={selectedCert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-grow py-4 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-xl text-sm uppercase tracking-widest"
                                    >
                                        Inspect Full Certificate <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
