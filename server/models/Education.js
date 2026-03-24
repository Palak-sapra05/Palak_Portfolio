const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    score: { type: String },
    period: { type: String, required: true },
    location: { type: String },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Education', educationSchema);
