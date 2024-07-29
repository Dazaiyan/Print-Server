const { exec } = require('child_process');

// Configuración de impresoras
const printers = {
    'MP-601': 'MP-601',
    'Lexmark-MX610': 'Lexmark-MX610'
};

// Verifica argumentos
if (process.argv.length !== 4) {
    console.log('Uso: node print_job.js <nombre_impresora> <archivo>');
    process.exit(1);
}

// Obtiene argumentos
const printerName = process.argv[2];
const fileToPrint = process.argv[3];

// Verifica si la impresora está configurada
if (!printers[printerName]) {
    console.log(`Error: La impresora ${printerName} no está configurada.`);
    process.exit(1);
}

// Envía el trabajo de impresión a la impresora correcta
const command = `lp -d ${printers[printerName]} ${fileToPrint}`;
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});
