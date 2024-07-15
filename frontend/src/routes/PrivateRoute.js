import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/checkAuth', { withCredentials: true });
                setIsAuthenticated(true);
                setUserRole(response.data.role);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
