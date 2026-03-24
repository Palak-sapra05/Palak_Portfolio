import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Spotlight = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the premium 'delayed' feel
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e) => {
      // Offset by half of the spotlight size (approx 600px / 2 = 300)
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden overflow-x-hidden">
      {/* Primary Glow for Dark/Light Focus */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          x: smoothX,
          y: smoothY,
          background: 'radial-gradient(circle, rgba(192, 133, 82, 0.08) 0%, rgba(191, 201, 209, 0.03) 40%, rgba(0, 0, 0, 0) 80%)',
        }}
      />
      
      {/* Dynamic Halo - Responsive to dark/light */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] mix-blend-soft-light"
        style={{
          x: smoothX,
          y: smoothY,
          left: '100px',
          top: '100px',
          backgroundColor: 'rgba(192, 133, 82, 0.05)', // Bronze/Accent
        }}
      />
    </div>
  );
};

export default Spotlight;
