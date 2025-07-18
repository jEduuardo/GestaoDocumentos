import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, List, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Process = {
  id: number;
  nome: string;
  status: string;
  atualizado_em: string | null;
  area: string | null;
  departamento: string | null;
  setor: string | null;
};

const ProcessCard = ({ process }: { process: Process }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/processos/${process.id}`)}
      className="hover:border-process-blue transition-colors cursor-pointer h-full"
    >
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{process.nome}</h3>
            <p className="text-muted-foreground text-sm">
              {[process.area, process.departamento, process.setor].filter(Boolean).join(" - ")}
            </p>
          </div>
          <Badge
            className={
              process.status === "Ativo"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : process.status === "Em Revisão"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }
          >
            {process.status}
          </Badge>
        </div>
        <div className="mt-auto pt-4 text-xs text-muted-foreground text-right">
          <span>
            Última modificação:{" "}
            {process.atualizado_em
              ? formatDistanceToNow(new Date(process.atualizado_em), {
                  locale: ptBR,
                  addSuffix: true,
                })
              : "---"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const ProcessesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [processes, setProcesses] = useState<Process[]>([]);

  const [filtroArea, setFiltroArea] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroSetor, setFiltroSetor] = useState("");

  useEffect(() => {
    // Dados fictícios
    const fakeData: Process[] = [
      {
        id: 1,
        nome: "Processo de Compras",
        status: "Ativo",
        atualizado_em: "2025-07-15",
        area: "Financeiro",
        departamento: "Contas a Pagar",
        setor: "Fornecedor",
      },
      {
        id: 2,
        nome: "Gestão de Pessoas",
        status: "Ativo",
        atualizado_em: "2025-07-10",
        area: "RH",
        departamento: "Departamento Pessoal",
        setor: "Admissões",
      },
      {
        id: 3,
        nome: "Controle de Estoque",
        status: "Ativo",
        atualizado_em: "2025-07-13",
        area: "Logística",
        departamento: "Armazenagem",
        setor: "Almoxarifado",
      },
      {
        id: 4,
        nome: "Processo de Vendas",
        status: "Ativo",
        atualizado_em: "2025-07-12",
        area: "Comercial",
        departamento: "Vendas",
        setor: "Interno",
      },
      {
        id: 5,
        nome: "Atendimento ao Cliente",
        status: "Ativo",
        atualizado_em: "2025-07-01",
        area: "Suporte",
        departamento: "SAC",
        setor: "Chat Online",
      },
    ];

    setProcesses(fakeData);
  }, []);

  const areaOptions = useMemo(() => {
    return Array.from(new Set(processes.map((p) => p.area).filter(Boolean)));
  }, [processes]);

  const departamentoOptions = useMemo(() => {
    const filtered = filtroArea
      ? processes.filter((p) => p.area === filtroArea)
      : processes;
    return Array.from(new Set(filtered.map((p) => p.departamento).filter(Boolean)));
  }, [processes, filtroArea]);

  const setorOptions = useMemo(() => {
    const filtered = filtroDepartamento
      ? processes.filter((p) => p.departamento === filtroDepartamento)
      : processes;
    return Array.from(new Set(filtered.map((p) => p.setor).filter(Boolean)));
  }, [processes, filtroDepartamento]);

  const filteredProcesses = processes
    .filter((proc) => proc.status === "Ativo")
    .filter((proc) => {
      const buscaMatch =
        proc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (proc.area && proc.area.toLowerCase().includes(searchTerm.toLowerCase()));

      const areaMatch = filtroArea ? proc.area === filtroArea : true;
      const departamentoMatch = filtroDepartamento ? proc.departamento === filtroDepartamento : true;
      const setorMatch = filtroSetor ? proc.setor === filtroSetor : true;

      return buscaMatch && areaMatch && departamentoMatch && setorMatch;
    });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
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

          <div className="flex gap-4 flex-wrap max-w-4xl flex-grow">
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={filtroArea}
              onChange={(e) => {
                setFiltroArea(e.target.value);
                setFiltroDepartamento("");
                setFiltroSetor("");
              }}
            >
              <option value="">Todas as Áreas</option>
              {areaOptions.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={filtroDepartamento}
              onChange={(e) => {
                setFiltroDepartamento(e.target.value);
                setFiltroSetor("");
              }}
              disabled={!filtroArea}
            >
              <option value="">Todos os Departamentos</option>
              {departamentoOptions.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={filtroSetor}
              onChange={(e) => setFiltroSetor(e.target.value)}
              disabled={!filtroDepartamento}
            >
              <option value="">Todos os Setores</option>
              {setorOptions.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 ml-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar processos..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/processos/novo")}>+ Novo Processo</Button>
              <Button
                onClick={() => navigate("/inativos/processos")}
                className="bg-gray-700 hover:bg-gray-800 text-white"
              >
                Processos Inativos
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="grid">
          {filteredProcesses.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Não há processos cadastrados.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProcesses.map((process) => (
                <ProcessCard key={process.id} process={process} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b bg-muted/50">
                <div className="grid grid-cols-[3fr_1fr_1fr] items-center">
                  <span className="font-medium">Nome / Área</span>
                  <span></span>
                  <span className="font-medium text-right">Última modificação / Status</span>
                </div>
              </div>
              {filteredProcesses.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Não há processos cadastrados.
                </p>
              ) : (
                <div className="divide-y">
                  {filteredProcesses.map((process) => (
                    <div
                      key={process.id}
                      onClick={() => navigate(`/processos/${process.id}`)}
                      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="grid grid-cols-[3fr_1fr_1fr] items-center">
                        <div>
                          <h3 className="font-medium">{process.nome}</h3>
                          <p className="text-muted-foreground text-sm">
                            {[process.area, process.departamento, process.setor]
                              .filter(Boolean)
                              .join(" - ")}
                          </p>
                        </div>
                        <div></div>
                        <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground">
                          <span>
                            {process.atualizado_em
                              ? formatDistanceToNow(new Date(process.atualizado_em), {
                                  locale: ptBR,
                                  addSuffix: true,
                                })
                              : "---"}
                          </span>
                          <Badge
                            className={
                              process.status === "Ativo"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : process.status === "Em Revisão"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }
                          >
                            {process.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessesPage;
