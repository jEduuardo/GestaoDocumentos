
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, File, FileText, FilePlus } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample document data
const documentsData = [
  {
    id: 1,
    name: 'Procedimento Operacional Padrão - Onboarding',
    type: 'POP',
    process: 'Onboarding de Clientes',
    lastModified: '10/04/2023',
    version: '1.2',
  },
  {
    id: 2,
    name: 'Fluxograma - Aprovação de Despesas',
    type: 'Fluxograma',
    process: 'Aprovação de Despesas',
    lastModified: '15/03/2023',
    version: '2.0',
  },
  {
    id: 3,
    name: 'Formulário - Solicitação de Contratação',
    type: 'Formulário',
    process: 'Contratação de Pessoal',
    lastModified: '22/02/2023',
    version: '1.1',
  },
  {
    id: 4,
    name: 'Manual - Gestão de Incidentes',
    type: 'Manual',
    process: 'Gestão de Incidentes',
    lastModified: '05/01/2023',
    version: '3.0',
  },
  {
    id: 5,
    name: 'Checklist - Desenvolvimento de Produto',
    type: 'Checklist',
    process: 'Desenvolvimento de Produto',
    lastModified: '18/12/2022',
    version: '1.0',
  },
  {
    id: 6,
    name: 'Política - Gestão de Mudanças',
    type: 'Política',
    process: 'Gestão de Mudanças',
    lastModified: '30/11/2022',
    version: '2.1',
  },
  {
    id: 7,
    name: 'Procedimento - Atendimento ao Cliente',
    type: 'Procedimento',
    process: 'Atendimento ao Cliente',
    lastModified: '24/10/2022',
    version: '1.3',
  },
  {
    id: 8,
    name: 'Instrução de Trabalho - Manutenção Preventiva',
    type: 'Instrução de Trabalho',
    process: 'Manutenção de Equipamentos',
    lastModified: '14/09/2022',
    version: '2.2',
  },
];

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'POP':
    case 'Manual':
    case 'Política':
    case 'Procedimento':
      return <FileText className="h-10 w-10 text-blue-500" />;
    case 'Fluxograma':
      return <File className="h-10 w-10 text-green-500" />;
    case 'Formulário':
    case 'Checklist':
      return <FilePlus className="h-10 w-10 text-orange-500" />;
    default:
      return <File className="h-10 w-10 text-gray-500" />;
  }
};

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocuments = documentsData.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.process.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const documentTypes = ['Todos', 'POP', 'Fluxograma', 'Formulário', 'Manual', 'Checklist', 'Política', 'Procedimento'];
  const [selectedType, setSelectedType] = useState('Todos');

  const displayedDocuments = selectedType === 'Todos' 
    ? filteredDocuments 
    : filteredDocuments.filter(doc => doc.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar documentos..." 
            className="pl-9 w-full md:w-80" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Documento
          </Button>
          <Button variant="outline">Importar</Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Tipos de Documento</h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-1">
                  {documentTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4">
                {displayedDocuments.map(doc => (
                  <div 
                    key={doc.id} 
                    className="flex items-start p-3 border rounded-md hover:border-process-blue transition-colors cursor-pointer"
                  >
                    <div className="mr-4 mt-1">
                      {getDocumentIcon(doc.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.name}</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-muted-foreground">
                        <span>Tipo: {doc.type}</span>
                        <span>Processo: {doc.process}</span>
                        <span>Versão: {doc.version}</span>
                        <span>Modificado: {doc.lastModified}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ⋯
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Visualizar</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Baixar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
                
                {displayedDocuments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum documento encontrado.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
