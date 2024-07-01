const express = require('express');
const { addPrintRequest } = require('../controllers/printController');
const router = express.Router();

router.post('/', addPrintRequest);

module.exports = router;
