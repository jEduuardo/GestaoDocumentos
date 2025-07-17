import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileSymlink,
  FileType,
  FileUser,
  FileCog,
  FilePen,
  FileText,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const tipoMap: Record<
  string,
  { nome: string; IconComponent: React.ElementType }
> = {
  fluxograma: { nome: "Fluxograma", IconComponent: FileSymlink },
  pop: { nome: "Procedimento Operacional Padrão", IconComponent: FileType },
  mu: { nome: "Manual de Usuário", IconComponent: FileUser },
  it: { nome: "Instrução de Trabalho", IconComponent: FileCog },
  formulario: { nome: "Formulário", IconComponent: FilePen },
  politica: { nome: "Política", IconComponent: FileText },
};

type Documento = {
  documento_id: number;
  arquivo_caminho: string;
  criado_em: string;
  modificado_em: string;
};

type DocumentosPorTipo = {
  [tipo: string]: Documento[];
};

const VisualizarDocumento = () => {
  const { caminho } = useParams();
  const navigate = useNavigate();

  // Remove decodeURIComponent pois vamos usar caminho fixo abaixo
  // const decodedPath = decodeURIComponent(caminho || "");
  const fixedPath = "../database/process/active/teste.pdf"; // caminho fixo para o pdf

  // Para exemplo, vamos fixar processoId e tipoAtual também
  const processoId = "1";
  const [tipoAtual, setTipoAtual] = useState("pop");
  const [nomeProcesso, setNomeProcesso] = useState("Processo de Compras");

  // Dados fictícios para os documentos
  const documentosPorTipoFake: DocumentosPorTipo = {
    pop: [
      {
        documento_id: 101,
        arquivo_caminho: fixedPath,
        criado_em: "2025-07-01",
        modificado_em: "2025-07-01",
      },
    ],
    fluxograma: [
      {
        documento_id: 102,
        arquivo_caminho: fixedPath,
        criado_em: "2025-06-20",
        modificado_em: "2025-06-20",
      },
    ],
    it: [
      {
        documento_id: 103,
        arquivo_caminho: fixedPath,
        criado_em: "2025-07-05",
        modificado_em: "2025-07-05",
      },
    ],
  };

  const [documentosPorTipo, setDocumentosPorTipo] = useState<DocumentosPorTipo>(
    documentosPorTipoFake
  );
  const [documentoAtual, setDocumentoAtual] = useState<string>(fixedPath);

  const [zoom, setZoom] = useState(1);

  const isImagem = (arquivo: string) =>
    /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(arquivo);
  const isPDF = (arquivo: string) => /\.pdf$/i.test(arquivo);

  const infoTipo = tipoMap[tipoAtual] || {
    nome: "Documento",
    IconComponent: FileSymlink,
  };

  const aumentarZoom = () => setZoom((z) => Math.min(z + 0.1, 5));
  const diminuirZoom = () => setZoom((z) => Math.max(z - 0.1, 0.2));

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2 text-black truncate max-w-[70%]">
          <infoTipo.IconComponent size={24} color="#2563eb" />
          <span>
            {infoTipo.nome}
            {nomeProcesso ? ` - ${nomeProcesso}` : ""}
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={diminuirZoom}>
            <ZoomOut size={16} />
          </Button>
          <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="sm" onClick={aumentarZoom}>
            <ZoomIn size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate(`/processos/${processoId}`)}>
            Voltar
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 gap-4 h-[calc(100vh-96px)]">
        <div className="flex-1 border rounded-md bg-white overflow-auto relative flex justify-center items-start p-2" style={{ height: "100%" }}>
  <div
    style={{
      transform: `scale(${zoom})`,
      transformOrigin: "top left",
      width: "100%",
      height: "100%",
      overflow: "auto",
    }}
  >
    {isImagem(documentoAtual) ? (
      <img
        src={documentoAtual}
        alt="Documento"
        className="max-w-full h-auto"
      />
    ) : (
      <iframe
        src={documentoAtual}
        title="Visualização do Documento"
        className="w-full h-full"
        style={{ border: "none" }}
      />
    )}
  </div>
</div>


        {/* Lista lateral */}
        <aside className="w-80 bg-gray-50 border rounded-md p-4 overflow-auto flex flex-col">
          <h2 className="font-semibold mb-2">Outros Documentos</h2>
          <ul className="flex flex-col gap-2 overflow-auto">
            {Object.keys(documentosPorTipo).length === 0 && (
              <li className="text-gray-500">Nenhum documento encontrado.</li>
            )}
            {Object.entries(documentosPorTipo).map(([tipo, docs]) => {
              const isActive = tipo === tipoAtual;
              const IconComponent = tipoMap[tipo]?.IconComponent || FileSymlink;

              return (
                <li key={tipo}>
                  <button
                    onClick={() => {
                      if (docs.length > 1) {
                        navigate(`/documentos/${processoId}/${tipo}`);
                      } else if (docs.length === 1) {
                        setDocumentoAtual(docs[0].arquivo_caminho);
                        setTipoAtual(tipo);
                      }
                    }}
                    className={`w-full flex items-center gap-2 text-left p-2 rounded truncate ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-blue-100"
                    }`}
                    title={tipoMap[tipo]?.nome || "Documento"}
                  >
                    <IconComponent
                      size={24}
                      color={isActive ? "#fff" : "#2563eb"}
                    />
                    <span className="truncate">{tipoMap[tipo]?.nome || "Documento"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default VisualizarDocumento;
