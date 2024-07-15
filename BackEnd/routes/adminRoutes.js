const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const pool = require('../db');
const router = express.Router();

router.get('/logs', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM prints ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching print records:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
