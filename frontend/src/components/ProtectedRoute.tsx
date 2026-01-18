import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = localStorage.getItem('access_token');

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;