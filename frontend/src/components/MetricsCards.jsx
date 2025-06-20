import { TrendingUp, DollarSign, Building, Calendar } from "lucide-react";

const MetricsCards = () => {
  const metrics = [
    {
      title: "Investimento Total",
      value: "R$ 847,2 bi",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Orçamento federal 2024",
    },
    {
      title: "Oportunidades Ativas",
      value: "2.847",
      change: "+8.3%",
      trend: "up",
      icon: TrendingUp,
      description: "Editais e licitações abertas",
    },
    {
      title: "Órgãos Participantes",
      value: "156",
      change: "+2.1%",
      trend: "up",
      icon: Building,
      description: "Ministérios e autarquias",
    },
    {
      title: "Última Atualização",
      value: "Hoje",
      change: "14:32",
      trend: "neutral",
      icon: Calendar,
      description: "Sincronização automática",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        const trendColor =
          metric.trend === "up"
            ? "text-green-600"
            : metric.trend === "down"
            ? "text-red-600"
            : "text-slate-600";

        return (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-slate-600">
                {metric.title}
              </h3>
              <div className="w-8 h-8 bg-[#FC671D] rounded-lg flex items-center justify-center">
                <IconComponent className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="text-2xl font-bold text-slate-800 mb-1">
              {metric.value}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-600">{metric.description}</p>
              <span className={`text-xs font-medium ${trendColor}`}>
                {metric.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
