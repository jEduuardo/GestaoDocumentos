import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProcessesPage from "./pages/ProcessesPage";
import EditarProcesso from "./pages/EditarProcesso";
import ProcessosInativos from "./pages/ProcessosInativos";
import VisualizarDocumento from "./pages/VisualizarDocumento";
import DocumentosTipo from "./pages/DocumentosTipo";
import SettingsPage from "./pages/SettingsPage";
import Pessoas from "./pages/Pessoas";
import CadastroColaborador from "./pages/CadastroColaborador";
import CadastroProcesso from "./pages/CadastroProcesso";
import ProcessoDetalhe from "@/pages/ProcessoDetalhe";

// Dentro do <Routes>


import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/pessoas" element={<MainLayout><Pessoas /></MainLayout>} />
          <Route path="/cadastro-colaborador" element={<MainLayout><CadastroColaborador/></MainLayout>} />
          <Route path="/processes" element={<MainLayout><ProcessesPage /></MainLayout>} />
          <Route path="/processos/:id" element={<MainLayout><ProcessoDetalhe /></MainLayout>} />
          <Route path="/inativos/processos" element={<MainLayout><ProcessosInativos/></MainLayout>} />
          <Route path="/processos/editar/:id" element={<MainLayout><EditarProcesso /></MainLayout>} />

          <Route path="/visualizar/:caminho" element={<MainLayout><VisualizarDocumento /></MainLayout>} />
          <Route path="/documentos/:id/:tipo" element={<MainLayout><DocumentosTipo /></MainLayout>} />
          <Route path="/processos/novo" element={<MainLayout><CadastroProcesso /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
