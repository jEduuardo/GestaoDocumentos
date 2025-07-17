import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FileSymlink,
  FileType,
  FileUser,
  FileCog,
  FilePen,
  FileText,
  Trash2,
} from "lucide-react";

const tipos = ["fluxograma", "pop", "it", "mu", "politica", "formulario"];
const nomesPorTipo: Record<string, string> = {
  fluxograma: "Fluxograma",
  pop: "Procedimento Operacional Padrão (POP)",
  it: "Instrução de Trabalho (IT)",
  mu: "Manual de Usuário (MU)",
  politica: "Política",
  formulario: "Formulário",
};
const siglasPorTipo: Record<string, string> = {
  fluxograma: "FLU",
  pop: "POP",
  mu: "MU",
  it: "IT",
  formulario: "FOR",
  politica: "POL",
};

const frequencias: Record<string, string> = {
  "1min": "A cada 1 minuto",
  "3min": "A cada 3 minutos",
  "1 day": "Diariamente",
  "7 days": "Semanalmente",
  "30 days": "Mensalmente",
  "60 days": "Bimestralmente",
  "90 days": "Trimestralmente",
  "180 days": "Semestralmente",
  "1 year": "Anualmente",
};

function getDescricaoAutTime(autTime: string) {
  switch (autTime) {
    case "1 day":
      return "Diariamente";
    case "7 days":
      return "Semanalmente";
    case "30 days":
      return "Mensalmente";
    case "60 days":
      return "Bimestralmente";
    case "90 days":
      return "Trimestralmente";
    case "180 days":
      return "Semestralmente";
    case "1 year":
      return "Anualmente";
    default:
      return "Não definido";
  }
}

const getIconByTipo = (tipo: string) => {
  const commonClasses = "inline-block h-6 w-6 text-blue-600";
  switch (tipo) {
    case "fluxograma":
      return <FileSymlink className={commonClasses} />;
    case "pop":
      return <FileType className={commonClasses} />;
    case "mu":
      return <FileUser className={commonClasses} />;
    case "it":
      return <FileCog className={commonClasses} />;
    case "formulario":
      return <FilePen className={commonClasses} />;
    case "politica":
      return <FileText className={commonClasses} />;
    default:
      return null;
  }
};

