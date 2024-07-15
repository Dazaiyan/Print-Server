const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db');
require('dotenv').config();

const login = async (req, res) => {
    const { cedula, password, role } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE cedula = $1', [cedula]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = userResult.rows[0];

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Genera el token JWT
        const token = jwt.sign({ userId: user.id, cedula: user.cedula, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });

        // Enviar el token en una cookie segura
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        res.json({ role: user.role });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
