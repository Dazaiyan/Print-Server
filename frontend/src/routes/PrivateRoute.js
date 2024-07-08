import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Asegúrate de que el token incluya el rol del usuario

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/print" />;
    }

    return children;
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