const EditarProcesso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    areaId: "",
    departamentoId: "",
    setorId: "",
    status: "Ativo",
    autTime: "1 year", // Valor padrão compatível
  });

  const [areas, setAreas] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [setores, setSetores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<Record<string, File[]>>(
    tipos.reduce((acc, t) => ({ ...acc, [t]: [] }), {})
  );
  const [existingFiles, setExistingFiles] = useState<Record<string, any[]>>(
    tipos.reduce((acc, t) => ({ ...acc, [t]: [] }), {})
  );
  const [removedFileIds, setRemovedFileIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/processos/${id}`)
      .then((res) => res.json())
      .then(({ processo }) => {
        // Tratamento para garantir que autTime seja string válida
        let autTimeValue = "30 days"; // fallback padrão
        if (processo.aut_time) {
          if (typeof processo.aut_time === "string") {
            autTimeValue = processo.aut_time;
          } else if (typeof processo.aut_time === "object") {
            if ("years" in processo.aut_time && processo.aut_time.years === 1) {
              autTimeValue = "1 year";
            } else {
              // Outros casos podem ser tratados aqui se houver necessidade
              autTimeValue = "30 days";
            }
          }
        }

        setFormData({
          nome: processo.nome || "",
          descricao: processo.descricao || "",
          areaId: String(processo.area_id || ""),
          departamentoId: String(processo.departamento_id || ""),
          setorId: String(processo.setor_id || ""),
          status: processo.status || "Ativo",
          autTime: autTimeValue,
        });
      })
      .catch(console.error);

    tipos.forEach((tipo) => {
      fetch(`http://localhost:3000/processos/${id}/documentos/${tipo}`)
        .then((res) => res.json())
        .then((data) => {
          setExistingFiles((prev) => ({ ...prev, [tipo]: data }));
        })
        .catch(console.error);
    });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3000/api/localidades/areas")
      .then((res) => res.json())
      .then(setAreas)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (formData.areaId) {
      fetch(
        `http://localhost:3000/api/localidades/departamentos?area_id=${formData.areaId}`
      )
        .then((res) => res.json())
        .then(setDepartamentos)
        .catch(console.error);
    } else {
      setDepartamentos([]);
      setSetores([]);
      setFormData((prev) => ({ ...prev, departamentoId: "", setorId: "" }));
    }
  }, [formData.areaId]);

  useEffect(() => {
    if (formData.departamentoId) {
      fetch(
        `http://localhost:3000/api/localidades/setores?departamento_id=${formData.departamentoId}`
      )
        .then((res) => res.json())
        .then(setSetores)
        .catch(console.error);
    } else {
      setSetores([]);
      setFormData((prev) => ({ ...prev, setorId: "" }));
    }
  }, [formData.departamentoId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: string
  ) => {
    const arr = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => ({ ...prev, [tipo]: arr }));
  };

  const handleRemoveExisting = (tipo: string, idArquivo: number) => {
    setExistingFiles((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((f) => f.id !== idArquivo),
    }));
    setRemovedFileIds((prev) => [...prev, idArquivo]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.areaId ||
      !formData.departamentoId ||
      (setores.length && !formData.setorId)
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    const form = new FormData();

    // Garante que todos os valores são string antes de enviar
    Object.entries(formData).forEach(([k, v]) => {
      form.append(k, typeof v === "string" ? v : JSON.stringify(v));
    });

    removedFileIds.forEach((i) => form.append("documentosRemover", String(i)));
    tipos.forEach((t) => files[t].forEach((f) => form.append(t, f)));

    try {
      const res = await fetch(`http://localhost:3000/processos/${id}`, {
        method: "PUT",
        body: form,
      });
      if (!res.ok) throw new Error("Erro na atualização");
      navigate(`/processos/${id}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (confirmText !== "Confirmar") {
      alert('Digite exatamente "Confirmar" para apagar.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/processos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao apagar processo");
      alert("Processo apagado com sucesso.");
      navigate("/processes");
    } catch (err) {
      console.error(err);
      alert("Erro ao apagar processo.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setConfirmText("");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-2/3">
          <Card className="pt-6">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative mb-4">
                  <h2 className="text-2xl font-semibold text-center">
                    Editar Processo
                  </h2>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute right-0 top-1"
                  >
                    Voltar
                  </Button>
                </div>

                <div>
                  <Label>
                    Nome <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>
                    Descrição <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>
                      Área <span className="text-red-600">*</span>
                    </Label>
                    <Select
                      value={formData.areaId}
                      onValueChange={(v) => handleSelectChange("areaId", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((a) => (
                          <SelectItem key={a.id} value={String(a.id)}>
                            {a.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Departamento <span className="text-red-600">*</span>
                    </Label>
                    <Select
                      value={formData.departamentoId}
                      onValueChange={(v) =>
                        handleSelectChange("departamentoId", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((d) => (
                          <SelectItem key={d.id} value={String(d.id)}>
                            {d.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Setor{" "}
                      {setores.length ? (
                        <span className="text-red-600">*</span>
                      ) : (
                        <span className="text-gray-500 text-sm">(opcional)</span>
                      )}
                    </Label>
                    <Select
                      value={formData.setorId}
                      onValueChange={(v) => handleSelectChange("setorId", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {setores.map((s) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => handleSelectChange("status", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    Frequência de Auditoria{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.autTime}
                    onValueChange={(v) => handleSelectChange("autTime", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione">
                        {getDescricaoAutTime(formData.autTime)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(frequencias).map(([valor, label]) => (
                        <SelectItem key={valor} value={valor}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {tipos.map((t) => (
                    <div key={t}>
                      <Label className="capitalize">{nomesPorTipo[t]}</Label>
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e, t)}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                >
                  Apagar Processo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 max-h-[795px]">
          <Card className="pt-6 h-full flex flex-col">
            <CardContent className="space-y-2 flex flex-col h-full overflow-hidden">
              <h3 className="text-lg font-semibold text-center">
                Documentos anexados
              </h3>
              <ul className="divide-y overflow-y-auto flex-grow pr-2">
                {tipos.every((t) => !existingFiles[t]?.length) ? (
                  <li className="py-2 text-center text-gray-500 italic">
                    Nenhum documento anexado.
                  </li>
                ) : (
                  tipos.flatMap((t) =>
                    existingFiles[t]?.map((f) => {
                      const fileName =
                        f.nome ||
                        f.filename ||
                        f.nome_arquivo ||
                        (f.arquivo_caminho
                          ? decodeURIComponent(
                              f.arquivo_caminho.split("/").pop() || ""
                            )
                          : "Arquivo");
                      return (
                        <li
                          key={f.id}
                          className="py-2 flex items-center gap-3"
                          title={fileName}
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveExisting(t, f.id)}
                            className="p-1 rounded hover:bg-red-100 text-red-700 hover:text-red-900"
                            title="Remover"
                          >
                            <Trash2 className="h-6 w-6" />
                          </button>
                          {getIconByTipo(t)}
                          <span className="text-sm truncate flex-grow">
                            {fileName}
                          </span>
                          <span className="text-xs font-semibold text-gray-600">
                            {siglasPorTipo[t]}
                          </span>
                        </li>
                      );
                    })
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirmação de exclusão
            </h3>
            <p className="mb-4">
              Para apagar o processo, digite <strong>Confirmar</strong>.
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Digite "Confirmar"'
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmText("");
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={confirmText !== "Confirmar" || loading}
              >
                Apagar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditarProcesso;
