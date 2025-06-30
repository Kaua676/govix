import { useState, useEffect } from "react";
import { BarChart, MapPin, Target, TrendingUp } from "lucide-react";
import FilterPanel from "../components/FilterPanel";
import InvestmentChart from "../components/InvestmentChart";
import BrazilHeatMap from "../components/BrazilHeatMap";
import RecommendationsPanel from "../components/RecommendationsPanel";
import MetricsCards from "../components/MetricsCards";

const Index = () => {
  const [filters, setFilters] = useState(() => {
  const stored = localStorage.getItem("filtros");
  return stored ? JSON.parse(stored) : {
    ascending: "true",
    data_fim: "2025-12",
    data_inicio: "2025-01",
    favorecido: [],
    funcao: [],
    group: [],
    order_by: "",
    programa: [],
    tipo: [],
    uf: []
  };
});


  useEffect(() => {
    localStorage.setItem("filtros", JSON.stringify(filters));
  }, [filters]);

  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <img
                  style={{ width: "100px" }}
                  src="../src/assets/logo.svg"
                  alt="Logo"
                />
                <p className="text-sm text-slate-600">
                  Inteligência em Oportunidades Públicas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        <MetricsCards filters={filters} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="grid grid-cols-3 mb-6 gap-2">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md border 
                  ${
                    activeTab === "analytics"
                      ? "bg-indigo-600 text-white"
                      : "bg-white border-slate-300 text-slate-700"
                  }`}
              >
                <BarChart
                  filtros={filters}
                  setFiltros={setFilters}
                  className="w-4 h-4"
                />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md border 
                  ${
                    activeTab === "map"
                      ? "bg-indigo-600 text-white"
                      : "bg-white border-slate-300 text-slate-700"
                  }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Mapa de Calor</span>
              </button>
              <button
                onClick={() => setActiveTab("recommendations")}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md border 
                  ${
                    activeTab === "recommendations"
                      ? "bg-indigo-600 text-white"
                      : "bg-white border-slate-300 text-slate-700"
                  }`}
              >
                <Target className="w-4 h-4" />
                <span>Recomendações</span>
              </button>
            </div>

            {/* Conteúdo da Tab */}
            <div className="space-y-6">
              {activeTab === "analytics" && (
                <InvestmentChart filters={filters} />
              )}
              {activeTab === "map" && <BrazilHeatMap filters={filters} />}
              {activeTab === "recommendations" && (
                <RecommendationsPanel filters={filters} />
              )}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-600">
            © 2024 Digix - Radar de Oportunidades Govtech. Dados baseados em
            fontes públicas oficiais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
