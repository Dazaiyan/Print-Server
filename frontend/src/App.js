import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import PrintPage from './pages/PrintPage';
import AdminPrintPage from './components/AdminPrintPage';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  
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
            path="/admin/print" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPrintPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Navigate to="/print" /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
