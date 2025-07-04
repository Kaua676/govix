import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import api from "../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ filters }) => {
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        "Essencial à justiça": "#5d6212",
        "Gestão ambiental": "#10b981",
        Habitação: "#06b6d4",
        Indústria: "#f87171",
        Judiciária: "#3f62a0",
        Múltiplo: "#818cf8",
        "Organização agrária": "#65a30d",
        "Previdência social": "#373a12",
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
        setLoading(true);
        if (!filters?.data_inicio || !filters?.data_fim) return;

        api.post("filtro-anual", filters)
            .then((response) => {
                const data = response.data;
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
                setError(error.message)
                console.error("Erro ao buscar dados do PieChart:", error);
            })
            .finally(() => setLoading(false))
    }, [filters]);

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
    console.log(pieData.datasets[0].data.length)

    if (loading) return <p>Carregando dados...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (pieData.datasets[0].data.length === 0) return <p>Nenhum dado encontrado</p>;

    return (
        <div style={{ height: "400px" }}>
            <Pie data={pieData} options={options} />
        </div>
    );
};

export default PieChart;
