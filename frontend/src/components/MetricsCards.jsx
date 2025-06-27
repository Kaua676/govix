import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, Building, Calendar } from "lucide-react";
import { fetchData } from "../services/api";

const MetricsCards = ({ filters }) => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    async function load() {
      setLoading(true); // Inicia o carregamento
      try {
        const data = await fetchData({ ...filters });
        const total = data.reduce((sum, d) => sum + d["Total Investido"], 0);

        // Contagem das categorias únicas (usando a coluna 'Função')
        const categories = new Set(data.map((d) => d["Função"])); // Função como categoria
        const orgaos = new Set(data.map((d) => d["UF"])).size;

        const newMetrics = [
          {
            title: "Investimento Total",
            value: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total),
            change: "",
            trend: "up",
            icon: DollarSign,
            description: "Total filtrado",
          },
          {
            title: "Categorias Encontradas", // Alterado para exibir as categorias
            value: categories.size.toString(), // Exibe o número de categorias únicas
            change: "",
            trend: "up",
            icon: TrendingUp,
            description: "Categorias únicas encontradas",
          },
          {
            title: "UFs Encontradas",
            value: orgaos.toString(),
            change: "",
            trend: "up",
            icon: Building,
            description: "Estados distintos",
          },
          {
            title: "Última Atualização",
            value: new Date().toLocaleDateString("pt-BR"),
            change: new Date().toLocaleTimeString("pt-BR"),
            trend: "neutral",
            icon: Calendar,
            description: "Atualização local",
          },
        ];

        setMetrics(newMetrics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    }
    load();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
          <p className="text-center text-slate-600">Carregando...</p>
        </div>
      ) : (
        metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const trendColor =
            metric.trend === "up"
              ? "text-green-600"
              : metric.trend === "down"
              ? "text-red-600"
              : "text-slate-600";

          return (
            <div
              key={index}
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
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MetricsCards;
