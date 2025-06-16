
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/processes': 'Processos',
  '/pessoas': 'Gestão de Pessoas',
  '/documents': 'Documentos',
  '/files': 'Arquivos',
  '/settings': 'Configurações',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Process Hub';
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
