import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileUp,
  ArrowLeft,
  FileSymlink,
  FileType,
  FileUser,
  FileCog,
  FilePen,
  FileText,
} from "lucide-react";

const CadastroProcesso = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    areaId: "",
    areaNome: "",
    departamentoId: "",
    departamentoNome: "",
    setorId: "",
    setorNome: "",
    status: "Ativo",
  });

  const tipos = ["fluxograma", "pop", "it", "mu", "politica", "formulario"];

  const nomesPorTipo: Record<string, string> = {
    fluxograma: "Fluxograma",
    pop: "Procedimento Operacional Padrão (POP)",
    it: "Instrução de Trabalho (IT)",
    mu: "Manual de Usuário (MU)",
    politica: "Política",
    formulario: "Formulário",
  };

  const iconesPorTipo: Record<string, JSX.Element> = {
    fluxograma: (
      <FileSymlink className="w-4 h-4 text-blue-600 inline mr-1 mb-[4px]" />
    ),
    pop: <FileType className="w-4 h-4 text-blue-600 inline mr-1 mb-[4px]" />,
    it: <FileCog className="w-4 h-4 text-blue-600 inline mr-1 mb-[4px]" />,
    mu: <FileUser className="w-4 h-4 text-blue-600 inline mr-1 mb-[4px]" />,
    politica: (
      <FileText className="w-4 h-4 text-blue-600 inline mr-1 mb-[4px]" />
    ),
    formulario: (
      <FilePen className="w-4 h-4 text-blue-600 inline mr-1 mb-[4px]" />
    ),
  };

  const [files, setFiles] = useState<Record<string, File[]>>({
    fluxograma: [],
    pop: [],
    it: [],
    mu: [],
    politica: [],
    formulario: [],
  });

  const [areas, setAreas] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [setores, setSetores] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/localidades/areas")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
        if (data.length > 0 && !formData.areaId) {
          setFormData((prev) => ({
            ...prev,
            areaId: String(data[0].id),
            areaNome: data[0].nome,
          }));
        }
      })
      .catch((err) => console.error("Erro ao carregar áreas:", err));
  }, []);

  useEffect(() => {
    if (formData.areaId) {
      fetch(
        `http://localhost:3000/api/localidades/departamentos?area_id=${formData.areaId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDepartamentos(data);
          setFormData((prev) => ({
            ...prev,
            departamentoId: "",
            departamentoNome: "",
            setorId: "",
            setorNome: "",
          }));
          setSetores([]);
        })
        .catch((err) => console.error("Erro ao carregar departamentos:", err));
    }
  }, [formData.areaId]);

  useEffect(() => {
    if (formData.departamentoId) {
      fetch(
        `http://localhost:3000/api/localidades/setores?departamento_id=${formData.departamentoId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSetores(data);
          setFormData((prev) => ({
            ...prev,
            setorId: "",
            setorNome: "",
          }));
        })
        .catch((err) => console.error("Erro ao carregar setores:", err));
    } else {
      setSetores([]);
      setFormData((prev) => ({
        ...prev,
        setorId: "",
        setorNome: "",
      }));
    }
  }, [formData.departamentoId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "areaId") {
      const area = areas.find((a) => String(a.id) === value);
      setFormData((prev) => ({
        ...prev,
        areaId: value,
        areaNome: area ? area.nome : "",
        departamentoId: "",
        departamentoNome: "",
        setorId: "",
        setorNome: "",
      }));
    } else if (name === "departamentoId") {
      const departamento = departamentos.find((d) => String(d.id) === value);
      setFormData((prev) => ({
        ...prev,
        departamentoId: value,
        departamentoNome: departamento ? departamento.nome : "",
        setorId: "",
        setorNome: "",
      }));
    } else if (name === "setorId") {
      const setor = setores.find((s) => String(s.id) === value);
      setFormData((prev) => ({
        ...prev,
        setorId: value,
        setorNome: setor ? setor.nome : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: string
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [tipo]: Array.from(selectedFiles),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validação obrigatória
    if (
      !formData.areaId ||
      !formData.departamentoId ||
      (setores.length > 0 && !formData.setorId)
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const form = new FormData();
    form.append("nome", formData.nome);
    form.append("descricao", formData.descricao);
    form.append("areaId", formData.areaId);
    form.append("areaNome", formData.areaNome);
    form.append("departamentoId", formData.departamentoId);
    form.append("departamentoNome", formData.departamentoNome);
    form.append("setorId", formData.setorId);
    form.append("setorNome", formData.setorNome);
    form.append("status", formData.status);

    for (const tipo in files) {
      files[tipo].forEach((file) => {
        form.append(tipo, file);
      });
    }

    try {
      const res = await fetch("http://localhost:3000/processos", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Processo cadastrado com sucesso!");
        navigate("/processes");
      } else {
        alert("Erro ao cadastrar processo.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="relative mb-6">
            <div className="flex justify-start">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/processes")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                
                Voltar
              </Button>
            </div>
            <h2 className="text-2xl font-semibold text-center mt-[-32px]">
              Cadastrar Processo
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nome do Processo <span className="text-red-600">*</span></Label>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label>Descrição <span className="text-red-600">*</span></Label>
              <Textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>
                  Área <span className="text-red-600">*</span>
                </Label>
                <Select
                  value={formData.areaId}
                  onValueChange={(value) => handleSelectChange("areaId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={String(area.id)}>
                        {area.nome}
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
                  onValueChange={(value) =>
                    handleSelectChange("departamentoId", value)
                  }
                  disabled={!formData.areaId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((dep) => (
                      <SelectItem key={dep.id} value={String(dep.id)}>
                        {dep.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Setor{" "}
                  {setores.length > 0 ? (
                    <span className="text-red-600">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(opcional)</span>
                  )}
                </Label>

                <Select
                  value={formData.setorId}
                  onValueChange={(value) =>
                    handleSelectChange("setorId", value)
                  }
                  disabled={!formData.departamentoId || setores.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((setor) => (
                      <SelectItem key={setor.id} value={String(setor.id)}>
                        {setor.nome}
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
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tipos.map((tipo) => (
                <div key={tipo}>
                  <Label className="capitalize">
                    {iconesPorTipo[tipo]} {nomesPorTipo[tipo]}
                  </Label>
                  <Input
                    type="file"
                    name={tipo}
                    multiple
                    onChange={(e) => handleFileChange(e, tipo)}
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <FileUp className="w-4 h-4 mr-2" />
              Salvar Processo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroProcesso;
