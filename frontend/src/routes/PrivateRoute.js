import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loading, setLoading] = useState(false);

    return children;
};

export default PrivateRoute;
