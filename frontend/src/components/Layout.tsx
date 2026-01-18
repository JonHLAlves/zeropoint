import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Conteúdo Principal 
         ml-64: Adiciona margem à esquerda igual à largura da Sidebar (16rem/256px) 
         para o conteúdo não ficar escondido atrás dela.
      */}
      <main className="flex-1 ml-64 w-full">
        {/* O <Outlet /> renderiza automaticamente o componente da rota atual (Dashboard, Tools, etc) */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;