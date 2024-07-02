// server.js
require('dotenv').config(); // Esto debe estar al inicio
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5001' // Cambia esto según sea necesario
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
