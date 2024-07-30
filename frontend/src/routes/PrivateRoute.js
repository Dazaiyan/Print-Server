import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const PrivateRoute = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, loading: true });

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            setAuth({ isAuthenticated: authenticated, loading: false });
        };

        checkAuth();
    }, []);

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
