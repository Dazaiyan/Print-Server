import React, { useState } from 'react';
import { addPrintRequest } from '../services/printService';
import './PrintForm.css';

const PrintForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [printer, setPrinter] = useState('Modulo 1');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPrintRequest(file, fileName, printer);
      // Notificación de éxito
    } catch (error) {
      console.error('Error al enviar la solicitud de impresión', error);
    }
  };

  return (
    <div className="print-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Print Request</h2>
        <div className="form-group">
          <label>Archivo</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre del archivo</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Impresora</label>
          <select
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
            required
          >
            <option value="Modulo 1">Modulo 1</option>
            <option value="Modulo 2">Modulo 2</option>
            <option value="Modulo 3">Modulo 3</option>
            {/* Agrega más opciones para los módulos restantes */}
          </select>
        </div>
        <button type="submit">Enviar a imprimir</button>
      </form>
    </div>
  );
};

export default PrintForm;
