const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db');
require('dotenv').config();

const login = async (req, res) => {
    const { cedula, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE cedula = $1', [cedula]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = userResult.rows[0];

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Genera el token JWT con una expiración de 4 horas
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
