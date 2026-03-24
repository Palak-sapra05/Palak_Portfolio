import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import TopHeader from './components/TopHeader'
import Hero from './components/Hero'
import About from './components/About'
import CapabilitiesEducation from './components/CapabilitiesEducation'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import SidePanel from './components/SidePanel'
import Chatbot from './components/Chatbot'
import Spotlight from './components/Spotlight'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NeuralNetworkBackground from './components/NeuralNetworkBackground'
import Preloader from './components/Preloader'
import { AnimatePresence } from 'framer-motion'

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) return; // Don't run while preloader is active

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.fade-in-up');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [isLoading]);

    return (
        <ThemeProvider>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {!isLoading && (
                <div key="main-content" className="min-h-screen bg-bg-main text-text-main transition-colors duration-300 font-inter">
                    <NeuralNetworkBackground />
                    <Spotlight />
                    <SidePanel />
                    <Chatbot />
                    <TopHeader />
                    <main>
                        <Hero />
                        <About />
                        <CapabilitiesEducation />
                        <Projects />
                        <Certifications />
                        <Achievements />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            )}
        </ThemeProvider>
    );
}

export default App
