import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Mail, Linkedin, Send, MapPin, Github as GithubIcon } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending message...' });
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message.' });
        }
    };

    return (
        <section id="contact" className="section-padding bg-bg-main relative transition-colors duration-300 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-200 dark:text-white/5 uppercase tracking-[0.2em] pointer-events-none z-0 select-none whitespace-nowrap">
                        Connect
                    </span>
                    <span className="relative z-10 text-primary uppercase tracking-[0.4em] font-black text-xs mb-4 block">Information</span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-6 text-text-main">Get In <span className="gradient-text italic">Touch.</span></h2>
                    <div className="relative z-10 w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-12"
                    >
                        <div>
                            <h3 className="text-3xl font-black mb-8 italic text-text-main">Let's build something <br /><span className="text-primary font-black">incredible together.</span></h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/20">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-1">Email Me</p>
                                    <a href="mailto:saprapalak69@gmail.com" className="text-xl font-bold hover:text-primary transition-colors">saprapalak69@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-lg shadow-secondary/20">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-1">Location</p>
                                    <p className="text-xl font-bold">Punjab, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: <GithubIcon />, link: 'https://github.com/Palak-sapra05' },
                                { icon: <Linkedin />, link: 'https://www.linkedin.com/in/palak-sapra08/' },
                                { icon: <Mail />, link: 'https://mail.google.com/mail/u/0/#inbox' }
                            ].map((social, i) => (
                                <a key={i} href={social.link} className="w-12 h-12 rounded-xl glass-dark border border-white/5 flex items-center justify-center hover:bg-primary transition-all hover:-translate-y-1 shadow-xl">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-12"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest opacity-40">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all font-bold text-text-main"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest opacity-40">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all font-bold text-text-main"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-widest opacity-40">Message</label>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all font-bold resize-none text-text-main"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 glow-btn"
                            >
                                Send Message <Send size={20} />
                            </button>

                            {status.message && (
                                <p className={`text-center text-sm font-bold ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {status.message}
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
