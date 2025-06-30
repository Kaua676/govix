import { useState } from "react";
import { Radar } from "react-chartjs-2";
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
import PieChart from "./PieChart";

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

  const multiplier = 5;

  const monthlyData = [
    { month: "Jan/24", saude: 45000000, educacao: 38000000, seguranca: 22000000, tecnologia: 15000000 },
    { month: "Fev/24", saude: 52000000, educacao: 41000000, seguranca: 25000000, tecnologia: 18000000 },
    { month: "Mar/24", saude: 48000000, educacao: 45000000, seguranca: 28000000, tecnologia: 22000000 },
    { month: "Abr/24", saude: 58000000, educacao: 39000000, seguranca: 30000000, tecnologia: 25000000 },
    { month: "Mai/24", saude: 61000000, educacao: 47000000, seguranca: 32000000, tecnologia: 28000000 },
    { month: "Jun/24", saude: 55000000, educacao: 52000000, seguranca: 35000000, tecnologia: 31000000 },
    { month: "Jul/24", saude: 60000000, educacao: 54000000, seguranca: 37000000, tecnologia: 33000000 },
    { month: "Ago/24", saude: 62000000, educacao: 56000000, seguranca: 39000000, tecnologia: 35000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Set/24", saude: 64000000, educacao: 58000000, seguranca: 40000000, tecnologia: 37000000 },
    { month: "Out/24", saude: 66000000, educacao: 60000000, seguranca: 42000000, tecnologia: 39000000 },
    { month: "Nov/24", saude: 68000000, educacao: 62000000, seguranca: 43000000, tecnologia: 41000000 },
    { month: "Dez/24", saude: 70000000, educacao: 64000000, seguranca: 45000000, tecnologia: 43000000 },
    { month: "Jan/25", saude: 71000000, educacao: 65000000, seguranca: 46000000, tecnologia: 44000000 },
    { month: "Fev/25", saude: 72000000, educacao: 66000000, seguranca: 47000000, tecnologia: 45000000 },
    { month: "Mar/25", saude: 73000000, educacao: 67000000, seguranca: 48000000, tecnologia: 46000000 },
    { month: "Abr/25", saude: 74000000, educacao: 68000000, seguranca: 49000000, tecnologia: 47000000 },
    { month: "Mai/25", saude: 75000000, educacao: 69000000, seguranca: 50000000, tecnologia: 48000000 },
    { month: "Jun/25", saude: 76000000, educacao: 70000000, seguranca: 51000000, tecnologia: 49000000 },
  ];

  const categoryData = [
    { name: "Saúde", value: 319000000, color: "#ef4444" },
    { name: "Educação", value: 262000000, color: "#3b82f6" },
    { name: "Segurança", value: 172000000, color: "#eab308" },
    { name: "Tecnologia", value: 139000000, color: "#8b5cf6" },
    { name: "Infraestrutura", value: 98000000, color: "#10b981" },
    { name: "Meio Ambiente", value: 76000000, color: "#06b6d4" },
  ];

  // Dados escalados (multiplicados por 5)
  const monthlyDataScaled = monthlyData.map((item) => ({
    ...item,
    saude: item.saude * multiplier,
    educacao: item.educacao * multiplier,
    seguranca: item.seguranca * multiplier,
    tecnologia: item.tecnologia * multiplier,
  }));

  const categoryDataScaled = categoryData.map((item) => ({
    ...item,
    value: item.value * multiplier,
  }));

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);

  const barData = {
    labels: monthlyDataScaled.map((d) => d.month),
    datasets: [
      {
        label: "Saúde",
        data: monthlyDataScaled.map((d) => d.saude),
        backgroundColor: "#ef4444",
      },
      {
        label: "Educação",
        data: monthlyDataScaled.map((d) => d.educacao),
        backgroundColor: "#3b82f6",
      },
      {
        label: "Segurança",
        data: monthlyDataScaled.map((d) => d.seguranca),
        backgroundColor: "#eab308",
      },
      {
        label: "Tecnologia",
        data: monthlyDataScaled.map((d) => d.tecnologia),
        backgroundColor: "#8b5cf6",
      },
    ],
  };

  const radarData = {
    labels: monthlyDataScaled.map((d) => d.month),
    datasets: [
      {
        label: "Saúde",
        data: monthlyDataScaled.map((d) => d.saude),
        backgroundColor: "#ef444433",
        borderColor: "#ef4444",
      },
      {
        label: "Educação",
        data: monthlyDataScaled.map((d) => d.educacao),
        backgroundColor: "#3b82f633",
        borderColor: "#3b82f6",
      },
      {
        label: "Segurança",
        data: monthlyDataScaled.map((d) => d.seguranca),
        backgroundColor: "#eab30833",
        borderColor: "#eab308",
      },
      {
        label: "Tecnologia",
        data: monthlyDataScaled.map((d) => d.tecnologia),
        backgroundColor: "#8b5cf633",
        borderColor: "#8b5cf6",
      },
    ],
  };

  const pieData = {
    labels: categoryDataScaled.map((d) => d.name),
    datasets: [
      {
        data: categoryDataScaled.map((d) => d.value),
        backgroundColor: categoryDataScaled.map((d) => d.color),
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
    if (chartType === "bar") return <BarChart filters={filters} />;
    if (chartType === "radar") return <Radar data={radarData} options={radarOptions} />;
    return <PieChart filters={filters} />;
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
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-3 py-2 text-left">Ano/Mês</th>
                <th className="border px-3 py-2 text-right">Categoria</th>
                <th className="border px-3 py-2 text-right">Estado</th>
                <th className="border px-3 py-2 text-right">Favorecido</th>
                <th className="border px-3 py-2 text-right">Favorecido</th>
                <th className="border px-3 py-2 text-right">Tipo de Transferência</th>
              </tr>
            </thead>
            <tbody>
              {monthlyDataScaled.map(({ month, saude, educacao, seguranca, tecnologia }) => (
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-white p-4 rounded-lg" style={{ backgroundColor: "#0BC0D3" }}>
          <div className="text-sm opacity-90">Categoria Líder</div>
          <div className="text-2xl font-bold">Saúde</div>
          <div className="text-sm opacity-90">{formatCurrency(319000000 * multiplier)}</div>
        </div>
        <div className="text-white p-4 rounded-lg" style={{ backgroundColor: "#D34AF4" }}>
          <div className="text-sm opacity-90">Crescimento Mensal</div>
          <div className="text-2xl font-bold">+12.5%</div>
          <div className="text-sm opacity-90">Média semestre</div>
        </div>
        <div className="text-white p-4 rounded-lg" style={{ backgroundColor: "#FC671D" }}>
          <div className="text-sm opacity-90">Próxima Alta</div>
          <div className="text-2xl font-bold">Tecnologia</div>
          <div className="text-sm opacity-90">Previsão: +45%</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentChart;
