const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3001;  // Puedes cambiar el puerto si es necesario

// Configuración de impresoras
const printers = {
    'module1': 'MP-601',
    'module2': 'Lexmark-MX610'
};

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());

// Ruta para verificar el funcionamiento del servidor
app.get('/', (req, res) => {
    res.send('Servidor de impresión virtual está funcionando');
});

// Ruta para manejar trabajos de impresión con archivos adjuntos
app.post('/print', upload.single('file'), (req, res) => {
    const { moduleName } = req.body;
    const fileToPrint = req.file.path;

    console.log(`Solicitud recibida para imprimir en ${moduleName} el archivo ${fileToPrint}`);

    // Verifica si el módulo está configurado
    if (!moduleName || !printers[moduleName]) {
        console.log(`Error: El módulo ${moduleName} no está configurado.`);
        return res.status(400).send(`Error: El módulo ${moduleName} no está configurado.`);
    }

    // Obtiene la impresora física correspondiente al módulo
    const printerName = printers[moduleName];

    // Envía el trabajo de impresión a la impresora física seleccionada
    const command = `lp -d ${printerName} ${fileToPrint}`;
    exec(command, (error, stdout, stderr) => {
        // Elimina el archivo temporal después de la impresión
        fs.unlinkSync(fileToPrint);

        if (error) {
            console.log(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.log(`Stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        res.send(`Trabajo enviado a ${printerName}`);
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor de impresión virtual escuchando en http://localhost:${port}`);
});