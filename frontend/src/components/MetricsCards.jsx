import { TrendingUp, DollarSign, Building, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";

const formatValor = (valor) => {
  if (valor >= 1e12) return `R$ ${(valor / 1e12).toFixed(2)} tri`;
  if (valor >= 1e9) return `R$ ${(valor / 1e9).toFixed(2)} bi`;
  if (valor >= 1e6) return `R$ ${(valor / 1e6).toFixed(2)} mi`;
  return `R$ ${valor.toLocaleString("pt-BR")}`;
};

const MetricsCards = ({ filters }) => {
  const [metrics, setMetrics] = useState([
    { title: "Investimento Total", value: "...", icon: DollarSign },
    { title: "Estados Identificados", value: "...", icon: TrendingUp },
    { title: "Funções Encontradas", value: "...", icon: Building },
    { title: "Última Atualização", value: "...", icon: Calendar },
  ]);

  useEffect(() => {}, [metrics]);

  useEffect(() => {
    api
      .post("filtro-mensal", filters, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;

        const totalInvestido = data.reduce((acc, cur) => {
          const valor = cur["Total Investido"] || 0;
          return acc + valor;
        }, 0);

        const estados = [...new Set(data.map((d) => d["UF"]))].length;
        const funcoes = [...new Set(data.map((d) => d["Função"]))].length;

        const now = new Date();
        const horario = now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const novasMetricas = [
          {
            title: "Investimento Total",
            value: formatValor(totalInvestido),
            change: "",
            trend: "neutral",
            icon: DollarSign,
            description: "Valor somado no período filtrado",
          },
          {
            title: "Estados Identificados",
            value: estados.toString(),
            change: "",
            trend: "neutral",
            icon: TrendingUp,
            description: "UFs presentes no recorte",
          },
          {
            title: "Funções Encontradas",
            value: funcoes.toString(),
            change: "",
            trend: "neutral",
            icon: Building,
            description: "Categorias mapeadas",
          },
          {
            title: "Última Atualização",
            value: "Hoje",
            change: horario,
            trend: "neutral",
            icon: Calendar,
            description: "Sincronização automática",
          },
        ];

        console.log("✅ Atualizando métricas com:", novasMetricas);
        setMetrics(novasMetricas);
      })
      .catch((error) => {
        console.error("❌ Erro ao carregar métricas:", error);
      });
  }, [filters]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const trendColor =
            metric.trend === "up"
              ? "text-green-600"
              : metric.trend === "down"
              ? "text-red-600"
              : "text-slate-600";

          return (
            <div
              key={metric.title}
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-slate-600">
                  {metric.title}
                </h3>
                <div className="w-8 h-8 bg-[#FC671D] rounded-lg flex items-center justify-center">
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="text-2xl font-bold text-slate-800 mb-1">
                {metric.value}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">{metric.description}</p>
                <span className={`text-xs font-medium ${trendColor}`}>
                  {metric.change || ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MetricsCards;
