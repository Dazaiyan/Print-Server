const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/login', login);

router.get('/checkAuth', authenticateToken, (req, res) => {
    res.json({ role: req.role });
});

module.exports = router;
