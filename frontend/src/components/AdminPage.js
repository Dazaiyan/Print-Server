import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './AdminPage.css';

const AdminPage = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/logs', { withCredentials: true });
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleRowClick = (log) => {
    setSelectedLog(log);
  };

  const closeModal = () => {
    setSelectedLog(null);
  };

  const dateBodyTemplate = (rowData) => {
    return new Date(rowData.created_at).toLocaleString();
  };

  return (
    <div className="admin-container">
      <h1>Admin Logs</h1>
      <DataTable value={logs} paginator rows={10} responsiveLayout="scroll" selectionMode="single" onSelectionChange={e => handleRowClick(e.value)}>
        <Column field="created_at" header="Fecha de Impresión" sortable filter body={dateBodyTemplate} />
        <Column field="file_name" header="Nombre del Archivo" sortable filter />
        <Column field="pages" header="Número de Páginas" sortable filter />
        <Column field="copies" header="Número de Copias" sortable filter />
        <Column field="user_cedula" header="Cédula" sortable filter />
      </DataTable>

      {selectedLog && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Detalles de Impresión</h2>
            <p><strong>Fecha de Impresión:</strong> {new Date(selectedLog.created_at).toLocaleString()}</p>
            <p><strong>Nombre del Archivo:</strong> {selectedLog.file_name}</p>
            <p><strong>Número de Páginas:</strong> {selectedLog.pages}</p>
            <p><strong>Número de Copias:</strong> {selectedLog.copies}</p>
            <p><strong>Cédula:</strong> {selectedLog.user_cedula}</p>
            <p><strong>Impresora:</strong> {selectedLog.printer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
