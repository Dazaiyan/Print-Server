// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Eliminar la importación innecesaria de axios
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import PrintPage from './pages/PrintPage';
import AdminPage from './components/AdminPage';
import PrivateRoute from './routes/PrivateRoute'; // Asegúrate de que el archivo existe y está correctamente exportado
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/print" 
            element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <PrintPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
