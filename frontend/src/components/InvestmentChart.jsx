import { useState, useEffect } from "react";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";
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

import BarChart from "./BarChart";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import InvestmentMetrics from "./InvestmentMetrics";
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
  const [chartType, setChartType] = useState("radar");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (chartType === "radar") return <RadarChart filters={filters} />;
    return <PieChart filters={filters} />;
  };

  return (
    <div className="space-y-6">
      {/* Gráfico */}
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Análise de Investimentos
          </h2>
          <div className="flex space-x-2">
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${
                chartType === "radar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
              onClick={() => setChartType("radar")}
            >
              <BarChartIcon className="w-4 h-4 mr-1" />
              Radar
            </button>
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${
                chartType === "pie"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="w-4 h-4 mr-1" />
              Distribuição
            </button>
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${
                chartType === "bar"
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
        <div className="mx-auto">{renderChart()}</div>
      </div>

      {/* Tabela */}
      <div className="mt-6 bg-white rounded-md border border-slate-300 p-4 max-w-full">
        {loading ? (
          <div>Carregando dados...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : tableData.length === 0 ? (
          <div>Nenhum dado encontrado com os filtros selecionados!</div>
        ) : (
          <div style={{ maxHeight: "600px", overflowY: "auto" }} >
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-slate-100 hover:bg-slate-50">
                  {tableData.length > 0 &&
                    Object.keys(tableData[0]).map((header) => (
                      <th key={header} className="border-b border-slate-300 bg-slate-100 px-3 py-2 text-center">
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-slate-50 hover:bg-blue-100">
                    {Object.keys(tableData[0]).map((key) => (
                      <td key={key} className={`border-b border-slate-200 px-3 py-2 ${typeof row[key] === "number" ? "text-right" : "text-left"}`}>
                        {key === "Total Investido"
                          ? formatCurrency(row[key] || 0)
                          : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* Cards de Métricas */}
      <InvestmentMetrics filters={filters} />
    </div>
  );
};

export default InvestmentChart;
