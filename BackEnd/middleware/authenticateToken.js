const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Verificar la cookie de token

    if (!token) return res.sendStatus(401); // Si no hay token, retornar 401

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token no es válido, retornar 403
        req.userId = user.userId;
        req.cedula = user.cedula;
        next();
    });
};

module.exports = authenticateToken;
