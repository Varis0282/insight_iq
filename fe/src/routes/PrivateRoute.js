import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [])
    return (
        <div>
            {children}
        </div>
    )
}

export default PrivateRoute