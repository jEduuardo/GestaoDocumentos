
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Edit } from 'lucide-react';
import BPMNViewer from '@/components/process/BPMNViewer';

// Sample process data
const processData = {
  id: 1,
  name: 'Onboarding de Clientes',
  description: 'Processo de cadastro e integração de novos clientes ao sistema.',
  category: 'Vendas',
  owner: 'Maria Silva',
  createdAt: '15/01/2023',
  lastModified: '10/04/2023',
  status: 'Ativo',
  version: '1.2',
  documents: [
    { id: 1, name: 'Procedimento Operacional Padrão - Onboarding', type: 'POP', version: '1.2' },
    { id: 2, name: 'Formulário de Cadastro', type: 'Formulário', version: '2.0' },
    { id: 3, name: 'Checklist de Integração', type: 'Checklist', version: '1.1' },
  ],
  revisions: [
    { id: 1, date: '10/04/2023', user: 'Maria Silva', action: 'Atualização do diagrama BPMN' },
    { id: 2, date: '22/02/2023', user: 'João Santos', action: 'Revisão do procedimento' },
    { id: 3, date: '15/01/2023', user: 'Maria Silva', action: 'Criação do processo' },
  ],
};

const ProcessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const processId = parseInt(id || '1');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/processes">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{processData.name}</h1>
          <Badge
            className={
              processData.status === 'Ativo'
                ? 'bg-green-100 text-green-800'
                : processData.status === 'Em revisão'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }
          >
            {processData.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Detalhes do Processo</h2>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Categoria:</span>
                  <span className="col-span-2">{processData.category}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Responsável:</span>
                  <span className="col-span-2">{processData.owner}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Versão:</span>
                  <span className="col-span-2">{processData.version}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Data de criação:</span>
                  <span className="col-span-2">{processData.createdAt}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Última modificação:</span>
                  <span className="col-span-2">{processData.lastModified}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Descrição</h2>
              <p>{processData.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="diagram">
        <TabsList className="mb-6">
          <TabsTrigger value="diagram">Diagrama BPMN</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="diagram">
          <BPMNViewer processId={processId} />
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Relacionados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">Tipo: {doc.type} | Versão: {doc.version}</p>
                    </div>
                    <Button variant="outline" size="sm">Visualizar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Revisões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processData.revisions.map((revision) => (
                  <div key={revision.id} className="flex items-start border-b pb-4 last:border-0">
                    <div className="min-w-32 pr-4">
                      <div className="font-medium">{revision.date}</div>
                      <div className="text-sm text-muted-foreground">{revision.user}</div>
                    </div>
                    <div>{revision.action}</div>
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

export default ProcessDetail;
