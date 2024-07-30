require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const md5 = require('md5');
const authRoutes = require('./routes/authRoutes');
const printRoutes = require('./routes/printRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5001', // Cambia esto según sea necesario
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/print', authenticateToken, printRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

// Endpoint de estado del servidor
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Proxy para manejar el hash de la clave
app.use('/proxy', (req, res, next) => {
    if (req.body.clave) {
        req.body.clave = md5(req.body.clave);
    }
    next();
}, createProxyMiddleware({
    target: process.env.REACT_APP_BACKEND_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // Elimina /proxy de la URL
    },
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
