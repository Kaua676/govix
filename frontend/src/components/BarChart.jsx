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

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);


const ufLabelPlugin = {
    id: "ufLabelPlugin",
    afterDatasetsDraw(chart) {
        const {
            ctx,
            chartArea: { bottom },
        } = chart;
        const drawn = new Set();

        chart.data.datasets.forEach((dataset) => {
            const meta = chart.getDatasetMeta(
                chart.data.datasets.indexOf(dataset)
            );
            if (!meta.hidden) {
                meta.data.forEach((bar) => {
                    const key = `${bar.x}-${dataset.stack}`;
                    if (!drawn.has(key)) {
                        drawn.add(key);
                        ctx.save();
                        ctx.font = "bold 11px sans-serif";
                        ctx.fillStyle = "#000";
                        ctx.textAlign = "center";
                        ctx.translate(bar.x, bottom + 60);
                        ctx.rotate(-Math.PI / 2); 
                        ctx.fillText(dataset.stack, 0, 0);
                        ctx.restore();
                    }
                });
            }
        });
    },
};

const BarChart = ({filters}) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    filters.order_by = ""

    useEffect(() => {
        api.post("filtro-mensal", filters)
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
                                (d) =>
                                    d["Mês/Ano"] === mes &&
                                    d["UF"] === uf &&
                                    d["Função"] === funcao
                            );
                            return item ? item["Total Investido"] : 0;
                        });

                        datasets.push({
                            label: funcao,
                            data: valores,
                            backgroundColor:
                                corPorFuncao[funcao] || "rgba(0,0,0,0.5)",
                            stack: uf,
                        });
                    });
                });

                setChartData({
                    labels: meses,
                    datasets,
                });
            })
            .catch((err) => {
                console.error("Erro ao buscar dados:", err);
            });
    }, [filters]);

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                    label: function (context) {
                        const valor = context.raw.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        });
                        return `${context.dataset.label} (${context.dataset.stack}): ${valor}`;
                    },
                },
            },
            title: {
                display: true,
                text: "Investimento Empilhado por UF e Função - Mês a Mês",
            },
            legend: {
                labels: {
                    generateLabels(chart) {
                        const funcoesUnicas = new Set();
                        return chart.data.datasets
                            .filter((ds) => {
                                if (!funcoesUnicas.has(ds.label)) {
                                    funcoesUnicas.add(ds.label);
                                    return true;
                                }
                                return false;
                            })
                            .map((ds, i) => {
                                return {
                                    text: ds.label,
                                    fillStyle: ds.backgroundColor,
                                    hidden: chart.getDatasetMeta(i).hidden,
                                    datasetIndex: i, 
                                };
                            });
                    },
                },
                onClick: function (e, legendItem, legend) {
                    const chart = legend.chart;
                    const label = legendItem.text;

                    chart.data.datasets.forEach((ds, i) => {
                        if (ds.label === label) {
                            const meta = chart.getDatasetMeta(i);
                            meta.hidden =
                                meta.hidden === null ? true : !meta.hidden;
                        }
                    });

                    chart.update();
                },
            },
        },
        interaction: {
            mode: "index",
            intersect: false,
        },
        layout: {
            padding: {
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: "Mês/Ano",
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                },
                grid: {
                    drawOnChartArea: false,
                },
                offset: true,
            },
            y: {
                stacked: true,
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
        <Bar
            key={JSON.stringify(chartData?.labels)}
            data={chartData}
            options={options}
            plugins={[ufLabelPlugin]}
        />
    );
};

export default BarChart;
