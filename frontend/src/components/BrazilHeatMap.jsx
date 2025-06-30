import { useEffect, useState } from "react";
import api from "../services/api"; // axios configurado
import BrazilPlotlyHeatMap from "./BrazilPlotlyHeatMap.jsx";

const BrazilHeatMap = ({ filters }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const agruparDados = (dados) => {
    const agrupadoMap = new Map();
    dados.forEach(({ UF, Função, "Total Investido": total, Ano }) => {
      const key = `${UF}||${Função}`;
      if (!agrupadoMap.has(key)) {
        agrupadoMap.set(key, { UF, Função, "Total Investido": 0, Ano });
      }
      agrupadoMap.get(key)["Total Investido"] += total;
    });
    return Array.from(agrupadoMap.values());
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    api.post("/filtro-anual", filters)
      .then((response) => {
        const data = response.data;
        const dataArray = Array.isArray(data) ? data : [data];
        const dadosAgrupados = agruparDados(dataArray);
        setRanking(dadosAgrupados);
      })
      .catch((err) => {
        console.error("Erro ao buscar ranking:", err);
        setError("Erro ao buscar ranking");
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const getIntensityColor = (investment, maxInvestment) => {
    const intensity = investment / maxInvestment;
    if (intensity > 0.8) return "bg-red-600";
    if (intensity > 0.6) return "bg-red-500";
    if (intensity > 0.4) return "bg-orange-500";
    if (intensity > 0.2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatCurrency = (value) => {
    if (value >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(1)}bi`;
    if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}mi`;
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const maxInvestment = ranking.length > 0
    ? Math.max(...ranking.map((r) => r["Total Investido"]))
    : 1;

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;

  return (
    <div className="space-y-6">
      {/* Mapa */}
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-blue-600 rounded-full" />
          <h2 className="text-lg text-slate-800 font-semibold">
            Mapa de Calor - Investimentos por Estado
          </h2>
        </div>

        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 min-h-96 flex items-center justify-center">
          <div className="text-center space-y-4 w-full">
            <h3 className="text-xl font-bold text-slate-800">Mapa Interativo do Brasil</h3>
            <BrazilPlotlyHeatMap
              filters={filters}
              // ranking={ranking}
              // onSelectState={(uf) => setSelectedState(uf)}
              // selectedState={selectedState}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="text-sm text-slate-600">Intensidade:</span>
          {[
            ["bg-green-500", "Baixa"],
            ["bg-yellow-500", "Média"],
            ["bg-orange-500", "Alta"],
            ["bg-red-600", "Muito Alta"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${color}`} />
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ranking */}
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
        <h2 className="text-lg text-slate-800 font-semibold mb-4">
          Ranking por Estado e Função
        </h2>
        <div className="space-y-3">
          {ranking.length === 0 && <p>Nenhum dado encontrado.</p>}
          {ranking.map((item, index) => {
            const cor = getIntensityColor(item["Total Investido"], maxInvestment);
            return (
              <div
                key={`${item.UF}-${item.Função}-${index}`}
                className={`flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                  selectedState === item.UF ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedState(selectedState === item.UF ? null : item.UF)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-slate-600">#{index + 1}</span>
                    <div className={`w-4 h-4 rounded ${cor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.UF}</h4>
                    <p className="text-sm text-slate-600">{item.Função}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">
                    {formatCurrency(item["Total Investido"] || 0)}
                  </div>
                  <div className="text-sm text-green-600">Ano: {item.Ano}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrazilHeatMap;
