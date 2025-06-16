
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', processos: 4, documentos: 8 },
  { name: 'Fev', processos: 3, documentos: 5 },
  { name: 'Mar', processos: 5, documentos: 12 },
  { name: 'Abr', processos: 7, documentos: 10 },
  { name: 'Mai', processos: 6, documentos: 15 },
  { name: 'Jun', processos: 9, documentos: 20 },
  { name: 'Jul', processos: 8, documentos: 18 },
  { name: 'Ago', processos: 7, documentos: 16 },
  { name: 'Set', processos: 6, documentos: 14 },
  { name: 'Out', processos: 5, documentos: 13 },
  { name: 'Nov', processos: 4, documentos: 11 },
  { name: 'Dez', processos: 6, documentos: 17 },
];


const recentProcesses = [
  { id: 1, name: 'Integração de Funcionário', updated: '2 dias atrás', status: 'Ativo' },
  { id: 2, name: 'Aprovação de Despesas', updated: '5 dias atrás', status: 'Em revisão' },
  { id: 3, name: 'Contratação de Pessoal', updated: '1 semana atrás', status: 'Ativo' },
  { id: 4, name: 'Gestão de Incidentes', updated: '2 semanas atrás', status: 'Inativo' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-process-slate">Processos Ativos</CardTitle>
            <CardDescription>Total de processos em execução</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-process-blue">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-process-slate">Documentos</CardTitle>
            <CardDescription>Total de documentos gerenciados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-process-blue">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-process-slate">Revisões Pendentes</CardTitle>
            <CardDescription>Processos aguardando revisão</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-process-blue">3</div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Atividade</CardTitle>
          <CardDescription>Processos e documentos nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="processos" stroke="#2563EB" strokeWidth={2} />
                <Line type="monotone" dataKey="documentos" stroke="#64748B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processos Recentes</CardTitle>
          <CardDescription>Últimos processos atualizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Nome</th>
                  <th className="text-left pb-4">Última atualização</th>
                  <th className="text-left pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProcesses.map((process) => (
                  <tr key={process.id} className="border-b last:border-0">
                    <td className="py-4">{process.name}</td>
                    <td className="py-4 text-muted-foreground">{process.updated}</td>
                    <td className="py-4">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          process.status === 'Ativo' 
                            ? 'bg-green-100 text-green-800' 
                            : process.status === 'Em revisão'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {process.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
