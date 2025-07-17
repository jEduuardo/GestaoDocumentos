import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileSymlink,
  FileType,
  FileUser,
  FileCog,
  FilePen,
  FileText,
} from "lucide-react";

const tipoMap: Record<string, { nome: string; Icon: React.ElementType }> = {
  fluxograma: { nome: "Fluxograma", Icon: FileSymlink },
  pop: { nome: "Procedimento Operacional Padrão", Icon: FileType },
  mu: { nome: "Manual de Usuário", Icon: FileUser },
  it: { nome: "Instrução de Trabalho", Icon: FileCog },
  formulario: { nome: "Formulário", Icon: FilePen },
  politica: { nome: "Política", Icon: FileText },
};

const formatarTempoDecorrido = (dataString: string) => {
  const data = new Date(dataString);
  const agora = new Date();
  const diff = agora.getTime() - data.getTime();
  const segundos = Math.floor(diff / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(meses / 12);

  if (anos > 0) return `há ${anos} ano${anos > 1 ? "s" : ""}`;
  if (meses > 0) return `há ${meses} mês${meses > 1 ? "es" : ""}`;
  if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
  if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
  if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  return `há poucos segundos`;
};

const DocumentosTipo = () => {
  const { id, tipo } = useParams();
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [documentosPorTipo, setDocumentosPorTipo] = useState<
    Record<string, any[]>
  >({});
  const tipoKey = (tipo || "").toLowerCase();
  const { nome, Icon } = tipoMap[tipoKey] || { nome: tipo, Icon: FileText };

  useEffect(() => {
    if (!id || !tipoKey) return;

    // Busca documentos do tipo atual
    fetch(`http://localhost:3000/processos/${id}/documentos/${tipoKey}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar documentos");
        return res.json();
      })
      .then((data) => setDocumentos(data))
      .catch((err) => {
        console.error(err);
        setDocumentos([]);
      });

    // Busca todos os documentos do processo
    fetch(`http://localhost:3000/processos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDocumentosPorTipo(data.documentos || {});
      })
      .catch((err) => {
        console.error("Erro ao buscar outros documentos:", err);
        setDocumentosPorTipo({});
      });
  }, [id, tipoKey]);

  const handleAbrir = (doc: any) => {
    navigate(`/visualizar/${encodeURIComponent(doc.arquivo_caminho)}`);
  };

  return (
    <div className="p-4 space-y-4 h-screen">
      {/* Título separado */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Icon className="text-blue-600 w-6 h-6" />
        Documentos - {nome}
      </h1>

      {/* Bloco dos resultados e da sidebar */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Lista de documentos */}
        <div className="flex-1">
          {documentos.length === 0 ? (
            <p className="text-muted-foreground">
              Nenhum documento encontrado.
            </p>
          ) : (
            <ul className="space-y-2">
              {documentos.map((doc) => (
                <li
                  key={doc.id}
                  className="border rounded p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
                  onClick={() => handleAbrir(doc)}
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {doc.nome || doc.arquivo_caminho?.split("/").pop()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Última modificação:{" "}
                      {doc.atualizado_em
                        ? formatarTempoDecorrido(doc.atualizado_em)
                        : "—"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => navigate(`/processos/${id}`)}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Voltar ao processo
          </button>
        </div>

        {/* Sidebar de outros documentos alinhada com os resultados */}
        <aside className="w-full lg:w-80 bg-gray-50 border rounded-md p-4 self-start">
          <h2 className="font-semibold mb-2">Outros Documentos</h2>
          <ul className="flex flex-col gap-2">
            {Object.keys(documentosPorTipo).length === 0 && (
              <li className="text-gray-500">Nenhum documento encontrado.</li>
            )}
            {Object.entries(documentosPorTipo).map(([tipoOutros, docs]) => {
              const isActive = tipoOutros === tipoKey;
              const TipoIcon = tipoMap[tipoOutros]?.Icon || FileSymlink;

              return (
                <li key={tipoOutros}>
                  <button
                    onClick={() => {
                      if (docs.length > 1) {
                        navigate(`/documentos/${id}/${tipoOutros}`);
                      } else if (docs.length === 1) {
                        navigate(
                          `/visualizar/${encodeURIComponent(
                            docs[0].arquivo_caminho
                          )}`
                        );
                      }
                    }}
                    className={`w-full flex items-center gap-2 text-left p-2 rounded truncate ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-blue-100"
                    }`}
                    title={tipoMap[tipoOutros]?.nome || tipoOutros}
                  >
                    <TipoIcon size={24} color={isActive ? "#fff" : "#2563eb"} />
                    <span className="truncate">
                      {tipoMap[tipoOutros]?.nome || tipoOutros}
                    </span>
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

export default DocumentosTipo;
