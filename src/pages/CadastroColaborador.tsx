import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Tipagens
type FormDataType = {
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  tipoUsuario: string;
  cargo: string;
  area: string;
  departamento: string;
  setor: string;
  telefone: string;
};

type Option = {
  id: number;
  nome: string;
};

const CadastroColaborador: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    matricula: "",
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    tipoUsuario: "",
    cargo: "",
    area: "",
    departamento: "",
    setor: "",
    telefone: "",
  });

  const [foto, setFoto] = useState<File | null>(null);
  const [areas, setAreas] = useState<Option[]>([]);
  const [departamentos, setDepartamentos] = useState<Option[]>([]);
  const [setores, setSetores] = useState<Option[]>([]);
  const [cpfValido, setCpfValido] = useState<boolean | null>(null);
  const [cpfExiste, setCpfExiste] = useState(false);

  const isCpfOk = cpfValido === true && cpfExiste === false;

  // Carregar áreas ao montar componente
  useEffect(() => {
    fetch("http://localhost:3000/api/localidades/areas")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
        if (data.length > 0 && !formData.area) {
          setFormData((prev) => ({ ...prev, area: String(data[0].id) }));
        }
      })
      .catch((err) => console.error("Erro ao carregar áreas:", err));
  }, []);

  // Carregar departamentos ao selecionar área
  useEffect(() => {
    if (formData.area) {
      fetch(
        `http://localhost:3000/api/localidades/departamentos?area_id=${Number(
          formData.area
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDepartamentos(data);
          setFormData((prev) => ({ ...prev, departamento: "", setor: "" }));
          setSetores([]);
        })
        .catch((err) => console.error("Erro ao carregar departamentos:", err));
    } else {
      setDepartamentos([]);
      setSetores([]);
      setFormData((prev) => ({ ...prev, departamento: "", setor: "" }));
    }
  }, [formData.area]);

  // Carregar setores ao selecionar departamento
  useEffect(() => {
    if (formData.departamento) {
      fetch(
        `http://localhost:3000/api/localidades/setores?departamento_id=${Number(
          formData.departamento
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSetores(data);
          setFormData((prev) => ({ ...prev, setor: "" }));
        })
        .catch((err) => console.error("Erro ao carregar setores:", err));
    } else {
      setSetores([]);
      setFormData((prev) => ({ ...prev, setor: "" }));
    }
  }, [formData.departamento]);

  // Função para validar CPF
  const validarCpf = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  // Verificar validade e existência do CPF
  useEffect(() => {
    const checkCpf = async () => {
      const cpf = formData.cpf;
      if (cpf.length === 11 && validarCpf(cpf)) {
        setCpfValido(true);
        try {
          const res = await fetch(
            `http://localhost:3000/api/usuarios/checar-cpf?cpf=${cpf}`
          );
          const data = await res.json();
          setCpfExiste(data.existe);
        } catch (error) {
          console.error("Erro ao verificar CPF:", error);
          setCpfExiste(false);
        }
      } else {
        setCpfValido(false);
        setCpfExiste(false);
      }
    };
    checkCpf();
  }, [formData.cpf]);

  // Atualiza campos no formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "area" ? { departamento: "", setor: "" } : {}),
      ...(name === "departamento" ? { setor: "" } : {}),
    }));
  };

  // Captura foto selecionada
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFoto(e.target.files[0]);
  };

  // Envia formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (foto) data.append("foto", foto);

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Colaborador cadastrado com sucesso!");
        setFormData({
          matricula: "",
          nome: "",
          email: "",
          senha: "",
          cpf: "",
          tipoUsuario: "",
          cargo: "",
          area: "",
          departamento: "",
          setor: "",
          telefone: "",
        });
        setFoto(null);
        navigate("/pessoas");
      } else {
        const err = await res.json();
        alert(`Erro: ${err.message || "Erro ao cadastrar colaborador"}`);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <div className="mb-6 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/pessoas")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Voltar
        </Button>
      </div>

      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
        Cadastro de Colaborador
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Matrícula + Nome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">
              Matrícula<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Nome<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>
        </div>

        {/* Email + Senha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">
              E-mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Senha<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>
        </div>

        {/* CPF + Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">
              CPF<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              maxLength={11}
              className={`w-full border px-4 py-3 rounded ${
                cpfValido === false || cpfExiste ? "border-red-500" : ""
              }`}
            />
            {cpfValido === false && formData.cpf.length > 0 && (
              <p className="text-red-600 text-sm">CPF inválido</p>
            )}
            {cpfExiste && (
              <p className="text-red-600 text-sm">CPF já está em uso</p>
            )}
            {cpfValido && !cpfExiste && formData.cpf.length > 0 && (
              <p className="text-green-600 text-sm">CPF válido e disponível</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-2">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded"
            />
          </div>
        </div>

        {/* Cargo */}
        <div>
          <label className="block font-semibold mb-2">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
          />
        </div>

        {/* Área */}
        <div>
          <label className="block font-semibold mb-2">
            Área<span className="text-red-500">*</span>
          </label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded bg-white"
          >
            <option value="">Selecione uma área</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Departamento */}
        <div>
          <label className="block font-semibold mb-2">
            Departamento<span className="text-red-500">*</span>
          </label>
          <select
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
            disabled={!departamentos.length}
            className="w-full border px-4 py-3 rounded bg-white"
          >
            <option value="">Selecione um departamento</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Setor */}
        <div>
          <label className="block font-semibold mb-2">Setor (opcional)</label>
          <select
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            disabled={!setores.length}
            className="w-full border px-4 py-3 rounded bg-white"
          >
            <option value="">Selecione um setor</option>
            {setores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Usuário */}
        <div>
          <label className="block font-semibold mb-2">
            Tipo de Usuário<span className="text-red-500">*</span>
          </label>
          <select
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded bg-white"
          >
            <option value="">Selecione</option>
            <option value="Administrador">Administrador</option>
            <option value="Editor">Editor</option>
            <option value="Leitor">Leitor</option>
          </select>
        </div>

        {/* Foto */}
        <div>
          <label className="block font-semibold mb-2">Foto</label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleFotoChange}
            className="w-full border px-4 py-2 rounded cursor-pointer"
          />
          {foto && (
            <p className="mt-2 text-green-600 text-sm">
              Arquivo selecionado: {foto.name}
            </p>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={!isCpfOk}
          className={`w-full ${
            isCpfOk
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white font-bold py-3 rounded`}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroColaborador;
