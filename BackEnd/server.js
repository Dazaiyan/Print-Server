const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();

// Configuración de CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
