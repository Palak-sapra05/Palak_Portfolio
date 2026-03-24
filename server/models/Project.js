const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    links: {
        github: { type: String },
        live: { type: String }
    },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', projectSchema);
