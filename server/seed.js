const mongoose = require('mongoose');
require('dotenv').config();

const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Project = require('./models/Project');
const Achievement = require('./models/Achievement');

const experiences = [
    { title: "Languages", icon: "Terminal", skills: ["C++", "Java", "JavaScript", "Python"], category: "Languages" },
    { title: "Databases", icon: "Database", skills: ["MySQL", "MongoDB"], category: "Databases" },
    { title: "Full Stack Development", icon: "Code", skills: ["React", "Node.js", "Express", "MongoDB", "RESTful APIs"], category: "Full Stack Development" },
    { title: "Tools & Platforms", icon: "Wrench", skills: ["Git", "GitHub", "VS Code", "Node.js", "Postman"], category: "Tools & Platforms" }
];

const education = [
    {
        degree: "B.Tech – Computer Science & Engineering",
        institution: "Lovely Professional University",
        score: "CGPA: 7.87",
        period: "Aug 2023 – Present",
        location: "Phagwara, Punjab",
        order: 1
    },
    {
        degree: "Intermediate (Class XII)",
        institution: "Cambridge International School",
        score: "Score: 90%",
        period: "Apr 2022 – Mar 2023",
        location: "India",
        order: 2
    },
    {
        degree: "Matriculation (Class X)",
        institution: "Cambridge International School",
        score: "Score: 78%",
        period: "Apr 2020 – Mar 2021",
        location: "India",
        order: 3
    }
];

const achievements = [
    {
        title: '150+ LeetCode Questions',
        description: 'Successfully solved over 150 complex Data Structures and Algorithms problems on LeetCode, optimizing for time and space complexity.',
        icon: 'Star',
        type: 'Star',
        order: 1
    },
    {
        title: '5-Star LeetCode Rating',
        description: 'Achieved and maintained a 5-star rating on LeetCode, demonstrating consistent high-performance in algorithmic problem solving.',
        icon: 'Trophy',
        type: 'Achievement',
        order: 2
    },
    {
        title: 'Patent Holder (Inventor)',
        description: 'Filed a patent for an AI-powered Threat Detection System, leveraging machine learning for real-time security monitoring.',
        icon: 'Award',
        type: 'Patent',
        order: 3
    }
];

const projects = [
    {
        title: 'EcoDrive',
        description: 'A web-based project developed using HTML, CSS, and PHP focused on promoting eco-friendly transportation solutions.',
        tags: ['HTML', 'CSS', 'PHP'],
        order: 1
    },
    {
        title: 'AI Powered Threat Detection System',
        description: 'An innovative security system designed to detect potential threats using AI-based analysis. (Patent filed)',
        tags: ['Python', 'AI/ML', 'IoT'],
        order: 2
    },
    {
        title: 'Virtual Art Gallery',
        description: 'A fully immersive MERN stack application allowing users to browse, upload, and interact with digital art in a curated virtual space.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        order: 3
    },
    {
        title: 'AI Health Advisor Chatbot',
        description: 'An intelligent AI-powered chatbot designed to provide preliminary health guidance, analyze symptoms, and offer wellness tips using NLP.',
        tags: ['Python', 'NLP', 'React', 'FastAPI'],
        order: 4
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/palak_portfolio');
        
        await Experience.deleteMany({});
        await Education.deleteMany({});
        await Project.deleteMany({});
        await Achievement.deleteMany({});

        await Experience.insertMany(experiences);
        await Education.insertMany(education);
        await Achievement.insertMany(achievements);
        await Project.insertMany(projects);

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
