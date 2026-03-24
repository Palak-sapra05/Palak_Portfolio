const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // lucide icon name
    type: { type: String, enum: ['Achievement', 'Patent', 'Star'], default: 'Achievement' },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Achievement', achievementSchema);
