import { useState, useEffect } from "react";
import { Bar, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
  BarElement,
  BarController,
} from "chart.js";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";
import BarChart from "./BarChart";
import api from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
  BarElement,
  BarController
);

const InvestmentChart = ({ filters }) => {
  const [chartType, setChartType] = useState("line");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const monthlyData = [];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post("/filtro-anual", filters);
        console.log("Resposta da API:", response.data);  // <-- Aqui
        setTableData(response.data);
      } catch (err) {
        console.error("Erro na API:", err);
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters]);


  const renderChart = () => {
    if (chartType === "bar") return <BarChart filters={filters} />;
    if (chartType === "radar") {
      const radarData = {
        labels: monthlyData.map((d) => d.month),
        datasets: [
          {
            label: "Saúde",
            data: monthlyData.map((d) => d.saude),
            backgroundColor: "#ef444433",
            borderColor: "#ef4444",
          },
          {
            label: "Educação",
            data: monthlyData.map((d) => d.educacao),
            backgroundColor: "#3b82f633",
            borderColor: "#3b82f6",
          },
          {
            label: "Segurança",
            data: monthlyData.map((d) => d.seguranca),
            backgroundColor: "#eab30833",
            borderColor: "#eab308",
          },
          {
            label: "Tecnologia",
            data: monthlyData.map((d) => d.tecnologia),
            backgroundColor: "#8b5cf633",
            borderColor: "#8b5cf6",
          },
        ],
      };

      const radarOptions = {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => formatCurrency(ctx.parsed.r ?? ctx.parsed),
            },
          },
        },
        scales: {
          r: {
            ticks: { display: false },
            pointLabels: { font: { size: 12 }, color: "#64748b" },
            grid: { circular: true },
          },
        },
      };

      return <Radar data={radarData} options={radarOptions} />;
    }

    const categoryData = [
      { name: "Saúde", value: 319000000, color: "#ef4444" },
      { name: "Educação", value: 262000000, color: "#3b82f6" },
      { name: "Segurança", value: 172000000, color: "#eab308" },
      { name: "Tecnologia", value: 139000000, color: "#8b5cf6" },
      { name: "Infraestrutura", value: 98000000, color: "#10b981" },
      { name: "Meio Ambiente", value: 76000000, color: "#06b6d4" },
    ];

    const pieData = {
      labels: categoryData.map((d) => d.name),
      datasets: [
        {
          data: categoryData.map((d) => d.value),
          backgroundColor: categoryData.map((d) => d.color),
        },
      ],
    };

    return <Pie data={pieData} options={{ maintainAspectRatio: false }} />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Análise de Investimentos</h2>
          <div className="flex space-x-2">
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${chartType === "radar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
                }`}
              onClick={() => setChartType("radar")}
            >
              <BarChartIcon className="w-4 h-4 mr-1" />
              Radar
            </button>
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${chartType === "pie"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
                }`}
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="w-4 h-4 mr-1" />
              Distribuição
            </button>
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${chartType === "bar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
                }`}
              onClick={() => setChartType("bar")}
            >
              <BarChartIcon className="w-4 h-4 mr-1" />
              Barra
            </button>
          </div>
        </div>
        <div className="h-96">{renderChart()}</div>
      </div>

      <div className="mt-6 bg-white rounded-md border border-slate-300 p-4 max-w-full">
        {loading ? (
          <div>Carregando dados...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border px-3 py-2 text-left">Ano</th>
                  <th className="border px-3 py-2 text-left">Função</th>
                  <th className="border px-3 py-2 text-left">Estado (UF)</th>
                  <th className="border px-3 py-2 text-right">Total Investido</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-slate-50">
                    <td className="border px-3 py-2">{row.Ano}</td>
                    <td className="border px-3 py-2">{row.Função}</td>
                    <td className="border px-3 py-2">{row.UF}</td>
                    <td className="border px-3 py-2 text-right">
                      {formatCurrency(row["Total Investido"])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentChart;

