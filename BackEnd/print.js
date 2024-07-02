const printer = require('pdf-to-printer');

const filePath = 'C:\\Users\\ANGIE MENENDEZ\\Downloads\\reporte.pdf'; // Ruta del archivo
const printerName = 'IPP Printer'; // Reemplaza con el nombre correcto de tu impresora

const options = {
    printer: printerName
};

printer.print(filePath, options)
    .then(console.log)
    .catch(console.error);

