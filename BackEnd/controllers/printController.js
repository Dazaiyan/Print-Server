const fs = require('fs');
const path = require('path');
const printer = require('pdf-to-printer');

const uploadDir = path.join(__dirname, '../uploads');

const printDocument = async (req, res) => {
    const { module, pages } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(uploadDir, file.filename);

    const printers = {
        module1: 'IPP Printer', // Reemplaza con el nombre correcto de tu impresora
        // Añade más módulos aquí si es necesario
    };

    const printerName = printers[module];

    if (!printerName) {
        return res.status(400).json({ message: 'Invalid module' });
    }

    const options = {
        printer: printerName,
        pages: pages.toString()
    };

    try {
        await printer.print(filePath, options);
        return res.json({ message: 'Printed successfully' });
    } catch (error) {
        console.error('Printing error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    printDocument
};
