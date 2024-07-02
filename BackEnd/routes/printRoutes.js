const express = require('express');
const multer = require('multer');
const { printDocument } = require('../controllers/printController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/print', upload.single('file'), printDocument);

module.exports = router;
