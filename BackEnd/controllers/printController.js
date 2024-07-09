const fs = require('fs');
const path = require('path');
const printer = require('pdf-to-printer');
const pool = require('../db');

const uploadDir = path.join(__dirname, '../uploads');

const printDocument = async (req, res) => {
    const { module, pages, orientation, color, paperSize, copies } = req.body;
    const file = req.file;
    const cedula = req.cedula; // Asegúrate de que esto esté configurado correctamente

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
        pages: pages === 'range' ? `${req.body.page_from}-${req.body.page_to}` : pages,
        orientation: orientation,
        monochrome: color === 'bw',
        paperSize: paperSize,
        copies: copies
    };

    try {
        await printer.print(filePath, options);
        
        // Guardar en la base de datos
        const result = await pool.query(
            'INSERT INTO prints (file_name, pages, copies, created_at, printer, user_cedula) VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *',
            [file.originalname, pages, copies, printerName, cedula]
        );

        return res.json({ message: 'Printed successfully', printRecord: result.rows[0] });
    } catch (error) {
        console.error('Printing error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    printDocument
};
