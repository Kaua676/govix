import { useState } from "react";

const BrazilHeatMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  const stateData = [
    {
      state: "SP",
      name: "São Paulo",
      investment: 89000000000,
      growth: 15.2,
      opportunities: 456,
    },
    {
      state: "RJ",
      name: "Rio de Janeiro",
      investment: 52000000000,
      growth: 8.7,
      opportunities: 287,
    },
    {
      state: "MG",
      name: "Minas Gerais",
      investment: 38000000000,
      growth: 12.1,
      opportunities: 198,
    },
    {
      state: "BA",
      name: "Bahia",
      investment: 24000000000,
      growth: 18.3,
      opportunities: 134,
    },
    {
      state: "PR",
      name: "Paraná",
      investment: 22000000000,
      growth: 9.4,
      opportunities: 156,
    },
    {
      state: "RS",
      name: "Rio Grande do Sul",
      investment: 21000000000,
      growth: 6.8,
      opportunities: 142,
    },
    {
      state: "PE",
      name: "Pernambuco",
      investment: 16000000000,
      growth: 22.1,
      opportunities: 98,
    },
    {
      state: "CE",
      name: "Ceará",
      investment: 14000000000,
      growth: 16.7,
      opportunities: 87,
    },
    {
      state: "PA",
      name: "Pará",
      investment: 12000000000,
      growth: 25.4,
      opportunities: 76,
    },
    {
      state: "SC",
      name: "Santa Catarina",
      investment: 11000000000,
      growth: 11.3,
      opportunities: 89,
    },
  ];

  const getIntensityColor = (investment) => {
    const maxInvestment = Math.max(...stateData.map((s) => s.investment));
    const intensity = investment / maxInvestment;
    if (intensity > 0.8) return "bg-red-600";
    if (intensity > 0.6) return "bg-red-500";
    if (intensity > 0.4) return "bg-orange-500";
    if (intensity > 0.2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return `R$ ${(value / 1000000000).toFixed(1)}bi`;
    } else if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}mi`;
    }
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  return (
    <div className="space-y-6">
      {/* Mapa de Calor */}
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-blue-600 rounded-full" />
          <h2 className="text-lg text-slate-800 font-semibold">
            Mapa de Calor - Investimentos por Estado
          </h2>
        </div>
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 min-h-96 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-800">
              Mapa Interativo do Brasil
            </h3>
            <p className="text-slate-600 max-w-md">Mapa aqui!</p>
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
          Ranking por Estado
        </h2>
        <div className="space-y-3">
          {stateData.map((state, index) => (
            <div
              key={state.state}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={() =>
                setSelectedState(
                  selectedState === state.state ? null : state.state
                )
              }
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-slate-600">
                    #{index + 1}
                  </span>
                  <div
                    className={`w-4 h-4 rounded ${getIntensityColor(
                      state.investment
                    )}`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{state.name}</h4>
                  <p className="text-sm text-slate-600">
                    {state.opportunities} oportunidades ativas
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800">
                  {formatCurrency(state.investment)}
                </div>
                <div className="text-sm text-green-600">+{state.growth}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destaques Regionais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Região Líder",
            value: "Sudeste",
            extra: "62% do total",
            from: "blue-500",
            to: "blue-600",
          },
          {
            title: "Maior Crescimento",
            value: "Nordeste",
            extra: "+19.2% média",
            from: "green-500",
            to: "green-600",
          },
          {
            title: "Emergente",
            value: "Norte",
            extra: "+23.5% potencial",
            from: "purple-500",
            to: "purple-600",
          },
        ].map((region) => (
          <div
            key={region.value}
            className={`bg-gradient-to-r from-${region.from} to-${region.to} text-white rounded-lg p-4`}
          >
            <div className="text-sm opacity-90">{region.title}</div>
            <div className="text-xl font-bold">{region.value}</div>
            <div className="text-sm opacity-90">{region.extra}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrazilHeatMap;
