import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-border-main bg-bg-main">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <div className="flex gap-6 mb-8">
                    {[
                        { icon: <Github size={20} />, link: 'https://github.com/Palak-sapra05' },
                        { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/palak-sapra08/' },
                        { icon: <Mail size={20} />, link: '#' }
                    ].map((social, i) => (
                        <a key={i} href={social.link} className="text-gray-400 hover:text-primary transition-colors">
                            {social.icon}
                        </a>
                    ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                    &copy; {new Date().getFullYear()} Palak Sapra. All rights reserved.
                </p>
                <div className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary/50">
                    Built with <span className="text-primary">MERN</span> 
                </div>
            </div>
        </footer>
    );
};

export default Footer;
