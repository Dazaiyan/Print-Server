import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './AdminPage.css';

const AdminPage = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    file_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pages: { value: null, matchMode: FilterMatchMode.EQUALS },
    copies: { value: null, matchMode: FilterMatchMode.EQUALS },
    user_cedula: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const dt = useRef(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/logs', { withCredentials: true });
        const logsData = response.data.map(log => ({
          ...log,
          created_at: new Date(log.created_at)
        }));
        setLogs(logsData);
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
    return new Date(rowData.created_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' });
  };

  const clearFilters = () => {
    dt.current.reset();
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      file_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      pages: { value: null, matchMode: FilterMatchMode.EQUALS },
      copies: { value: null, matchMode: FilterMatchMode.EQUALS },
      user_cedula: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        dateFormat="dd/mm/yy"
        placeholder="Filtrar por fecha"
      />
    );
  };

  return (
    <div className="admin-container">
      <h1>Admin Logs</h1>
      <Button label="Limpiar Filtros" icon="pi pi-filter-slash" onClick={clearFilters} className="p-mb-3" />
      <DataTable
        ref={dt}
        value={logs}
        paginator
        rows={10}
        responsiveLayout="scroll"
        selectionMode="single"
        onSelectionChange={e => handleRowClick(e.value)}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={['file_name', 'pages', 'copies', 'user_cedula']}
        emptyMessage="No se encontraron registros."
      >
        <Column
          field="created_at"
          header="Fecha de Impresión"
          sortable
          filter
          filterField="created_at"
          filterPlaceholder="Buscar por fecha"
          body={dateBodyTemplate}
          filterElement={dateFilterTemplate}
          filterMatchMode={FilterMatchMode.DATE_IS}
        />
        <Column
          field="file_name"
          header="Nombre del Archivo"
          sortable
          filter
          filterPlaceholder="Buscar por nombre"
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          field="pages"
          header="Número de Páginas"
          sortable
          filter
          filterPlaceholder="Buscar por páginas"
          filterMatchMode={FilterMatchMode.EQUALS}
        />
        <Column
          field="copies"
          header="Número de Copias"
          sortable
          filter
          filterPlaceholder="Buscar por copias"
          filterMatchMode={FilterMatchMode.EQUALS}
        />
        <Column
          field="user_cedula"
          header="Cédula"
          sortable
          filter
          filterPlaceholder="Buscar por cédula"
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
      </DataTable>

      {selectedLog && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Detalles de Impresión</h2>
            <p><strong>Fecha de Impresión:</strong> {new Date(selectedLog.created_at).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })}</p>
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
