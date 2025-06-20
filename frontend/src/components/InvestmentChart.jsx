import { useState } from "react";
import { Line, Pie, Radar } from "react-chartjs-2";
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
} from "chart.js";
import {
  BarChart as BarChartIcon,
  TrendingUp,
  PieChart as PieChartIcon,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend
);

const InvestmentChart = () => {
  const [chartType, setChartType] = useState("bar");

  const monthlyData = [
    {
      month: "Jan/24",
      saude: 45000000,
      educacao: 38000000,
      seguranca: 22000000,
      tecnologia: 15000000,
    },
    {
      month: "Fev/24",
      saude: 52000000,
      educacao: 41000000,
      seguranca: 25000000,
      tecnologia: 18000000,
    },
    {
      month: "Mar/24",
      saude: 48000000,
      educacao: 45000000,
      seguranca: 28000000,
      tecnologia: 22000000,
    },
    {
      month: "Abr/24",
      saude: 58000000,
      educacao: 39000000,
      seguranca: 30000000,
      tecnologia: 25000000,
    },
    {
      month: "Mai/24",
      saude: 61000000,
      educacao: 47000000,
      seguranca: 32000000,
      tecnologia: 28000000,
    },
    {
      month: "Jun/24",
      saude: 55000000,
      educacao: 52000000,
      seguranca: 35000000,
      tecnologia: 31000000,
    },
  ];

  const categoryData = [
    { name: "Saúde", value: 319000000, color: "#ef4444" },
    { name: "Educação", value: 262000000, color: "#3b82f6" },
    { name: "Segurança", value: 172000000, color: "#eab308" },
    { name: "Tecnologia", value: 139000000, color: "#8b5cf6" },
    { name: "Infraestrutura", value: 98000000, color: "#10b981" },
    { name: "Meio Ambiente", value: 76000000, color: "#06b6d4" },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);

  const lineData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Saúde",
        data: monthlyData.map((d) => d.saude),
        borderColor: "#ef4444",
        backgroundColor: "#ef444433",
      },
      {
        label: "Educação",
        data: monthlyData.map((d) => d.educacao),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f633",
      },
      {
        label: "Segurança",
        data: monthlyData.map((d) => d.seguranca),
        borderColor: "#eab308",
        backgroundColor: "#eab30833",
      },
      {
        label: "Tecnologia",
        data: monthlyData.map((d) => d.tecnologia),
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf633",
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
    if (chartType === "line") return <Line data={lineData} options={options} />;
    if (chartType === "bar") return <Radar data={radarData} options={radarOptions} />;
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
                chartType === "line"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
              onClick={() => setChartType("line")}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Tendência
            </button>
          </div>
        </div>
        <div className="h-96">{renderChart()}</div>
      </div>

      {/* Tabela fora do container branco dos gráficos */}
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
            {monthlyData.map(({ month, saude, educacao, seguranca, tecnologia }) => (
              <tr key={month} className="odd:bg-white even:bg-slate-50">
                <td className="border px-3 py-2">{month}</td>
                <td className="border px-3 py-2 text-right">{formatCurrency(saude)}</td>
                <td className="border px-3 py-2 text-right">{formatCurrency(educacao)}</td>
                <td className="border px-3 py-2 text-right">{formatCurrency(seguranca)}</td>
                <td className="border px-3 py-2 text-right">{formatCurrency(tecnologia)}</td>
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
