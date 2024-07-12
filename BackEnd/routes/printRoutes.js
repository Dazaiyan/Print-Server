const express = require('express');
const multer = require('multer');
const { printDocument } = require('../controllers/printController');
const authenticateToken = require('../middleware/authenticateToken'); // Importa el middleware

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Ruta protegida con autenticación JWT
router.post('/print', authenticateToken, upload.single('file'), printDocument);

module.exports = router;

