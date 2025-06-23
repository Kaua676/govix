import {
  Target,
  TrendingUp,
  AlertTriangle,
  Star,
  ExternalLink,
} from "lucide-react";

const RecommendationsPanel = () => {
  const strategicRecommendations = [
    {
      id: 1,
      title: "Área Prioritária: Saúde Digital",
      description:
        "Aumento de 45% nos investimentos em telemedicina e prontuários eletrônicos. Órgãos como Ministério da Saúde e SUS mostram alta liquidação.",
      priority: "alta",
      category: "Saúde",
      investment: "R$ 89 milhões",
      growth: "+45%",
      opportunities: 23,
      confidence: 92,
      action: "Desenvolver soluções de interoperabilidade",
    },
    {
      id: 2,
      title: "Emergente: Educação à Distância",
      description:
        "Crescimento acelerado pós-pandemia. Estados como SP, RJ e MG aumentaram verbas para plataformas educacionais em 78%.",
      priority: "alta",
      category: "Educação",
      investment: "R$ 156 milhões",
      growth: "+78%",
      opportunities: 34,
      confidence: 87,
      action: "Focar em acessibilidade e gamificação",
    },
    {
      id: 3,
      title: "Oportunidade: Segurança Cibernética",
      description:
        "Novos editais de proteção de dados governamentais. SERPRO e Dataprev lideram demanda por soluções de segurança.",
      priority: "media",
      category: "Segurança",
      investment: "R$ 67 milhões",
      growth: "+32%",
      opportunities: 18,
      confidence: 78,
      action: "Desenvolver compliance LGPD/governamental",
    },
    {
      id: 4,
      title: "Inovação: Smart Cities",
      description:
        "Municípios de grande porte investindo em IoT e análise de dados urbanos. Tendência crescente em iluminação e mobilidade inteligente.",
      priority: "media",
      category: "Infraestrutura",
      investment: "R$ 43 milhões",
      growth: "+28%",
      opportunities: 15,
      confidence: 71,
      action: "Soluções integradas de gestão urbana",
    },
    {
      id: 5,
      title: "Atenção: Sustentabilidade Digital",
      description:
        "Ministério do Meio Ambiente aumentou orçamento para tecnologias verdes. Foco em monitoramento ambiental e carbon footprint.",
      priority: "baixa",
      category: "Meio Ambiente",
      investment: "R$ 29 milhões",
      growth: "+18%",
      opportunities: 9,
      confidence: 65,
      action: "Monitoramento e relatórios ambientais",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baixa":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "alta":
        return AlertTriangle;
      case "media":
        return TrendingUp;
      case "baixa":
        return Target;
      default:
        return Star;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Recomendações Estratégicas</h2>
            <p className="opacity-90">
              Baseado em análise de R$ 847 bilhões em dados orçamentários
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Alta Prioridade", value: "5", color: "text-red-600" },
          { label: "Média Prioridade", value: "8", color: "text-yellow-600" },
          { label: "Baixa Prioridade", value: "12", color: "text-green-600" },
          { label: "Conf. Média", value: "83%", color: "text-blue-600" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center"
          >
            <div className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-sm text-slate-600">{item.label}</div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-4">
        <h3 className="flex items-center text-lg font-bold space-x-2 mb-4">
          <Star className="w-5 h-5" />
          <span>Insights da IA</span>
        </h3>
        <div className="space-y-3">
          {[
            {
              title: "🔮 Previsão 2025",
              content:
                "Saúde digital continuará líder com crescimento de 67%. Educação tecnológica emergirá como segunda maior categoria.",
            },
            {
              title: "📊 Padrão Identificado",
              content:
                "Órgãos com maior liquidação: Ministério da Saúde (94%), INEP (87%), SERPRO (82%). Foque nesses para maior conversão.",
            },
            {
              title: "🎯 Oportunidade Imediata",
              content:
                "15 editais de telemedicina abrem em Janeiro/2025. Valor total: R$ 234 milhões. Deadline para propostas: 45 dias.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/20 rounded-lg p-3">
              <div className="font-semibold mb-1">{item.title}</div>
              <div className="text-sm opacity-90">{item.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {strategicRecommendations.map((rec) => {
          const PriorityIcon = getPriorityIcon(rec.priority);
          return (
            <div
              key={rec.id}
              className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <PriorityIcon className="w-5 h-5 text-slate-600" />
                      <h3 className="text-lg font-semibold text-slate-800">
                        {rec.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded border ${getPriorityColor(
                          rec.priority
                        )}`}
                      >
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{rec.description}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-semibold text-green-600">
                      {rec.growth}
                    </div>
                    <div className="text-xs text-slate-500">
                      {rec.opportunities} oportunidades
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Confiança e Investimento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Confiança</span>
                      <span className="font-semibold">{rec.confidence}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded">
                      <div
                        className="h-2 bg-blue-600 rounded"
                        style={{ width: `${rec.confidence}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">
                      Investimento Estimado
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                      {rec.investment}
                    </div>
                  </div>
                </div>

                {/* Ação e Categoria */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 border border-slate-300 rounded text-xs">
                      {rec.category}
                    </span>
                    <span className="text-sm text-slate-600">•</span>
                    <span className="text-sm text-slate-600">{rec.action}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsPanel;
