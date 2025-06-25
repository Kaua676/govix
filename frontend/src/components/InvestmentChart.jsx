import { useState } from "react";
import { Bar, Pie, Radar } from "react-chartjs-2";
import { fetchData } from "../services/api.js";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";

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
  BarController,
);

const InvestmentChart = ({ filters }) => {
  const [chartType, setChartType] = useState("bar");
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchData(filters)
      .then((dados) => {
        console.log("Resposata API: ", dados);
        setMonthlyData(dados.mensal || []);
        setCategoryData(dados.categorias || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setMonthlyData([]);
        setCategoryData([]);
      });
  }, [filters]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);

  const barData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Saúde",
        data: monthlyData.map((d) => d.saude),
        backgroundColor: "#ef4444",
      },
      {
        label: "Educação",
        data: monthlyData.map((d) => d.educacao),
        backgroundColor: "#3b82f6",
      },
      {
        label: "Segurança",
        data: monthlyData.map((d) => d.seguranca),
        backgroundColor: "#eab308",
      },
      {
        label: "Tecnologia",
        data: monthlyData.map((d) => d.tecnologia),
        backgroundColor: "#8b5cf6",
      },
    ],
  };

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

  const pieData = {
    labels: categoryData.map((d) => d.name),
    datasets: [
      {
        data: categoryData.map((d) => d.value),
        backgroundColor: categoryData.map((d) => d.color),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => formatCurrency(ctx.parsed.y ?? ctx.parsed),
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value),
        },
      },
    },
  };

  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Análise de Investimentos por Categoria (Mensal)",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => formatCurrency(ctx.parsed.y),
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Mês",
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => formatCurrency(value),
        },
        title: {
          display: true,
          text: "Valor Investido",
        },
      },
    },
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
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: "#64748b",
        },
        grid: {
          circular: true,
        },
      },
    },
  };

  const renderChart = () => {
    if (chartType === "bar") return <Bar data={barData} options={barOptions} />;
    if (chartType === "line") {
      return <Radar data={radarData} options={radarOptions} />;
    }
    return <Pie data={pieData} options={{ maintainAspectRatio: false }} />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Análise de Investimentos
          </h2>
          <div className="flex space-x-2">
            <button
              className={`flex items-center px-3 py-1 rounded text-sm border ${
                chartType === "bar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
              onClick={() => setChartType("bar")}
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
                chartType === "pie"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
              onClick={() => setChartType("line")}
            >
              <BarChartIcon className="w-4 h-4 mr-1" />
              Tendência
            </button>
          </div>
        </div>
        <div className="h-96">{renderChart()}</div>
      </div>

      <div className="overflow-auto mt-6 bg-white rounded-md border border-slate-300 p-4 max-w-full">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border px-3 py-2 text-left">Mês</th>
              <th className="border px-3 py-2 text-right">Saúde</th>
              <th className="border px-3 py-2 text-right">Educação</th>
              <th className="border px-3 py-2 text-right">Segurança</th>
              <th className="border px-3 py-2 text-right">Tecnologia</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((
              { month, saude, educacao, seguranca, tecnologia },
            ) => (
              <tr key={month} className="odd:bg-white even:bg-slate-50">
                <td className="border px-3 py-2">{month}</td>
                <td className="border px-3 py-2 text-right">
                  {formatCurrency(saude)}
                </td>
                <td className="border px-3 py-2 text-right">
                  {formatCurrency(educacao)}
                </td>
                <td className="border px-3 py-2 text-right">
                  {formatCurrency(seguranca)}
                </td>
                <td className="border px-3 py-2 text-right">
                  {formatCurrency(tecnologia)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="text-white p-4 rounded-lg"
          style={{ backgroundColor: "#0BC0D3" }}
        >
          <div className="text-sm opacity-90">Categoria Líder</div>
          <div className="text-2xl font-bold">Saúde</div>
          <div className="text-sm opacity-90">R$ 319 milhões</div>
        </div>
        <div
          className="text-white p-4 rounded-lg"
          style={{ backgroundColor: "#D34AF4" }}
        >
          <div className="text-sm opacity-90">Crescimento Mensal</div>
          <div className="text-2xl font-bold">+12.5%</div>
          <div className="text-sm opacity-90">Média semestre</div>
        </div>
        <div
          className="text-white p-4 rounded-lg"
          style={{ backgroundColor: "#FC671D" }}
        >
          <div className="text-sm opacity-90">Próxima Alta</div>
          <div className="text-2xl font-bold">Tecnologia</div>
          <div className="text-sm opacity-90">Previsão: +45%</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentChart;
