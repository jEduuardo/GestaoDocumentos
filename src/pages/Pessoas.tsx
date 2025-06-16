import React, { useState } from 'react';

interface Pessoa {
  id: number;
  usuarioId: string;
  nome: string;
  email: string;
  cpf: string;
  cargo: string;
  tipoUsuario: 'Administrador' | 'Editor' | 'Leitor';
  area: string;
  departamento: string;
  setor: string;
  fotoUrl?: string;
}

const pessoasIniciais: Pessoa[] = [
  {  
    id: 1,
    usuarioId: 'USR001',
    nome: 'João Silva',
    email: 'joao.silva@empresa.com',
    cpf: '123.456.789-00',
    cargo: 'Gerente de Projetos',
    tipoUsuario: 'Administrador',
    area: 'Projetos',
    departamento: 'Engenharia',
    setor: 'Planejamento',
    fotoUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    usuarioId: 'USR002',
    nome: 'Maria Souza',
    email: 'maria.souza@empresa.com',
    cpf: '987.654.321-00',
    cargo: 'Analista de Processos',
    tipoUsuario: 'Editor',
    area: 'Processos',
    departamento: 'Qualidade',
    setor: 'Melhoria Contínua',
    fotoUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    usuarioId: 'USR003',
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@empresa.com',
    cpf: '111.222.333-44',
    cargo: 'Coordenador de TI',
    tipoUsuario: 'Administrador',
    area: 'Tecnologia',
    departamento: 'TI',
    setor: 'Suporte',
    fotoUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    usuarioId: 'USR004',
    nome: 'Ana Martins',
    email: 'ana.martins@empresa.com',
    cpf: '555.666.777-88',
    cargo: 'Especialista em Marketing',
    tipoUsuario: 'Editor',
    area: 'Marketing',
    departamento: 'Comercial',
    setor: 'Publicidade',
    fotoUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    usuarioId: 'USR005',
    nome: 'Pedro Gomes',
    email: 'pedro.gomes@empresa.com',
    cpf: '999.888.777-66',
    cargo: 'Assistente Administrativo',
    tipoUsuario: 'Leitor',
    area: 'Administrativo',
    departamento: 'Financeiro',
    setor: 'Contas a Pagar',
    fotoUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 6,
    usuarioId: 'USR006',
    nome: 'Beatriz Costa',
    email: 'beatriz.costa@empresa.com',
    cpf: '444.333.222-11',
    cargo: 'Analista Financeiro',
    tipoUsuario: 'Editor',
    area: 'Financeiro',
    departamento: 'Financeiro',
    setor: 'Controle Financeiro',
    fotoUrl: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 7,
    usuarioId: 'USR007',
    nome: 'Rafael Lima',
    email: 'rafael.lima@empresa.com',
    cpf: '222.444.666-88',
    cargo: 'Engenheiro de Produção',
    tipoUsuario: 'Administrador',
    area: 'Produção',
    departamento: 'Engenharia',
    setor: 'Manufatura',
    fotoUrl: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 8,
    usuarioId: 'USR008',
    nome: 'Juliana Alves',
    email: 'juliana.alves@empresa.com',
    cpf: '777.555.333-22',
    cargo: 'Analista de Recursos Humanos',
    tipoUsuario: 'Editor',
    area: 'RH',
    departamento: 'Recursos Humanos',
    setor: 'Recrutamento',
    fotoUrl: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 9,
    usuarioId: 'USR009',
    nome: 'Thiago Ferreira',
    email: 'thiago.ferreira@empresa.com',
    cpf: '666.777.888-99',
    cargo: 'Técnico de Segurança',
    tipoUsuario: 'Leitor',
    area: 'Segurança',
    departamento: 'Saúde e Segurança',
    setor: 'Prevenção',
    fotoUrl: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 10,
    usuarioId: 'USR010',
    nome: 'Camila Rodrigues',
    email: 'camila.rodrigues@empresa.com',
    cpf: '333.222.111-00',
    cargo: 'Assistente de Vendas',
    tipoUsuario: 'Leitor',
    area: 'Comercial',
    departamento: 'Vendas',
    setor: 'Atendimento',
    fotoUrl: 'https://i.pravatar.cc/150?img=10',
  },

];

const Pessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>(pessoasIniciais);
  const [searchTerm, setSearchTerm] = useState('');
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [formData, setFormData] = useState<Partial<Pessoa>>({});

  // Filtra pessoas pelo nome (ignore case)
  const pessoasFiltradas = pessoas.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abre modal em modo detalhes, zera o modo edição e formData
  const abrirDetalhes = (pessoa: Pessoa) => {
    setPessoaSelecionada(pessoa);
    setModoEdicao(false);
    setFormData(pessoa);
  };

  // Trata mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Salva edição (apenas atualiza o estado local)
  const salvarEdicao = () => {
    if (!pessoaSelecionada) return;
    setPessoas((old) =>
      old.map((p) => (p.id === pessoaSelecionada.id ? { ...p, ...formData } as Pessoa : p))
    );
    setModoEdicao(false);
    setPessoaSelecionada({ ...pessoaSelecionada, ...formData } as Pessoa);
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Pessoas</h1>

      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome..."
        className="border p-2 mb-4 w-full max-w-sm rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabela de Pessoas */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Foto</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">E-mail</th>
            <th className="py-2 px-4 border-b">Cargo</th>
            <th className="py-2 px-4 border-b">Setor</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoasFiltradas.map((pessoa) => (
            <tr key={pessoa.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <img
                  src={pessoa.fotoUrl}
                  alt={pessoa.nome}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{pessoa.nome}</td>
              <td className="py-2 px-4 border-b">{pessoa.email}</td>
              <td className="py-2 px-4 border-b">{pessoa.cargo}</td>
              <td className="py-2 px-4 border-b">{pessoa.setor}</td>
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

      {/* Modal */}
      {pessoaSelecionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setPessoaSelecionada(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl font-bold"
              onClick={() => setPessoaSelecionada(null)}
              aria-label="Fechar modal"
            >
              &times;
            </button>

            {!modoEdicao ? (
              <>
                <h2 className="text-xl font-semibold mb-6 text-center">Detalhes do Usuário</h2>
                <div className="flex gap-6">
                  <img
                    src={pessoaSelecionada.fotoUrl}
                    alt={pessoaSelecionada.nome}
                    className="w-28 h-28 rounded-full border object-cover"
                  />
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm w-full">
                    <div><strong>ID Usuário:</strong></div><div>{pessoaSelecionada.usuarioId}</div>
                    <div><strong>Nome:</strong></div><div>{pessoaSelecionada.nome}</div>
                    <div><strong>E-mail:</strong></div><div>{pessoaSelecionada.email}</div>
                    <div><strong>CPF:</strong></div><div>{pessoaSelecionada.cpf}</div>
                    <div><strong>Cargo:</strong></div><div>{pessoaSelecionada.cargo}</div>
                    <div><strong>Tipo de Usuário:</strong></div><div>{pessoaSelecionada.tipoUsuario}</div>
                    <div><strong>Área:</strong></div><div>{pessoaSelecionada.area}</div>
                    <div><strong>Departamento:</strong></div><div>{pessoaSelecionada.departamento}</div>
                    <div><strong>Setor:</strong></div><div>{pessoaSelecionada.setor}</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setModoEdicao(true)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setPessoaSelecionada(null)}
                  >
                    Fechar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6 text-center">Editar Usuário</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    salvarEdicao();
                  }}
                  className="space-y-4 text-sm"
                >
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="nome">
                        Nome
                      </label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formData.nome || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="email">
                        E-mail
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="cargo">
                        Cargo
                      </label>
                      <input
                        id="cargo"
                        name="cargo"
                        type="text"
                        value={formData.cargo || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="setor">
                        Setor
                      </label>
                      <input
                        id="setor"
                        name="setor"
                        type="text"
                        value={formData.setor || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="tipoUsuario">
                        Tipo de Usuário
                      </label>
                      <select
                        id="tipoUsuario"
                        name="tipoUsuario"
                        value={formData.tipoUsuario || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Editor">Editor</option>
                        <option value="Leitor">Leitor</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="area">
                        Área
                      </label>
                      <input
                        id="area"
                        name="area"
                        type="text"
                        value={formData.area || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="departamento">
                        Departamento
                      </label>
                      <input
                        id="departamento"
                        name="departamento"
                        type="text"
                        value={formData.departamento || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block font-semibold mb-1" htmlFor="cpf">
                        CPF
                      </label>
                      <input
                        id="cpf"
                        name="cpf"
                        type="text"
                        value={formData.cpf || ''}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => {
                        setModoEdicao(false);
                        setFormData(pessoaSelecionada);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pessoas;
