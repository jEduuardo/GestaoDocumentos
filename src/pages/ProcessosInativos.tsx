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

const ProcessCard = ({ process }: { process: any }) => {
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
              {[process.area, process.departamento, process.setor]
                .filter(Boolean)
                .join(" - ")}
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

const ProcessosInativos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [processes, setProcesses] = useState<any[]>([]);

  const [filtroArea, setFiltroArea] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroSetor, setFiltroSetor] = useState("");

  useEffect(() => {
    // Dados fictícios
    const mockData = [
      {
        id: 1,
        nome: "Processo Financeiro",
        status: "Inativo",
        area: "Financeiro",
        departamento: "Contas",
        setor: "Cobrança",
        atualizado_em: "2025-06-15T12:00:00Z",
      },
      {
        id: 2,
        nome: "Processo de RH",
        status: "Inativo",
        area: "Recursos Humanos",
        departamento: "Pessoal",
        setor: "Recrutamento",
        atualizado_em: "2025-07-01T09:30:00Z",
      },
      {
        id: 3,
        nome: "Processo de Compras",
        status: "Inativo",
        area: "Suprimentos",
        departamento: "Compras",
        setor: "Contratos",
        atualizado_em: "2025-06-28T10:00:00Z",
      },
      {
        id: 4,
        nome: "Processo de Logística",
        status: "Inativo",
        area: "Logística",
        departamento: "Transporte",
        setor: "Expedição",
        atualizado_em: "2025-06-20T14:45:00Z",
      },
    ];
    setProcesses(mockData);
  }, []);

  const areaOptions = useMemo(() => {
    return Array.from(new Set(processes.map((p) => p.area).filter(Boolean)));
  }, [processes]);

  const departamentoOptions = useMemo(() => {
    const filteredByArea = filtroArea
      ? processes.filter((p) => p.area === filtroArea)
      : processes;
    return Array.from(new Set(filteredByArea.map((p) => p.departamento).filter(Boolean)));
  }, [processes, filtroArea]);

  const setorOptions = useMemo(() => {
    const filteredByDepartamento = filtroDepartamento
      ? processes.filter((p) => p.departamento === filtroDepartamento)
      : processes;
    return Array.from(new Set(filteredByDepartamento.map((p) => p.setor).filter(Boolean)));
  }, [processes, filtroDepartamento]);

  const filteredProcesses = processes
    .filter((process) => process.status === "Inativo")
    .filter((process) => {
      const buscaMatch =
        process.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (process.area && process.area.toLowerCase().includes(searchTerm.toLowerCase()));

      const areaMatch = filtroArea ? process.area === filtroArea : true;
      const departamentoMatch = filtroDepartamento ? process.departamento === filtroDepartamento : true;
      const setorMatch = filtroSetor ? process.setor === filtroSetor : true;

      return buscaMatch && areaMatch && departamentoMatch && setorMatch;
    });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
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
          </div>

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
              <Button
                onClick={() => navigate("/processes")}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                Processos Ativos
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProcesses.map((process) => (
              <ProcessCard key={process.id} process={process} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b bg-muted/50">
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium">Nome / Área</span>
                  <span></span>
                  <span className="font-medium text-right">
                    Última modificação / Status
                  </span>
                </div>
              </div>
              <div className="divide-y">
                {filteredProcesses.map((process) => (
                  <div
                    key={process.id}
                    onClick={() => navigate(`/processos/${process.id}`)}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="grid grid-cols-3 items-center">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessosInativos;
