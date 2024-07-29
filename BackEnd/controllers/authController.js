const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Si estás usando bcrypt para hashing de contraseñas
const pool = require('../db');

exports.login = async (req, res) => {
    const { cedula, clave } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE cedula = $1', [cedula]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = bcrypt.compareSync(clave, user.rows[0].password); // Si usas bcrypt
        // const validPassword = user.rows[0].password === md5(clave); // Si usas md5

        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user.rows[0].id, cedula: user.rows[0].cedula }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true });
        res.json({ authenticated: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
