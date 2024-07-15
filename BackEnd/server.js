require('dotenv').config(); // Esto debe estar al inicio
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const printRoutes = require('./routes/printRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5001', // Cambia esto según sea necesario
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/print', authenticateToken, printRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
