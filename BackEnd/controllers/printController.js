const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const pool = require('../db');

const uploadDir = path.join(__dirname, '../uploads');

const printDocument = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            console.error('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { module, pages, copies = 1, orientation, color, paperSize, page_from, page_to } = req.body;
        const file = req.file;

        console.log('Request body:', req.body);
        console.log('Uploaded file:', file);

        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = path.join(uploadDir, file.filename);
        const fileName = file.originalname;

        const printers = {
            module1: 'TICS_RICOH_LANIER_601',
        };

        const printerName = printers[module];

        if (!printerName) {
            console.error('Invalid module');
            return res.status(400).json({ message: 'Invalid module' });
        }

        let pageRange = '';
        if (pages === 'range' && page_from && page_to) {
            pageRange = ` -o page-ranges=${page_from}-${page_to}`;
        }

        console.log('Printing with options:', { printer: printerName, pages, copies, orientation, color, paperSize });

        // Ajusta el comando lp para incluir opciones de impresión necesarias
        const printCommand = `lp -d ${printerName} -o media=${paperSize} -o sides=one-sided -n ${copies} ${pageRange} ${filePath}`;

        exec(printCommand, async (error, stdout, stderr) => {
            if (error) {
                console.error('Printing error:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
            console.log('Printed successfully', stdout);

            // Insertar detalles de la impresión en la base de datos
            try {
                const result = await pool.query(
                    'INSERT INTO prints (file_name, pages, copies, printer, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [fileName, pages, copies, printerName, userId]
                );
                console.log('Print details saved to database:', result.rows[0]);
                return res.json({ message: 'Printed successfully and details saved to database', output: stdout, printDetails: result.rows[0] });
            } catch (dbError) {
                console.error('Database error:', dbError);
                return res.status(500).json({ message: 'Printed successfully, but failed to save details to database', error: dbError.message });
            }
        });
    } catch (error) {
        console.error('Printing error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    printDocument
};



