import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import Monitoring from './pages/Monitoring';
import Contents from './pages/Contents';
import Studies from './pages/Studies';
import RegisterStep1 from './pages/RegisterStep1';
import RegisterStep2 from './pages/RegisterStep2';
import Homepage from './pages/Homepage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota Pública (Sem Sidebar) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterStep1 />} />
        <Route path="/register-step2" element={<RegisterStep2 />} /> 

        {/* Rotas Protegidas (Com Sidebar)
           O ProtectedRoute envolve o Layout, que por sua vez envolve as páginas
        */}
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/home" element={<Homepage />} />
        </Route>
        
        {/* Rota 404 (Opcional, redireciona para dashboard se não achar) */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;