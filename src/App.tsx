import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProcessesPage from "./pages/ProcessesPage";
import ProcessDetail from "./pages/ProcessDetail";
import DocumentsPage from "./pages/DocumentsPage";
import FilesPage from "./pages/FilesPage";
import SettingsPage from "./pages/SettingsPage";
import Pessoas from "./pages/Pessoas";
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
          <Route path="/processes" element={<MainLayout><ProcessesPage /></MainLayout>} />
          <Route path="/processes/:id" element={<MainLayout><ProcessDetail /></MainLayout>} />
          <Route path="/documents" element={<MainLayout><DocumentsPage /></MainLayout>} />
          <Route path="/files" element={<MainLayout><FilesPage /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
