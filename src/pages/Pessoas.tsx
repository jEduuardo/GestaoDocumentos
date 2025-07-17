import React, { useEffect, useState } from "react";

interface Pessoa {
  id: number;
  matricula: string;
  nome: string;
  email: string;
  cpf: string;
  cargo: string;
  tipoUsuario: string;
  area: string;
  departamento: string;
  setor?: string;
  telefone: string;
  status: "Ativo" | "Inativo";
  fotoUrl?: string;
}

const Pessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [formData, setFormData] = useState<Partial<Pessoa>>({});

  useEffect(() => {
    // Dados fictícios
    const dadosFicticios: Pessoa[] = [
      {
        id: 1,
        matricula: "001",
        nome: "Ana Silva",
        email: "ana.silva@empresa.com",
        cpf: "123.456.789-00",
        cargo: "Analista",
        tipoUsuario: "Comum",
        area: "Recursos Humanos",
        departamento: "RH",
        setor: "Treinamento",
        telefone: "(11) 90000-0001",
        status: "Ativo",
        fotoUrl: "",
      },
      {
        id: 2,
        matricula: "002",
        nome: "Bruno Oliveira",
        email: "bruno.oliveira@empresa.com",
        cpf: "987.654.321-00",
        cargo: "Desenvolvedor",
        tipoUsuario: "Administrador",
        area: "TI",
        departamento: "Desenvolvimento",
        setor: "Backend",
        telefone: "(11) 90000-0002",
        status: "Ativo",
        fotoUrl: "",
      },
      {
        id: 3,
        matricula: "003",
        nome: "Carla Souza",
        email: "carla.souza@empresa.com",
        cpf: "111.222.333-44",
        cargo: "Coordenadora",
        tipoUsuario: "Gestor",
        area: "Financeiro",
        departamento: "Contabilidade",
        setor: "Pagamentos",
        telefone: "(11) 90000-0003",
        status: "Inativo",
        fotoUrl: "",
      },
      {
        id: 4,
        matricula: "004",
        nome: "Diego Costa",
        email: "diego.costa@empresa.com",
        cpf: "444.555.666-77",
        cargo: "Suporte",
        tipoUsuario: "Comum",
        area: "TI",
        departamento: "Infraestrutura",
        setor: "Helpdesk",
        telefone: "(11) 90000-0004",
        status: "Ativo",
        fotoUrl: "",
      },
    ];

    const dadosOrdenados = dadosFicticios.sort((a, b) =>
      a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
    );
    setPessoas(dadosOrdenados);
  }, []);

  const pessoasFiltradas = pessoas.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const abrirDetalhes = (pessoa: Pessoa) => {
    setPessoaSelecionada(pessoa);
    setModoEdicao(false);
    setFormData(pessoa);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const salvarEdicao = () => {
    if (!pessoaSelecionada) return;

    const pessoaAtualizada = { ...pessoaSelecionada, ...formData } as Pessoa;

    setPessoas((prev) =>
      prev.map((p) => (p.id === pessoaSelecionada.id ? pessoaAtualizada : p))
    );

    setPessoaSelecionada(pessoaAtualizada);
    setModoEdicao(false);
  };

  const excluirPessoa = () => {
    if (!pessoaSelecionada) return;

    const confirmar = confirm(
      `Deseja realmente excluir ${pessoaSelecionada.nome}?`
    );
    if (!confirmar) return;

    setPessoas((prev) =>
      prev.filter((p) => p.id !== pessoaSelecionada.id)
    );

    setPessoaSelecionada(null);
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Pessoas</h1>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          className="border p-2 rounded w-full sm:w-auto flex-1 min-w-[200px] max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          <a href="/cadastro-colaborador" className="btn">
            + Cadastrar Funcionário
          </a>
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Foto</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">E-mail</th>
            <th className="py-2 px-4 border-b">Cargo</th>
            <th className="py-2 px-4 border-b">Departamento</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoasFiltradas.map((pessoa) => (
            <tr key={pessoa.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                {pessoa.fotoUrl ? (
                  <img
                    src={pessoa.fotoUrl}
                    alt={pessoa.nome}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    N/A
                  </div>
                )}
              </td>
              <td className="py-2 px-4 border-b">{pessoa.nome}</td>
              <td className="py-2 px-4 border-b">{pessoa.email}</td>
              <td className="py-2 px-4 border-b">{pessoa.cargo}</td>
              <td className="py-2 px-4 border-b">{pessoa.departamento}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => abrirDetalhes(pessoa)}
                >
                  Ver detalhes
                </button>
              </td>
            </tr>
          ))}
          {pessoasFiltradas.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Nenhuma pessoa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Detalhes ou Edição */}
      {pessoaSelecionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setPessoaSelecionada(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-red-600 text-3xl font-bold"
              onClick={() => setPessoaSelecionada(null)}
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              {modoEdicao ? "Editar Usuário" : "Detalhes do Usuário"}
            </h2>

            <div className="flex flex-col items-center mb-8">
              <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 border-4 border-gray-300 shadow-lg">
                N/A
              </div>
              <p className="mt-4 font-semibold text-xl text-gray-800">
                {pessoaSelecionada.nome}
              </p>
              <p className="text-gray-500 text-base">
                {pessoaSelecionada.cargo}
              </p>
            </div>

            {!modoEdicao ? (
              <>
                <div className="grid grid-cols-2 gap-y-5 gap-x-10 text-base text-gray-700">
                  <div><strong>Matrícula:</strong> {pessoaSelecionada.matricula}</div>
                  <div><strong>Email:</strong> {pessoaSelecionada.email}</div>
                  <div><strong>CPF:</strong> {pessoaSelecionada.cpf}</div>
                  <div><strong>Telefone:</strong> {pessoaSelecionada.telefone}</div>
                  <div><strong>Status:</strong> {pessoaSelecionada.status}</div>
                  <div><strong>Área:</strong> {pessoaSelecionada.area}</div>
                  <div><strong>Departamento:</strong> {pessoaSelecionada.departamento}</div>
                  <div><strong>Setor:</strong> {pessoaSelecionada.setor || "-"}</div>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                  <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setModoEdicao(true)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setPessoaSelecionada(null)}
                  >
                    Fechar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 text-base">
                  {[
                    "matricula",
                    "nome",
                    "email",
                    "cpf",
                    "telefone",
                    "cargo",
                    "area",
                    "departamento",
                    "setor",
                  ].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="mb-2 font-medium text-gray-700 capitalize">
                        {field}
                      </label>
                      <input
                        name={field}
                        value={(formData as any)[field] || ""}
                        onChange={handleChange}
                        className="border p-3 rounded-lg bg-gray-50"
                      />
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status || ""}
                      onChange={handleChange}
                      className="border p-3 rounded-lg bg-gray-50"
                    >
                      <option value="">Selecione o status</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-between gap-4">
                  <button
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                    onClick={excluirPessoa}
                  >
                    Excluir
                  </button>

                  <div className="flex gap-4">
                    <button
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                      onClick={salvarEdicao}
                    >
                      Salvar
                    </button>
                    <button
                      className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                      onClick={() => setModoEdicao(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pessoas;
