const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByCedula } = require('../models/userModel');

const login = async (req, res) => {
    const { cedula, password } = req.body;
    const user = await findUserByCedula(cedula);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { login };

