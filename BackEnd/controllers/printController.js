const { createPrintRequest } = require('../models/printModel');

const addPrintRequest = async (req, res) => {
    const { file, fileName, printer } = req.body;
    const printRequest = await createPrintRequest(file, fileName, printer);
    res.json(printRequest);
};

module.exports = { addPrintRequest };
