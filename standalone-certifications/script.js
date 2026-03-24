document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Smooth Scrolling for Navigation Links
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer for Active Section Highlight
    const observerOptions = {
        threshold: 0.5 // Section is active when 50% visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNav(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    function updateActiveNav(id) {
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === `#${id}`) {
                btn.classList.add('active');
            }
        });
    }

    // 4. Reveal Animations on Scroll
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => revealObserver.observe(el));

    // 5. Tooltip Behavior (Manual override if needed for touch)
    const sideButtons = document.querySelectorAll('.social-btn, .nav-btn');
    sideButtons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            // Force show tooltip on touch devices
            btn.classList.add('touch-active');
        });
    });
});
