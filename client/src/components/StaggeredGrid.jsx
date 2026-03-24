// import React from 'react';
// import { motion } from 'framer-motion';

// const StaggeredGrid = ({ items = [] }) => {
//   // Parent container variants with stagger effect
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2, // Stagger delay between children
//         delayChildren: 0.1,    // Delay before first child starts
//       },
//     },
//   };

//   // Child item variants with fade and slide up
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: 'easeOut',
//       },
//     },
//   };

//   // Sample data if no items are provided
//   const displayItems = items.length > 0 ? items : [
//     { id: 1, title: 'Project One', description: 'Interactive dashboard with real-time analytics.' },
//     { id: 2, title: 'Project Two', description: 'E-commerce platform with seamless payment integration.' },
//     { id: 3, title: 'Project Three', description: 'Social media app with AI-driven content recommendations.' },
//     { id: 4, title: 'Skill: React', description: 'Advanced proficiency in building modern SPAs.' },
//     { id: 5, title: 'Skill: Framer Motion', description: 'Expertise in high-performance web animations.' },
//     { id: 6, title: 'Skill: Tailwind CSS', description: 'Mastery of utility-first styling for rapid UI development.' },
//   ];

//   return (
//     <div className="section-padding bg-bg-main relative">
//       <div className="max-w-7xl mx-auto px-4">
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }} // Animation triggers once when in view
//         >
//           {displayItems.map((item) => (
//             <motion.div
//               key={item.id}
//               variants={itemVariants}
//               whileHover={{ 
//                 scale: 1.05, 
//                 boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
//                 transition: { duration: 0.2 }
//               }}
//               className="glass-card p-10 flex flex-col items-center text-center cursor-pointer transition-colors hover:bg-white/5 active:scale-95"
//             >
//               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm">
//                  <span className="font-black text-2xl">{item.title[0]}</span>
//               </div>
//               <h3 className="text-2xl font-black mb-4 italic tracking-tight text-text-main">
//                 {item.title}
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
//                 {item.description}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StaggeredGrid;
