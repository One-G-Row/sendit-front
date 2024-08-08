import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    // Not authenticated
    return <Navigate to="/LoginUser" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User does not have the required role
    return <Navigate to="/MyOrders" />;
  }

  return element;
}

export default ProtectedRoute;