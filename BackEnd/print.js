const printer = require('pdf-to-printer');

const filePath = 'C:\\home\\practica\\Descargas\\xd.pdf';
const printerName = 'IPP Printer'; // Reemplaza con el nombre correcto de tu impresora

const options = {
    printer: printerName
};

printer.print(filePath, options)
    .then(console.log)
    .catch(console.error);

