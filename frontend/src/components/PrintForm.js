import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PrintForm.css';

const PrintForm = () => {
  const [file, setFile] = useState(null);
  const [module, setModule] = useState('module1');
  const [pages, setPages] = useState('all');
  const [pageFrom, setPageFrom] = useState('');
  const [pageTo, setPageTo] = useState('');
  const [orientation, setOrientation] = useState('portrait');
  const [color, setColor] = useState('color');
  const [paperSize, setPaperSize] = useState('iso_a4_210x297mm');
  const [copies, setCopies] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!file) {
      alert('Por favor, seleccione un archivo para imprimir');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('module', module);
    formData.append('pages', pages);
    if (pages === 'range') {
      formData.append('page_from', pageFrom);
      formData.append('page_to', pageTo);
    }
    formData.append('orientation', orientation);
    formData.append('color', color);
    formData.append('paperSize', paperSize);
    formData.append('copies', copies);

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/print/print', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Documento enviado a imprimir correctamente');
      navigate('/'); // Redirige a la página deseada después de la impresión
    } catch (error) {
      console.error('Error al enviar a imprimir', error);
      alert('Error al enviar a imprimir');
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file').click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setShowPreview(true);
    } else {
      setFile(null);
      setShowPreview(false);
    }
  };

  const togglePageRange = () => {
    const pageRange = document.getElementById('page-range');
    if (pages === 'range') {
      pageRange.style.display = 'flex';
    } else {
      pageRange.style.display = 'none';
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-box">
          <form onSubmit={handleSubmit} id="uploadForm">
            <div className="form-group">
              <label htmlFor="file">Seleccione el archivo:</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <input type="text" id="file-name" readOnly placeholder="No se ha seleccionado archivo" />
              <button type="button" className="btn" onClick={triggerFileInput}>
                Seleccionar Archivo
              </button>
            </div>
            <div className="form-group-separator"></div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="module">Nombre del módulo:</label>
                <select id="module" name="module" value={module} onChange={(e) => setModule(e.target.value)}>
                  <option value="module1">Módulo 1</option>
                  <option value="module2">Módulo 2</option>
                  {/* Añade más opciones según sea necesario */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="pages">Páginas:</label>
                <select id="pages" name="pages" value={pages} onChange={(e) => { setPages(e.target.value); togglePageRange(); }}>
                  <option value="all">Todas</option>
                  <option value="current">Actual</option>
                  <option value="range">Personalizado</option>
                </select>
              </div>
            </div>
            <div className="form-row" id="page-range" style={{ display: 'none' }}>
              <div className="form-group">
                <label htmlFor="page_from">Desde:</label>
                <input type="number" id="page_from" name="page_from" min="1" value={pageFrom} onChange={(e) => setPageFrom(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="page_to">Hasta:</label>
                <input type="number" id="page_to" name="page_to" min="1" value={pageTo} onChange={(e) => setPageTo(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="orientation">Diseño:</label>
                <select id="orientation" name="orientation" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                  <option value="portrait">Vertical</option>
                  <option value="landscape">Horizontal</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="color">Color:</label>
                <select id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)}>
                  <option value="color">Color</option>
                  <option value="bw">Blanco y Negro</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="paperSize">Tamaño de papel:</label>
                <select id="paperSize" name="paperSize" value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
                  <option value="iso_a4_210x297mm">A4</option>
                  <option value="iso_a3_297x420mm">A3</option>
                  {/* Añade más opciones de tamaño de papel si es necesario */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="copies">Número de copias:</label>
                <input type="number" id="copies" name="copies" min="1" value={copies} onChange={(e) => setCopies(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Enviando...' : 'Imprimir'}
            </button>
          </form>
        </div>
        <div id="pdf-preview-container" className="pdf-preview-container" style={{ display: showPreview && file ? 'block' : 'none' }}>
          <iframe id="pdf-preview" className="pdf-preview" src={file ? URL.createObjectURL(file) + '#toolbar=0' : ''}></iframe>
        </div>
      </div>
    </div>
  );
};

export default PrintForm;
