import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setAuth(result);
        };
        checkAuth();
    }, [isAuthenticated]);

    if (auth === null) return <div>Loading...</div>;
    return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
