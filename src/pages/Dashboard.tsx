import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [processos, setProcessos] = useState<any[]>([]);
  const [totalDocumentos, setTotalDocumentos] = useState(0);
  const [resumo, setResumo] = useState({
    areas: [],
    departamentos: [],
    setores: [],
  });
  const [loadingResumo, setLoadingResumo] = useState(true);

  useEffect(() => {
    const fakeProcessos = [
      {
        id: 1,
        nome: "Processo A",
        status: "Ativo",
        atualizado_em: "2025-07-10",
      },
      {
        id: 2,
        nome: "Processo B",
        status: "Ativo",
        atualizado_em: "2025-06-20",
      },
      {
        id: 3,
        nome: "Processo C",
        status: "Inativo",
        atualizado_em: "2025-07-01",
      },
      {
        id: 4,
        nome: "Processo D",
        status: "Ativo",
        atualizado_em: "2025-07-12",
      },
      {
        id: 5,
        nome: "Processo E",
        status: "Inativo",
        atualizado_em: "2025-07-13",
      },
      {
        id: 6,
        nome: "Processo F",
        status: "Ativo",
        atualizado_em: "2025-07-15",
      },
      {
        id: 7,
        nome: "Processo G",
        status: "Ativo",
        atualizado_em: "2025-07-16",
      },
      {
        id: 8,
        nome: "Processo H",
        status: "Ativo",
        atualizado_em: "2025-07-16",
      },
    ];

    const fakeResumo = {
      areas: [
        { nome: "Qualidade", total: 5 },
        { nome: "RH", total: 3 },
      ],
      departamentos: [
        { nome: "DP1", total: 4 },
        { nome: "DP2", total: 4 },
      ],
      setores: [
        { nome: "Setor A", total: 3 },
        { nome: "Setor B", total: 5 },
      ],
    };

    setProcessos(fakeProcessos);
    setTotalDocumentos(64);
    setResumo(fakeResumo);
    setLoadingResumo(false);
  }, []);

  const processosAtivos = processos.filter((p) => p.status === "Ativo");
  const processosInativos = processos.filter((p) => p.status === "Inativo");

  const processosRecentes = [...processos]
    .filter((p) => !isNaN(Date.parse(p.atualizado_em)))
    .sort((a, b) => new Date(b.atualizado_em).getTime() - new Date(a.atualizado_em).getTime())
    .slice(0, 5);

  const setoresValidos = resumo.setores.filter(
    (s) => s.nome && s.nome.trim() !== "" && s.nome !== "Sem setor"
  );

  const cardsData = [
    {
      title: "Processos Ativos",
      description: "Total de processos em execução",
      value: processosAtivos.length,
    },
    {
      title: "Processos Inativos",
      description: "Total de processos inativos",
      value: processosInativos.length,
    },
    {
      title: "Documentos",
      description: "Total de documentos cadastrados",
      value: totalDocumentos,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardsData.map(({ title, description, value }, i) => (
          <motion.div
            key={i}
            whileHover={{ boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)" }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          >
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Resumo por área/departamento/setor */}
      <Card>
        <CardHeader>
          <CardTitle>Quantidade de processos:</CardTitle>
          <CardDescription>Distribuição de processos</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingResumo ? (
            <p>Carregando resumo...</p>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-${setoresValidos.length > 0 ? 3 : 2} gap-6`}>
              {[["🟩", "Áreas", resumo.areas],
                ["🟦", "Departamentos", resumo.departamentos],
                setoresValidos.length > 0 && ["🟪", "Setores", setoresValidos]]
                .filter(Boolean)
                .map(([icon, label, lista]: any, i) => (
                  <div key={i}>
                    <h4 className="font-semibold mb-4 text-gray-700 text-lg">{label}</h4>
                    <ul className="space-y-3">
                      {lista.length === 0 && <li>Nenhum dado encontrado</li>}
                      {lista.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl select-none">{icon}</div>
                            <span className="text-sm font-medium text-gray-700">
                              {item.nome || `Sem ${label.toLowerCase()}`}
                            </span>
                          </div>
                          <div className="inline-flex items-center justify-center min-w-[32px] min-h-[32px] bg-gray-100 text-gray-700 font-semibold rounded-full">
                            {item.total}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gráfico */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade</CardTitle>
          <CardDescription>Processos e documentos nos últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { name: "Jan", processos: 4, documentos: 8 },
                  { name: "Fev", processos: 3, documentos: 5 },
                  { name: "Mar", processos: 5, documentos: 12 },
                  { name: "Abr", processos: 7, documentos: 10 },
                  { name: "Mai", processos: 6, documentos: 15 },
                  { name: "Jun", processos: 9, documentos: 20 },
                  { name: "Jul", processos: 8, documentos: 18 },
                  { name: "Ago", processos: 7, documentos: 16 },
                  { name: "Set", processos: 6, documentos: 14 },
                  { name: "Out", processos: 5, documentos: 13 },
                  { name: "Nov", processos: 4, documentos: 11 },
                  { name: "Dez", processos: 6, documentos: 17 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="processos" stroke="#2563EB" strokeWidth={2} />
                <Line type="monotone" dataKey="documentos" stroke="#64748B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Processos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Processos Recentes</CardTitle>
          <CardDescription>Últimos processos atualizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Nome</th>
                  <th className="text-left pb-4">Última atualização</th>
                  <th className="text-left pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {processosRecentes.map((process) => (
                  <tr key={process.id} className="border-b last:border-0">
                    <td className="py-4">{process.nome}</td>
                    <td className="py-4 text-muted-foreground">
                      {new Date(process.atualizado_em).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        process.status === "Ativo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {process.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
