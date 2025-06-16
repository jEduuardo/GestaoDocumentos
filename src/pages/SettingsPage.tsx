
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="backup">Backup e Restauração</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Gerencie as configurações básicas do sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informações da Organização</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" placeholder="Sua Empresa" defaultValue="Empresa ABC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input id="department" placeholder="Departamento" defaultValue="Projetos e Processos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email do Administrador</Label>
                    <Input id="admin-email" type="email" placeholder="admin@exemplo.com" defaultValue="admin@empresa.com" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferências do Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <p className="text-sm text-muted-foreground">Selecione o fuso horário padrão para datas e horários</p>
                    </div>
                    <div className="w-[180px]">
                      <select 
                        id="timezone" 
                        className="w-full h-10 px-3 border rounded-md"
                        defaultValue="America/Sao_Paulo"
                      >
                        <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                        <option value="America/New_York">New York (GMT-4)</option>
                        <option value="UTC">UTC</option>
                        <option value="Europe/London">Londres (GMT+1)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="language">Idioma</Label>
                      <p className="text-sm text-muted-foreground">Idioma padrão da interface</p>
                    </div>
                    <div className="w-[180px]">
                      <select 
                        id="language" 
                        className="w-full h-10 px-3 border rounded-md"
                        defaultValue="pt-BR"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">Inglês (EUA)</option>
                        <option value="es">Espanhol</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie como e quando deseja receber notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Revisão</Label>
                    <p className="text-sm text-muted-foreground">Notificações quando um processo precisar de revisão</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Atualizações de Documentos</Label>
                    <p className="text-sm text-muted-foreground">Notificações quando documentos forem atualizados</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Resumo Semanal</Label>
                    <p className="text-sm text-muted-foreground">Receba um resumo semanal das atividades</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button className="mt-6">Salvar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>Adicione ou remova usuários do sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-3 font-medium">Nome</th>
                        <th className="pb-3 font-medium">Email</th>
                        <th className="pb-3 font-medium">Função</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Maria Silva</td>
                        <td className="py-3">maria@empresa.com</td>
                        <td className="py-3">Administrador</td>
                        <td className="py-3">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">João Santos</td>
                        <td className="py-3">joao@empresa.com</td>
                        <td className="py-3">Editor</td>
                        <td className="py-3">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Ana Martins</td>
                        <td className="py-3">ana@empresa.com</td>
                        <td className="py-3">Visualizador</td>
                        <td className="py-3">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Pendente
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Button>Adicionar Usuário</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup e Restauração</CardTitle>
              <CardDescription>Gerencie seus dados e configurações de backup.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Backup Manual</h3>
                  <p className="text-muted-foreground mb-4">
                    Crie um backup completo dos seus dados agora. O arquivo será disponibilizado para download.
                  </p>
                  <Button>Criar Backup</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Backup Automático</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-backup">Backup Automático</Label>
                        <p className="text-sm text-muted-foreground">Crie backups automáticos periodicamente</p>
                      </div>
                      <Switch id="auto-backup" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="backup-frequency">Frequência</Label>
                        <p className="text-sm text-muted-foreground">Com que frequência os backups são criados</p>
                      </div>
                      <div className="w-[180px]">
                        <select 
                          id="backup-frequency" 
                          className="w-full h-10 px-3 border rounded-md"
                          defaultValue="weekly"
                        >
                          <option value="daily">Diariamente</option>
                          <option value="weekly">Semanalmente</option>
                          <option value="monthly">Mensalmente</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Restauração</h3>
                  <p className="text-muted-foreground mb-4">
                    Selecione um arquivo de backup para restaurar seus dados.
                    <strong> Aviso: Isso substituirá todos os dados atuais.</strong>
                  </p>
                  <div className="flex gap-2">
                    <Input type="file" />
                    <Button variant="outline">Restaurar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
