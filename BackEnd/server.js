require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const printRoutes = require('./routes/printRoutes');
const adminRoutes = require('./routes/adminRoutes');
const axios = require('axios'); // Agregar Axios

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
app.use('/api/print', printRoutes); // Eliminar authenticateToken
app.use('/api/admin', adminRoutes);

// Endpoint de estado del servidor
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Endpoint proxy para la API externa
app.post('/proxy/getLoginAvalab', async (req, res) => {
    try {
        const response = await axios.post('http://172.20.33.219:5010/getLoginAvalab', req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Nuevo endpoint proxy para checkAuth (comentado)
app.get('/proxy/checkAuth', (req, res) => {
    res.json({ authenticated: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
