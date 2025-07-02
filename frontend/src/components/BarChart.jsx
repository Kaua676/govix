import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import api from "../services/api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const ufLabelPlugin = {
  id: "ufLabelPlugin",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { bottom },
    } = chart;

    const drawn = new Set();

    chart.data.datasets.forEach((dataset) => {
      const meta = chart.getDatasetMeta(chart.data.datasets.indexOf(dataset));
      if (!meta.hidden) {
        meta.data.forEach((bar) => {
          const key = `${bar.x}-${dataset.stack}`;
          if (!drawn.has(key)) {
            drawn.add(key);
            ctx.save();
            ctx.font = "bold 11px sans-serif";
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            const y = Math.min(chart.height - 10, bottom - 20);
            ctx.translate(bar.x, y);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(dataset.stack, 0, 0);
            ctx.restore();
          }
        });
      }
    });
  },
};

const BarChart = ({ filters }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const filterBar = { ...filters, order_by: "Data", ascending: "true" };

  useEffect(() => {
    api
      .post("filtro-mensal", filterBar)
      .then((response) => {
        const data = response.data;

        const meses = [...new Set(data.map((d) => d["Mês/Ano"]))];
        const ufs = [...new Set(data.map((d) => d["UF"]))];
        const funcoes = [...new Set(data.map((d) => d["Função"]))];

        const corPorFuncao = {
          Administração: "#2563eb",
          Agricultura: "#16a34a",
          "Assistência social": "#ec4899",
          "Ciência e Tecnologia": "#8b5cf6",
          Comunicações: "#0ea5e9",
          "Comércio e serviços": "#f97316",
          Cultura: "#e11d48",
          "Defesa nacional": "#7c3aed",
          "Desporto e lazer": "#22c55e",
          "Direitos da cidadania": "#f43f5e",
          Educação: "#3b82f6",
          "Encargos especiais": "#a855f7",
          Energia: "#facc15",
          "Gestão ambiental": "#10b981",
          Habitação: "#06b6d4",
          Indústria: "#f87171",
          Múltiplo: "#818cf8",
          "Organização agrária": "#65a30d",
          "Relações exteriores": "#4f46e5",
          Saneamento: "#2dd4bf",
          Saúde: "#ef4444",
          "Segurança pública": "#eab308",
          "Sem Informação": "#9ca3af",
          Trabalho: "#db2777",
          Transporte: "#fb923c",
          Urbanismo: "#3f6212",
        };

        const datasets = [];

        funcoes.forEach((funcao) => {
          ufs.forEach((uf) => {
            const valores = meses.map((mes) => {
              const item = data.find(
                (d) => d["Mês/Ano"] === mes && d["UF"] === uf && d["Função"] === funcao
              );
              return item ? item["Total Investido"] : 0;
            });

            datasets.push({
              label: funcao,
              data: valores,
              backgroundColor: corPorFuncao[funcao] || "rgba(0,0,0,0.5)",
              stack: uf,
            });
          });
        });

        setChartData({ labels: meses, datasets });
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, [filters]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: "x",
        intersect: true,
        callbacks: {
          label: (context) => {
            const valor = context.raw.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
            return `${context.dataset.label} (${context.dataset.stack}): ${valor}`;
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Investimento Empilhado por UF e Função - Mês a Mês",
        font: {
          size: 16,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    layout: {
      padding: {},
    },
    scales: {
      x: {
        stacked: true,
        offset: true,
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
        },
        title: {
          display: true,
          text: "Mês/Ano",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        stacked: true,
        suggestedMin: -5000,
        title: {
          display: true,
          text: "Total Investido (R$)",
        },
        ticks: {
          callback: (value) =>
            value.toLocaleString("pt-BR", {
              notation: "compact",
              compactDisplay: "short",
            }),
        },
      },
    },
  };

  return (
    <div>
      {/* Legenda fora do gráfico */}
      <div className="flex flex-wrap justify-center mb-2 gap-3">
        {[...new Set(chartData.datasets.map((d) => d.label))].map((funcao) => {
          const cor = chartData.datasets.find((d) => d.label === funcao)?.backgroundColor;
          return (
            <div key={funcao} className="flex items-center space-x-2 text-sm">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: cor }}
              />
              <span>{funcao}</span>
            </div>
          );
        })}
      </div>

      {/* Scroll horizontal das barras */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <div
          style={{
            minWidth: `${chartData.labels.length * 80}px`,
            height: 500,
          }}
        >
          <Bar
            data={chartData}
            options={options}
            plugins={[ufLabelPlugin]}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
