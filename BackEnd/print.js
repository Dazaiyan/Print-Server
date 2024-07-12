const printer = require('pdf-to-printer');

const filePath = 'C:\\home\\practica\\Descargas\\prueba.pdf';
const printerName = 'MP-601'; // Reemplaza con el nombre correcto de tu impresora

const options = {
    printer: printerName
};

printer.print(filePath, options)
    .then(console.log)
    .catch(console.error);