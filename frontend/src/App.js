import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import PrintPage from './pages/PrintPage';
import AdminPage from './components/AdminPage';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/checkAuth', { withCredentials: true });
        setUserRole(response.data.role);
      } catch (error) {
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
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
            element={
              userRole ? (userRole === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/print" />) : <Navigate to="/login" />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
