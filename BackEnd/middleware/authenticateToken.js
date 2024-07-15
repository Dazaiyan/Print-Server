const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId;
        req.role = user.role;
        req.cedula = user.cedula;  // Asegúrate de que el valor de cedula está añadido
        next();
    });
};

module.exports = authenticateToken;