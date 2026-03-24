import { useState, useEffect } from 'react';

/**
 * Hook to track which section is currently active in the viewport
 * @param {string[]} sectionIds - Array of section IDs to monitor
 * @param {number} threshold - Threshold for IntersectionObserver (default 0.3)
 * @returns {string} activeSection - The ID of the currently active section
 */
export const useActiveSection = (sectionIds, threshold = 0.3) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        const observerOptions = {
            threshold: threshold,
            rootMargin: "-20% 0px -20% 0px" // Focus on center portion
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all matching section elements
        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sectionIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
            observer.disconnect();
        };
    }, [sectionIds, threshold]);

    return activeSection;
};
