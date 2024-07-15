const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const pool = require('../db');
const { PDFDocument } = require('pdf-lib');

const uploadDir = path.join(__dirname, '../uploads');

const printDocument = async (req, res) => {
    try {
        const { module, pages, copies = 1, orientation, color, paperSize, page_from, page_to } = req.body;
        const file = req.file;
        const userCedula = req.cedula;  // Obtener el valor de user_cedula desde el request

        console.log('Request body:', req.body);
        console.log('Uploaded file:', file);

        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = path.join(uploadDir, file.filename);
        const fileName = file.originalname;

        const printers = {
            module1: 'MP-601',
        };

        const printerName = printers[module];

        if (!printerName) {
            console.error('Invalid module');
            return res.status(400).json({ message: 'Invalid module' });
        }

        // Configurar las opciones de impresión
        let printOptions = `-d ${printerName} -o media=${paperSize} -o sides=one-sided -n ${copies}`;

        if (orientation === 'landscape') {
            printOptions += ' -o orientation-requested=4'; // Landscape
        } else {
            printOptions += ' -o orientation-requested=3'; // Portrait
        }

        if (color === 'bw') {
            printOptions += ' -o ColorModel=Gray';
        }

        // Contar el número de páginas del archivo PDF
        let pageCount;
        if (pages === 'all') {
            const pdfBytes = fs.readFileSync(filePath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            pageCount = pdfDoc.getPageCount();
        } else if (pages === 'range') {
            printOptions += ` -o page-ranges=${page_from}-${page_to}`;
            pageCount = page_to - page_from + 1;
        } else {
            pageCount = parseInt(pages, 10);
        }

        const printCommand = `lp ${printOptions} ${filePath}`;

        exec(printCommand, async (error, stdout, stderr) => {
            if (error) {
                console.error('Printing error:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
            console.log('Printed successfully', stdout);

            try {
                const result = await pool.query(
                    'INSERT INTO prints (file_name, pages, copies, printer, user_cedula) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [fileName, pageCount, copies, printerName, userCedula]  // Incluir user_cedula en la inserción
                );
                console.log('Print details saved to database:', result.rows[0]);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Failed to delete file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

                return res.json({
                    message: 'Printed successfully and details saved to database',
                    output: stdout,
                    printDetails: result.rows[0],
                });
            } catch (dbError) {
                console.error('Database error:', dbError);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Failed to delete file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

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
