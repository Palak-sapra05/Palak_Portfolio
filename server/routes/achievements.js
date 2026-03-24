const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// GET /api/achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ order: 1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
