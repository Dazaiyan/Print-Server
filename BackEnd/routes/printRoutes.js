const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middleware/authenticateToken');
const { printDocument } = require('../controllers/printController');
const router = express.Router();

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define el directorio de destino
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define el nombre del archivo
  },
});

const upload = multer({ storage });

router.post('/print', authenticateToken, upload.single('file'), printDocument);

module.exports = router;
