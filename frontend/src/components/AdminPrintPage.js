import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPrintPage = () => {
  const [printData, setPrintData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/admin/print', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrintData(response.data);
      } catch (error) {
        console.error('Error fetching print data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Print Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Archivo</th>
            <th>Páginas</th>
            <th>Copias</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {printData.map((print) => (
            <tr key={print.id}>
              <td>{print.id}</td>
              <td>{print.user}</td>
              <td>{print.file_name}</td>
              <td>{print.pages}</td>
              <td>{print.copies}</td>
              <td>{print.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPrintPage;
