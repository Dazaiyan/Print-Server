const fs = require('fs');
const path = require('path');
const printer = require('pdf-to-printer');
const pool = require('../db');
const pdf = require('pdf-parse'); // Asegúrate de instalar pdf-parse con npm install pdf-parse

const uploadDir = path.join(__dirname, '../uploads');

const printDocument = async (req, res) => {
    const { module, orientation, color, paperSize, copies } = req.body;
    const file = req.file;
    const userCedula = req.cedula;

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
        orientation: orientation,
        monochrome: color === 'bw',
        paperSize: paperSize,
        copies: copies
    };

    try {
        // Leer el contenido del archivo PDF y contar el número de páginas
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const pages = data.numpages;

        await printer.print(filePath, options);

        // Guardar en la base de datos
        const result = await pool.query(
            'INSERT INTO prints (file_name, pages, copies, created_at, printer, user_cedula) VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *',
            [file.originalname, pages, copies, printerName, userCedula]
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
