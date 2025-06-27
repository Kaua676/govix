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
      "id": 1,
      "title": "Foco Estratégico em Previdência Social",
      "description": "O investimento de R$ 4,60 trilhões na função Previdência Social entre 2018 e 2024 reflete sua posição como a maior despesa contínua. Este montante massivo, destinado ao pagamento de aposentadorias e pensões, é crucial para a estabilidade social e econômica, garantindo a renda de milhões de brasileiros. A otimização do seu uso pode assegurar a sustentabilidade do sistema a longo prazo.",
      "priority": "alta",
      "category": "Previdência Social",
      "investment": "R$ 4.60 trilhões",
      "action": "Implementar uma auditoria contínua dos benefícios concedidos, utilizando inteligência artificial para identificar e corrigir possíveis fraudes ou inconsistências, garantindo que os recursos cheguem a quem de direito e otimizando a sustentabilidade do sistema."
    },
    {
      "id": 2,
      "title": "Oportunidade de Otimização em Saúde",
      "description": "O repasse de R$ 1,02 trilhão para a Saúde evidencia a prioridade na manutenção e expansão dos serviços do SUS. Com um montante desta magnitude, é possível fortalecer a infraestrutura hospitalar e a atenção primária. A aplicação eficiente desses recursos pode resultar em uma melhoria direta nos indicadores de saúde pública e na qualidade de vida da população.",
      "priority": "alta",
      "category": "Saúde",
      "investment": "R$ 1.02 trilhão",
      "action": "Direcionar parte do investimento para a criação de um sistema nacional de telemedicina integrado, visando reduzir as filas de espera para especialistas e ampliar o acesso à saúde em regiões remotas, otimizando a capacidade da rede existente."
    },
    {
      "id": 3,
      "title": "Alavancagem de Investimentos em Educação",
      "description": "Com um investimento total de R$ 479,06 bilhões, a função Educação é fundamental para o desenvolvimento do capital humano do país. Este valor, distribuído ao longo dos anos, financia desde a educação básica até a superior. Um direcionamento estratégico pode impactar positivamente a qualidade do ensino, a infraestrutura escolar e a qualificação profissional dos cidadãos.",
      "priority": "alta",
      "category": "Educação",
      "investment": "R$ 479.06 bilhões",
      "action": "Criar um programa de investimento focado na modernização tecnológica das escolas públicas, incluindo a capacitação de professores para o uso de novas ferramentas digitais e a universalização do acesso à internet de alta velocidade para os alunos."
    },
    {
      "id": 4,
      "title": "Fortalecimento da Assistência Social",
      "description": "O aporte de R$ 470,20 bilhões na Assistência Social é vital para a proteção das populações mais vulneráveis. Este investimento financia programas de transferência de renda e serviços de proteção social. Sua correta aplicação é essencial para a redução da desigualdade e o combate à pobreza, impactando diretamente a coesão social.",
      "priority": "alta",
      "category": "Assistência Social",
      "investment": "R$ 470.20 bilhões",
      "action": "Desenvolver uma plataforma centralizada para a gestão integrada dos beneficiários de programas sociais, utilizando análise de dados para personalizar o atendimento e facilitar o acesso a múltiplos serviços, aumentando a eficiência e o alcance das políticas."
    },
    {
      "id": 5,
      "title": "Foco em Administração Pública",
      "description": "O investimento de R$ 265,30 bilhões na função Administração visa garantir o funcionamento da máquina pública. Este valor cobre despesas com pessoal, custeio e investimentos dos órgãos governamentais. A otimização desses gastos pode liberar recursos para áreas prioritárias e melhorar a qualidade dos serviços prestados ao cidadão.",
      "priority": "média",
      "category": "Administração",
      "investment": "R$ 265.30 bilhões",
      "action": "Promover um amplo programa de digitalização de serviços e processos administrativos, visando reduzir custos com burocracia, aumentar a transparência e agilizar a resposta do Estado às demandas da sociedade."
    },
    {
      "id": 6,
      "title": "Oportunidade de Modernização na Defesa Nacional",
      "description": "Os R$ 225,12 bilhões destinados à Defesa Nacional são essenciais para a soberania e proteção do território. O investimento contínuo nesta área permite a modernização das Forças Armadas e o desenvolvimento de tecnologias estratégicas. O foco na eficiência pode potencializar a capacidade operacional e o desenvolvimento tecnológico nacional.",
      "priority": "média",
      "category": "Defesa Nacional",
      "investment": "R$ 225.12 bilhões",
      "action": "Incentivar parcerias público-privadas para o desenvolvimento de tecnologias de defesa de uso dual (civil e militar), fomentando a indústria nacional e gerando inovação que possa ser aplicada em outros setores da economia."
    },
    {
      "id": 7,
      "title": "Foco em Segurança Pública",
      "description": "O montante de R$ 102,96 bilhões investido em Segurança Pública é crucial para o combate à criminalidade e a proteção dos cidadãos. O direcionamento eficaz desses recursos pode fortalecer as polícias, aprimorar a inteligência e modernizar o sistema prisional, resultando na redução dos índices de violência.",
      "priority": "alta",
      "category": "Segurança Pública",
      "investment": "R$ 102.96 bilhões",
      "action": "Alocar recursos para a integração de sistemas de inteligência entre as forças de segurança estaduais e federais, além de investir em tecnologias de policiamento preditivo para otimizar a alocação de efetivo e prevenir crimes."
    },
    {
      "id": 8,
      "title": "Otimização de Encargos Especiais",
      "description": "Os R$ 73,71 bilhões em Encargos Especiais representam um conjunto de despesas governamentais que não se enquadram nas demais funções. Analisar a natureza desses gastos é fundamental para garantir a transparência e a eficiência na alocação de recursos públicos, que poderiam ser remanejados para outras áreas.",
      "priority": "média",
      "category": "Encargos Especiais",
      "investment": "R$ 73.71 bilhões",
      "action": "Realizar uma revisão detalhada e periódica da natureza dos 'Encargos Especiais', reclassificando despesas sempre que possível e estabelecendo metas para a redução de gastos não essenciais nesta categoria."
    },
    {
      "id": 9,
      "title": "Desenvolvimento do Trabalho",
      "description": "O investimento de R$ 68,09 bilhões na função Trabalho financia políticas de emprego, renda e qualificação profissional. Em um cenário de mudanças econômicas, a aplicação estratégica desses recursos pode fortalecer a empregabilidade da força de trabalho e estimular a geração de novas oportunidades.",
      "priority": "média",
      "category": "Trabalho",
      "investment": "R$ 68.09 bilhões",
      "action": "Criar um fundo de incentivo para programas de requalificação profissional focados em habilidades digitais e na economia verde, preparando os trabalhadores para as demandas do futuro mercado de trabalho."
    },
    {
      "id": 10,
      "title": "Fomento ao Setor Judiciário",
      "description": "O repasse de R$ 51,96 bilhões para o Judiciário visa garantir o acesso à justiça e a celeridade dos processos. Este investimento é fundamental para a manutenção do Estado de Direito. A modernização e a gestão eficiente podem resultar em uma prestação jurisdicional mais rápida e eficaz para a sociedade.",
      "priority": "média",
      "category": "Judiciária",
      "investment": "R$ 51.96 bilhões",
      "action": "Acelerar a implementação de projetos de transformação digital no Judiciário, como o uso de inteligência artificial para automação de tarefas repetitivas e a realização de audiências virtuais, a fim de aumentar a produtividade e reduzir o tempo de tramitação dos processos."
    }
  ]



  const priorityCount = strategicRecommendations.reduce(
    (acc, item) => {
      if (item.priority === "alta") acc.alta++;
      else if (item.priority === "média") acc.media++;
      else if (item.priority === "baixa") acc.baixa++;
      return acc;
    },
    { alta: 0, media: 0, baixa: 0 }
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "média":
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
      case "média":
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Alta Prioridade",
            value: priorityCount.alta,
            color: "text-red-600",
          },
          {
            label: "Média Prioridade",
            value: priorityCount.media,
            color: "text-yellow-600",
          },
          {
            label: "Baixa Prioridade",
            value: priorityCount.baixa,
            color: "text-green-600",
          },
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
                    <p className="text-sm text-slate-600">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Confiança e Investimento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
