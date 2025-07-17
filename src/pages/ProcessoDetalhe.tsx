import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  FileSymlink,
  FileType,
  FileUser,
  FileCog,
  FilePen,
  FileText,
} from "lucide-react";

const getDocumentIcon = (type: string) => {
  const iconClass = "h-12 w-12 text-blue-600";
  switch (type.toLowerCase()) {
    case "fluxograma":
      return <FileSymlink className={iconClass} />;
    case "pop":
      return <FileType className={iconClass} />;
    case "mu":
    case "manual":
      return <FileUser className={iconClass} />;
    case "it":
    case "instrução de trabalho":
      return <FileCog className={iconClass} />;
    case "formulario":
    case "formulário":
      return <FilePen className={iconClass} />;
    case "politica":
    case "política":
      return <FileText className={iconClass} />;
    default:
      return <FileType className={iconClass} />;
  }
};

const nomesCompletosTipos: Record<string, string> = {
  pop: "Procedimento Operacional Padrão (POP)",
  fluxograma: "Fluxograma",
  mu: "Manual (MU)",
  manual: "Manual (MU)",
  it: "Instrução de Trabalho (IT)",
  "instrução de trabalho": "Instrução de Trabalho (IT)",
  formulario: "Formulário",
  formulário: "Formulário",
  politica: "Política",
  política: "Política",
};

const ordemTipos = [
  "fluxograma",
  "pop",
  "mu",
  "it",
  "politica",
  "formulario",
  "formulário",
];

const ProcessoDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [processo, setProcesso] = useState<any>(null);
  const [documentos, setDocumentos] = useState<any>({});
  const [lista, setLista] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("");
  const [filtroDocs, setFiltroDocs] = useState("");

  useEffect(() => {
    const processosFake = [
      {
        id: "1",
        nome: "Processo de Compras",
        status: "Ativo",
        area: "Financeiro",
        departamento: "Contas a Pagar",
        setor: "Fornecedor",
        descricao: "Processo relacionado à aquisição de bens e serviços.",
        atualizado_em: "2025-07-15",
      },
      {
        id: "2",
        nome: "Gestão de Pessoas",
        status: "Ativo",
        area: "RH",
        departamento: "Departamento Pessoal",
        setor: "Admissões",
        descricao: "Gerencia processos de contratação e integração.",
        atualizado_em: "2025-07-10",
      },
      {
        id: "3",
        nome: "Controle de Estoque",
        status: "Ativo",
        area: "Logística",
        departamento: "Armazenagem",
        setor: "Almoxarifado",
        descricao: "Gerencia entradas e saídas de materiais.",
        atualizado_em: "2025-07-13",
      },
      {
        id: "4",
        nome: "Processo de Vendas",
        status: "Ativo",
        area: "Comercial",
        departamento: "Vendas",
        setor: "Interno",
        descricao: "Acompanha todo o fluxo de vendas internas.",
        atualizado_em: "2025-07-12",
      },
      {
        id: "5",
        nome: "Atendimento ao Cliente",
        status: "Ativo",
        area: "Suporte",
        departamento: "SAC",
        setor: "Chat Online",
        descricao: "Oferece suporte em tempo real aos clientes.",
        atualizado_em: "2025-07-01",
      },
    ];

    const docsFake = {
      pop: [
        {
          nome: "POP Atendimento Inicial",
          modificado_em: "2025-07-01",
          arquivo_caminho: "../database/process/active/teste.pdf",
        },
      ],
      fluxograma: [
        {
          nome: "Fluxo de Compras",
          modificado_em: "2025-06-20",
          arquivo_caminho: "../database/process/active/teste.pdf",
        },
      ],
      it: [
        {
          nome: "IT Cadastro Fornecedor",
          modificado_em: "2025-07-05",
          arquivo_caminho: "../database/process/active/teste.pdf",
        },
      ],
    };

    setLista(processosFake);
    const processoSelecionado = processosFake.find((p) => p.id === id);
    setProcesso(processoSelecionado || false);
    setDocumentos(docsFake);
  }, [id]);

  const listaFiltrada = lista
    .filter((p) => processo && p.status === processo.status)
    .filter((p) => p.nome.toLowerCase().includes(filtro.toLowerCase()));

  const documentosAgrupados = Object.entries(documentos)
    .map(([tipo, arquivos]: any) => ({
      tipo,
      nome:
        nomesCompletosTipos[tipo.toLowerCase()] ||
        tipo.charAt(0).toUpperCase() + tipo.slice(1),
      arquivos,
      icone: getDocumentIcon(tipo),
    }))
    .filter((d) => d.nome.toLowerCase().includes(filtroDocs.toLowerCase()))
    .sort((a, b) => {
      const tipoA = a.tipo.toLowerCase();
      const tipoB = b.tipo.toLowerCase();
      const posA = ordemTipos.indexOf(tipoA);
      const posB = ordemTipos.indexOf(tipoB);
      return posA - posB;
    });

  const abrirDocumentos = (tipo: string, docs: any[]) => {
    if (docs.length === 1) {
      navigate(`/visualizar/${encodeURIComponent(docs[0].arquivo_caminho)}`);
    } else {
      navigate(`/documentos/${id}/${tipo}`);
    }
  };

  const campos = [
    { label: "Área", key: "area" },
    { label: "Departamento", key: "departamento" },
    { label: "Setor", key: "setor" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        {processo === null && <p>Carregando...</p>}
        {processo === false && <p>Processo não encontrado.</p>}
        {processo && (
          <>
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h2 className="text-2xl font-semibold">{processo.nome}</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/processes")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Voltar
                </Button>
              </div>
            </div>

            <Card>
              <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                <button
                  onClick={() => navigate(`/processos/editar/${id}`)}
                  title="Editar Processo"
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Editar Processo"
                >
                  <FilePen size={28} />
                </button>
                <span className="text-gray-400">|</span>
                <Badge
                  className={`${
                    processo.status === "Ativo"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {processo.status}
                </Badge>
              </div>

              <CardContent className="p-6 space-y-6">
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {campos.map(({ label, key }) => (
                    <div key={key} className="flex flex-col w-[200px]">
                      <span className="text-sm text-muted-foreground">
                        {label}
                      </span>
                      <div className="bg-gray-50 px-3 py-2 rounded border text-sm">
                        {processo[key] || "—"}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">
                    Descrição
                  </span>
                  <div className="bg-gray-50 px-3 py-2 rounded border text-sm">
                    {processo.descricao || "—"}
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">
                    Última Atualização
                  </span>
                  <div className="bg-gray-50 px-3 py-2 rounded border text-sm">
                    {processo.atualizado_em
                      ? format(
                          new Date(processo.atualizado_em),
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR }
                        )
                      : "—"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Documentos</h3>
                    <Input
                      placeholder="Buscar documentos..."
                      className="max-w-xs"
                      value={filtroDocs}
                      onChange={(e) => setFiltroDocs(e.target.value)}
                    />
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      {documentosAgrupados.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                          Nenhum documento encontrado.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {documentosAgrupados.map(
                            ({ tipo, nome, arquivos, icone }) => (
                              <div
                                key={tipo}
                                className="flex items-center p-3 border rounded-md hover:border-blue-500 cursor-pointer"
                                onClick={() => abrirDocumentos(tipo, arquivos)}
                              >
                                <div className="mr-4">{icone}</div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{nome}</h4>
                                  <div className="text-sm text-muted-foreground mt-1 flex justify-between flex-wrap">
                                    <span>
                                      Modificado:{" "}
                                      {format(
                                        new Date(
                                          arquivos[
                                            arquivos.length - 1
                                          ].modificado_em
                                        ),
                                        "dd/MM/yyyy"
                                      )}
                                    </span>
                                    {arquivos.length > 1 && (
                                      <span>
                                        Quantidade de Documentos:{" "}
                                        {arquivos.length}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="w-full lg:w-80 space-y-2 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">Processos</h3>
          <Input
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="h-8 w-32"
          />
        </div>
        <ul className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto">
          {listaFiltrada.map((p) => (
            <li key={p.id}>
              <Button
                variant={p.id === id ? "default" : "outline"}
                className="w-full justify-start text-left truncate"
                onClick={() => navigate(`/processos/${p.id}`)}
              >
                {p.nome}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessoDetalhe;
