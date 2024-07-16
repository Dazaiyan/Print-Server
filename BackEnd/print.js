const { exec } = require('child_process');
const printers = require('./config/printers'); // Asegúrate de que la ruta sea correcta

// Definir el archivo PDF
const filePath = '/home/practica/Descargas/PRUeba.pdf';

// Obtener el módulo desde los argumentos de la línea de comandos
const selectedModule = process.argv[2];
if (!selectedModule) {
    console.error('No module specified');
    process.exit(1); // Salir del script si no se especifica un módulo
}

// Obtener la configuración de la impresora basada en el módulo
const printerConfig = printers[selectedModule];

if (!printerConfig) {
    console.error('Invalid module');
    process.exit(1); // Salir del script si el módulo es inválido
}

const printerName = printerConfig.name;

// Crear el comando para imprimir usando lp
const printCommand = `lp -d ${printerName} ${filePath}`;

// Ejecutar el comando de impresión
exec(printCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error printing file: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }

    console.log(`Printed successfully on ${printerName}`);
    console.log(stdout);
});
