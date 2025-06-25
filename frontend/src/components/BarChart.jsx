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

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

// Plugin para exibir a UF abaixo da barra
const ufLabelPlugin = {
    id: "ufLabelPlugin",
    afterDatasetsDraw(chart) {
        const {
            ctx,
            chartArea: { bottom },
            chartArea,
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
                        ctx.translate(bar.x, bottom + 60); // Posição abaixo do eixo
                        ctx.rotate(-Math.PI / 2); // Rotaciona 90 graus para escrever em pé
                        ctx.fillText(dataset.stack, 0, 0);
                        ctx.restore();
                    }
                });
            }
        });
    },
};

const BarChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetch("http://localhost:5000/api/filtro-mensal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ascending: "false",
                data_fim: "2023-12",
                data_inicio: "2023-01",
                funcao: ["Educação", "Saúde"],
                order_by: "Mês/Ano",
                uf: ["MS", "MT", "SP", "RJ"],
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const meses = [...new Set(data.map((d) => d["Mês/Ano"]))];
                const ufs = [...new Set(data.map((d) => d["UF"]))];
                const funcoes = [...new Set(data.map((d) => d["Função"]))];

                const corPorFuncao = {
                    Educação: "rgba(54, 162, 235, 0.8)",
                    Saúde: "rgba(255, 99, 132, 0.8)",
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
                            backgroundColor: corPorFuncao[funcao],
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
    }, []);

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
                            .map((ds) => ({
                                text: ds.label,
                                fillStyle: ds.backgroundColor,
                            }));
                    },
                },
            },
        },
        interaction: {
            mode: "index",
            intersect: false,
        },
        layout: {
            padding: {
                bottom: 40, // espaço suficiente para as UF rotacionadas
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
                // Aumenta o espaço abaixo do eixo X
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

    return <Bar data={chartData} options={options} plugins={[ufLabelPlugin]} />;
};

export default BarChart;
