// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const printRoutes = require('./routes/printRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Configurar CORS
app.use(cors());

// Configurar body-parser
app.use(bodyParser.json());

// Definir las rutas
app.use('/api/prints', printRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;

