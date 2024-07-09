import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import PrintPage from './pages/PrintPage';
import AdminPage from './components/AdminPage'; // Importar la página de admin
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/print" 
            element={
              <PrivateRoute>
                <PrintPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? (userRole === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/login" />) : <Navigate to="/print" />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
