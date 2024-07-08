const express = require('express');
const multer = require('multer');
const { printDocument } = require('../controllers/printController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/print', authenticate, upload.single('file'), printDocument);

module.exports = router;

