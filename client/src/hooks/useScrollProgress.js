import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress as a percentage
 * (current scroll position / total scrollable height) * 100
 * Optimized with requestAnimationFrame for performance
 */
export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentScroll = window.scrollY;
            
            if (scrollTotal > 0) {
                const percentage = (currentScroll / scrollTotal) * 100;
                setProgress(percentage);
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initial call
        updateProgress();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return progress;
};
