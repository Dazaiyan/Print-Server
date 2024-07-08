const express = require('express');
const multer = require('multer');
const { printDocument } = require('../controllers/printController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/print', upload.single('file'), printDocument);

module.exports = router;
