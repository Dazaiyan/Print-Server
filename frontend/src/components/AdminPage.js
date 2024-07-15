import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [printRecords, setPrintRecords] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrintRecords = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPrintRecords(res.data);
      } catch (error) {
        console.error('Error fetching print records:', error);
        setError('Error fetching print records.');
      }
    };

    fetchPrintRecords();
  }, []);

  const handleGoToPrintPage = () => {
    navigate('/print');
  };

  return (
    <div className="admin-container">
      <h1>Registro de Impresiones</h1>
      {error && <p className="error">{error}</p>}
      <button className="btn" onClick={handleGoToPrintPage}>Ir a la página de impresión</button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cédula</th>
            <th>Archivo</th>
            <th>Páginas</th>
            <th>Copias</th>
            <th>Impresora</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {printRecords.length > 0 ? (
            printRecords.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.user_cedula}</td>
                <td>{record.file_name}</td>
                <td>{record.pages}</td>
                <td>{record.copies}</td>
                <td>{record.printer}</td>
                <td>{new Date(record.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay registros de impresión disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;