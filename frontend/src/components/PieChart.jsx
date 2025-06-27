import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
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
        Urbanismo: "#3f6212"
    };
    useEffect(() => {
        fetch("http://localhost:5000/api/filtro-anual", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data_inicio: "2023-01",
                data_fim: "2023-12",
                funcao: ['Administração', 'Agricultura', 'Assistência social', 'Ciência e Tecnologia', 'Comunicações', 'Comércio e serviços', 'Cultura', 'Defesa nacional', 'Desporto e lazer', 'Direitos da cidadania', 'Educação', 'Encargos especiais', 'Energia', 'Gestão ambiental', 'Habitação', 'Indústria', 'Múltiplo', 'Organização agrária', 'Relações exteriores', 'Saneamento', 'Saúde', 'Segurança pública', 'Sem Informação', 'Trabalho', 'Transporte', 'Urbanismo'],
                order_by: "Ano",
                uf: ["MS"],
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Dados recebidos:", data);
                const totaisPorFuncao = {};

                data.forEach((item) => {
                    const funcao = item["Função"];
                    const valor = item["Total Investido"];

                    if (!totaisPorFuncao[funcao]) {
                        totaisPorFuncao[funcao] = 0;
                    }

                    totaisPorFuncao[funcao] += valor;
                });

                const labels = Object.keys(totaisPorFuncao);
                const valores = Object.values(totaisPorFuncao);
                const cores = labels.map((label) => coresFixas[label] || "#999");

                setPieData({
                    labels,
                    datasets: [
                        {
                            data: valores,
                            backgroundColor: cores,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar dados do PieChart:", error);
            });
    }, []);

    console.log(pieData)

    const options = {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const valor = ctx.parsed;
                        return `${ctx.label}: R$ ${valor.toLocaleString("pt-BR")}`;
                    },
                },
            },
            legend: {
                position: "right",
            },
        },
    };

    return (
        <div style={{ height: "400px" }}>
            <Pie data={pieData} options={options} />
        </div>
    );

};

export default PieChart;
