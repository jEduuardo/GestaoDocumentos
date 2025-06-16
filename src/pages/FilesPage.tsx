
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileUp, FolderOpen, File } from 'lucide-react';

const folders = [
  { id: 1, name: 'Processos', items: 8, lastModified: '10/04/2023' },
  { id: 2, name: 'Documentos', items: 15, lastModified: '15/03/2023' },
  { id: 3, name: 'Templates', items: 5, lastModified: '22/02/2023' },
  { id: 4, name: 'Arquivos Compartilhados', items: 12, lastModified: '05/01/2023' },
];

const files = [
  { id: 1, name: 'Manual de Processos.pdf', size: '2.5 MB', lastModified: '12/04/2023', type: 'pdf' },
  { id: 2, name: 'Fluxograma Aprovação.png', size: '1.2 MB', lastModified: '08/04/2023', type: 'image' },
  { id: 3, name: 'Template BPMN.xml', size: '540 KB', lastModified: '23/03/2023', type: 'xml' },
  { id: 4, name: 'Documentação API.docx', size: '1.8 MB', lastModified: '15/03/2023', type: 'document' },
  { id: 5, name: 'Planilha Indicadores.xlsx', size: '950 KB', lastModified: '02/03/2023', type: 'spreadsheet' },
];

const FilesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar arquivos e pastas..." 
            className="pl-9 w-full md:w-80" 
          />
        </div>
        <div className="flex gap-2">
          <Button>
            <FileUp className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline">Nova Pasta</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pastas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <div 
                  key={folder.id} 
                  className="border rounded-md p-4 hover:border-process-blue transition-colors cursor-pointer"
                >
                  <div className="flex items-center mb-2">
                    <FolderOpen className="h-6 w-6 text-process-blue mr-2" />
                    <h3 className="font-medium truncate">{folder.name}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{folder.items} itens</p>
                    <p>Modificado: {folder.lastModified}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Arquivos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 font-medium">Nome</th>
                    <th className="pb-3 font-medium">Tamanho</th>
                    <th className="pb-3 font-medium">Data de modificação</th>
                    <th className="pb-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-process-slate mr-2" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{file.size}</td>
                      <td className="py-3 text-muted-foreground">{file.lastModified}</td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm">Baixar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilesPage;
