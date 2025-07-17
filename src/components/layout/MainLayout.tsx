import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/processes": "Processos",
  "/processos/novo": "Cadastrar Processo",
  "/inativos/processos": "Processos Inativos",
  "/pessoas": "Gestão de Pessoas",
  "/cadastro-colaborador": "Cadastrar Colaborador",
  "/documents": "Documentos",
  "/files": "Arquivos",
  "/settings": "Configurações",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;

  const getTitle = (pathname: string): string => {
    if (pathname.startsWith("/visualizar/process")) {
      return "Documentos do Processo";
    }

    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }

    const processosIdRegex = /^\/processos\/[^\/]+$/;
    if (processosIdRegex.test(pathname)) {
      return "Detalhes do Processo";
    }

    const documentosRegex = /^\/documentos\/[^\/]+\/[^\/]+$/;
    if (documentosRegex.test(pathname)) {
      return "Lista de Documentos";
    }

    return "Projetos e Processos";
  };

  const title = getTitle(path);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
