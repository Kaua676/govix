import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../services/api";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ filters }) => {
  const [radarData, setRadarData] = useState({
    labels: [],
    datasets: [],
  });

  const coresFixas = {
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

  useEffect(() => {
    if (!filters?.data_inicio || !filters?.data_fim) return;

    api
      .post("filtro-anual", filters)
      .then((response) => {
        const data = response.data;

        const anos = new Set();
        const funcoes = new Set();
        const dadosPorFuncao = {};

        // Estrutura: { [funcao]: { [ano]: total } }
        data.forEach((item) => {
          const funcao = item["Função"];
          const ano = item["Ano"];
          const valor = item["Total Investido"];

          anos.add(ano);
          funcoes.add(funcao);

          if (!dadosPorFuncao[funcao]) {
            dadosPorFuncao[funcao] = {};
          }

          if (!dadosPorFuncao[funcao][ano]) {
            dadosPorFuncao[funcao][ano] = 0;
          }

          dadosPorFuncao[funcao][ano] += valor;
        });

        const anosOrdenados = Array.from(anos).sort();
        const funcoesOrdenadas = Array.from(funcoes).sort();

        const datasets = funcoesOrdenadas.map((funcao) => {
          const cor = coresFixas[funcao] || "#999";
          return {
            label: funcao,
            data: anosOrdenados.map((ano) => dadosPorFuncao[funcao][ano] || 0),
            backgroundColor: cor + "33", // transparência no fundo
            borderColor: cor,
            pointBackgroundColor: cor,
            borderWidth: 2,
            fill: false,
          };
        });

        setRadarData({
          labels: anosOrdenados,
          datasets,
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do RadarChart:", error);
      });
  }, [filters]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
    padding: 20
  },
    scales: {
      r: {
        suggestedMin: 0,
        pointLabels: {
          font: {
            size: 13, 
          },
        },
        ticks: {
          callback: (value) => `R$ ${value / 1_000_000} mi`,
          font: {
            size: 11,
          },
          maxTicksLimit: 3,
          
        },
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const valor = ctx.raw;
            return `${ctx.dataset.label}: R$ ${valor.toLocaleString("pt-BR")}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ height: "500px" }}>
      <Radar data={radarData} options={options} />
    </div>
  );
};

export default RadarChart;
