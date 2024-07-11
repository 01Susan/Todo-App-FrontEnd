import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React, { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/signin" />
}