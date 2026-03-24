const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: { type: String, required: true }, // lucide icon name
    skills: [{ type: String }],
    category: { type: String, enum: ['Languages', 'Databases', 'Data Science / ML', 'Tools & Platforms', 'Full Stack Development'], required: true }
});

module.exports = mongoose.model('Experience', experienceSchema);
