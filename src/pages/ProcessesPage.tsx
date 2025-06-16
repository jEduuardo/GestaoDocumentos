
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, List, LayoutDashboard, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample process data
const processesData = [
  {
    id: 1,
    name: 'Onboarding de Clientes',
    category: 'Vendas',
    owner: 'Maria Silva',
    lastModified: '2 dias atrás',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Aprovação de Despesas',
    category: 'Financeiro',
    owner: 'João Santos',
    lastModified: '5 dias atrás',
    status: 'Em revisão',
  },
  {
    id: 3,
    name: 'Contratação de Pessoal',
    category: 'RH',
    owner: 'Ana Martins',
    lastModified: '1 semana atrás',
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Gestão de Incidentes',
    category: 'Operações',
    owner: 'Carlos Pereira',
    lastModified: '2 semanas atrás',
    status: 'Inativo',
  },
  {
    id: 5,
    name: 'Desenvolvimento de Produto',
    category: 'Produto',
    owner: 'Paulo Oliveira',
    lastModified: '3 semanas atrás',
    status: 'Ativo',
  },
  {
    id: 6,
    name: 'Gestão de Mudanças',
    category: 'TI',
    owner: 'Fernanda Costa',
    lastModified: '1 mês atrás',
    status: 'Em revisão',
  },
];

const ProcessCard = ({ process }: { process: typeof processesData[0] }) => {
  return (
    <Card className="hover:border-process-blue transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{process.name}</h3>
            <p className="text-muted-foreground text-sm">{process.category}</p>
          </div>
          <Badge
            className={
              process.status === 'Ativo'
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : process.status === 'Em revisão'
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }
          >
            {process.status}
          </Badge>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Responsável: {process.owner}</span>
            <span>{process.lastModified}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProcessListItem = ({ process }: { process: typeof processesData[0] }) => {
  return (
    <div className="border-b py-4 last:border-0">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{process.name}</h3>
          <p className="text-muted-foreground text-sm">{process.category}</p>
        </div>
        <Badge
          className={
            process.status === 'Ativo'
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : process.status === 'Em revisão'
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }
        >
          {process.status}
        </Badge>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Responsável: {process.owner}</span>
          <span>{process.lastModified}</span>
        </div>
      </div>
    </div>
  );
};

const ProcessesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProcesses = processesData.filter(process => 
    process.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    process.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar processos..." 
            className="pl-9 w-full md:w-80" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button>Novo Processo</Button>
          <Button variant="outline">Importar</Button>
        </div>
      </div>
      
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              Lista
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProcesses.map(process => (
              <ProcessCard key={process.id} process={process} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b bg-muted/50">
                <div className="grid grid-cols-3">
                  <span className="font-medium">Nome / Categoria</span>
                  <span className="font-medium">Responsável</span>
                  <span className="font-medium text-right">Status</span>
                </div>
              </div>
              <div className="divide-y">
                {filteredProcesses.map(process => (
                  <div key={process.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="grid grid-cols-3">
                      <div>
                        <h3 className="font-medium">{process.name}</h3>
                        <p className="text-muted-foreground text-sm">{process.category}</p>
                      </div>
                      <div className="flex items-center">
                        <span>{process.owner}</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <Badge
                          className={
                            process.status === 'Ativo'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : process.status === 'Em revisão'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }
                        >
                          {process.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessesPage;
