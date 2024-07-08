const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const uploadDir = path.join(__dirname, '../uploads');

const printDocument = async (req, res) => {
    try {
        const { module, pages } = req.body;
        const file = req.file;

        console.log('Request body:', req.body);
        console.log('Uploaded file:', file);

        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = path.join(uploadDir, file.filename);

        const printers = {
            module1: 'TICS_RICOH_LANIER_601', // Asegúrate de que el nombre coincida con el nombre de la impresora en CUPS
            // Añade más módulos aquí si es necesario
        };

        const printerName = printers[module];

        if (!printerName) {
            console.error('Invalid module');
            return res.status(400).json({ message: 'Invalid module' });
        }

        console.log('Printing with options:', { printer: printerName, pages: pages });

        // Comando para imprimir usando lp
        const printCommand = `lp -d ${printerName} ${filePath}`;

        exec(printCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('Printing error:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
            console.log('Printed successfully', stdout);
            return res.json({ message: 'Printed successfully', output: stdout });
        });
    } catch (error) {
        console.error('Printing error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    printDocument
};

