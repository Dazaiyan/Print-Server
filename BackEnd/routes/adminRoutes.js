const express = require('express');
const { authenticateToken } = require('../middleware/authenticateToken');
const pool = require('../db');
const router = express.Router();

router.get('/admin', authenticateToken, async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const result = await pool.query('SELECT * FROM prints');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching print records:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
