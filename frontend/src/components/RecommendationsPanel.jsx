import { useState } from "react";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Star,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

const RecommendationsPanel = () => {
  const strategicRecommendations = [
    {
      id: 1,
      title: "Foco Estratégico em Previdência Social",
      description:
        "O investimento de R$ 4,60 trilhões na função Previdência Social entre 2018 e 2024 reflete sua posição como a maior despesa contínua. Este montante massivo, destinado ao pagamento de aposentadorias e pensões, é crucial para a estabilidade social e econômica, garantindo a renda de milhões de brasileiros. A otimização do seu uso pode assegurar a sustentabilidade do sistema a longo prazo.",
      priority: "alta",
      category: "Previdência Social",
      investment: "R$ 4.60 trilhões",
      action:
        "Implementar uma auditoria contínua dos benefícios concedidos, utilizando inteligência artificial para identificar e corrigir possíveis fraudes ou inconsistências, garantindo que os recursos cheguem a quem de direito e otimizando a sustentabilidade do sistema.",
    },
    {
      id: 2,
      title: "Oportunidade de Otimização em Saúde",
      description:
        "O repasse de R$ 1,02 trilhão para a Saúde evidencia a prioridade na manutenção e expansão dos serviços do SUS. Com um montante desta magnitude, é possível fortalecer a infraestrutura hospitalar e a atenção primária. A aplicação eficiente desses recursos pode resultar em uma melhoria direta nos indicadores de saúde pública e na qualidade de vida da população.",
      priority: "alta",
      category: "Saúde",
      investment: "R$ 1.02 trilhão",
      action:
        "Direcionar parte do investimento para a criação de um sistema nacional de telemedicina integrado, visando reduzir as filas de espera para especialistas e ampliar o acesso à saúde em regiões remotas, otimizando a capacidade da rede existente.",
    },
    {
      id: 3,
      title: "Alavancagem de Investimentos em Educação",
      description:
        "Com um investimento total de R$ 479,06 bilhões, a função Educação é fundamental para o desenvolvimento do capital humano do país. Este valor, distribuído ao longo dos anos, financia desde a educação básica até a superior. Um direcionamento estratégico pode impactar positivamente a qualidade do ensino, a infraestrutura escolar e a qualificação profissional dos cidadãos.",
      priority: "alta",
      category: "Educação",
      investment: "R$ 479.06 bilhões",
      action:
        "Criar um programa de investimento focado na modernização tecnológica das escolas públicas, incluindo a capacitação de professores para o uso de novas ferramentas digitais e a universalização do acesso à internet de alta velocidade para os alunos.",
    },
    {
      id: 4,
      title: "Fortalecimento da Assistência Social",
      description:
        "O aporte de R$ 470,20 bilhões na Assistência Social é vital para a proteção das populações mais vulneráveis. Este investimento financia programas de transferência de renda e serviços de proteção social. Sua correta aplicação é essencial para a redução da desigualdade e o combate à pobreza, impactando diretamente a coesão social.",
      priority: "alta",
      category: "Assistência Social",
      investment: "R$ 470.20 bilhões",
      action:
        "Desenvolver uma plataforma centralizada para a gestão integrada dos beneficiários de programas sociais, utilizando análise de dados para personalizar o atendimento e facilitar o acesso a múltiplos serviços, aumentando a eficiência e o alcance das políticas.",
    },
    {
      id: 5,
      title: "Foco em Administração Pública",
      description:
        "O investimento de R$ 265,30 bilhões na função Administração visa garantir o funcionamento da máquina pública. Este valor cobre despesas com pessoal, custeio e investimentos dos órgãos governamentais. A otimização desses gastos pode liberar recursos para áreas prioritárias e melhorar a qualidade dos serviços prestados ao cidadão.",
      priority: "media",
      category: "Administração",
      investment: "R$ 265.30 bilhões",
      action:
        "Promover um amplo programa de digitalização de serviços e processos administrativos, visando reduzir custos com burocracia, aumentar a transparência e agilizar a resposta do Estado às demandas da sociedade.",
    },
    {
      id: 6,
      title: "Oportunidade de Modernização na Defesa Nacional",
      description:
        "Os R$ 225,12 bilhões destinados à Defesa Nacional são essenciais para a soberania e proteção do território. O investimento contínuo nesta área permite a modernização das Forças Armadas e o desenvolvimento de tecnologias estratégicas. O foco na eficiência pode potencializar a capacidade operacional e o desenvolvimento tecnológico nacional.",
      priority: "media",
      category: "Defesa Nacional",
      investment: "R$ 225.12 bilhões",
      action:
        "Incentivar parcerias público-privadas para o desenvolvimento de tecnologias de defesa de uso dual (civil e militar), fomentando a indústria nacional e gerando inovação que possa ser aplicada em outros setores da economia.",
    },
    {
      id: 7,
      title: "Foco em Segurança Pública",
      description:
        "O montante de R$ 102,96 bilhões investido em Segurança Pública é crucial para o combate à criminalidade e a proteção dos cidadãos. O direcionamento eficaz desses recursos pode fortalecer as polícias, aprimorar a inteligência e modernizar o sistema prisional, resultando na redução dos índices de violência.",
      priority: "alta",
      category: "Segurança Pública",
      investment: "R$ 102.96 bilhões",
      action:
        "Alocar recursos para a integração de sistemas de inteligência entre as forças de segurança estaduais e federais, além de investir em tecnologias de policiamento preditivo para otimizar a alocação de efetivo e prevenir crimes.",
    },
    {
      id: 8,
      title: "Otimização de Encargos Especiais",
      description:
        "Os R$ 73,71 bilhões em Encargos Especiais representam um conjunto de despesas governamentais que não se enquadram nas demais funções. Analisar a natureza desses gastos é fundamental para garantir a transparência e a eficiência na alocação de recursos públicos, que poderiam ser remanejados para outras áreas.",
      priority: "media",
      category: "Encargos Especiais",
      investment: "R$ 73.71 bilhões",
      action:
        "Realizar uma revisão detalhada e periódica da natureza dos 'Encargos Especiais', reclassificando despesas sempre que possível e estabelecendo metas para a redução de gastos não essenciais nesta categoria.",
    },
    {
      id: 9,
      title: "Desenvolvimento do Trabalho",
      description:
        "O investimento de R$ 68,09 bilhões na função Trabalho financia políticas de emprego, renda e qualificação profissional. Em um cenário de mudanças econômicas, a aplicação estratégica desses recursos pode fortalecer a empregabilidade da força de trabalho e estimular a geração de novas oportunidades.",
      priority: "media",
      category: "Trabalho",
      investment: "R$ 68.09 bilhões",
      action:
        "Criar um fundo de incentivo para programas de requalificação profissional focados em habilidades digitais e na economia verde, preparando os trabalhadores para as demandas do futuro mercado de trabalho.",
    },
    {
      id: 10,
      title: "Fomento ao Setor Judiciário",
      description:
        "O repasse de R$ 51,96 bilhões para o Judiciário visa garantir o acesso à justiça e a celeridade dos processos. Este investimento é fundamental para a manutenção do Estado de Direito. A modernização e a gestão eficiente podem resultar em uma prestação jurisdicional mais rápida e eficaz para a sociedade.",
      priority: "media",
      category: "Judiciária",
      investment: "R$ 51.96 bilhões",
      action:
        "Acelerar a implementação de projetos de transformação digital no Judiciário, como o uso de inteligência artificial para automação de tarefas repetitivas e a realização de audiências virtuais, a fim de aumentar a produtividade e reduzir o tempo de tramitação dos processos.",
    },
    {
      id: 11,
      title: "Oportunidade em Transporte",
      description:
        "O investimento de R$ 47,21 bilhões na função Transporte é vital para a infraestrutura logística do país. Este valor sustenta a manutenção e expansão de rodovias, ferrovias e portos. A aplicação estratégica desses recursos pode reduzir custos logísticos, aumentar a competitividade dos produtos brasileiros e melhorar a mobilidade da população.",
      priority: "media",
      category: "Transporte",
      investment: "R$ 47.21 bilhões",
      action:
        "Priorizar o investimento em projetos de integração de modais (rodoviário, ferroviário e aquaviário) para criar corredores de exportação mais eficientes e reduzir a dependência do transporte rodoviário, diminuindo custos e impacto ambiental.",
    },
    {
      id: 12,
      title: "Foco em Direitos da Cidadania",
      description:
        "O montante de R$ 38,70 bilhões para Direitos da Cidadania financia a proteção de direitos humanos e a promoção da igualdade. Este investimento é fundamental para a defesa de minorias e a garantia de direitos fundamentais. A otimização do seu uso pode fortalecer a democracia e a inclusão social no país.",
      priority: "media",
      category: "Direitos da Cidadania",
      investment: "R$ 38.70 bilhões",
      action:
        "Desenvolver campanhas nacionais de conscientização e canais de denúncia mais acessíveis para violações de direitos, utilizando parte dos recursos para fortalecer conselhos tutelares e órgãos de proteção a grupos vulneráveis.",
    },
    {
      id: 13,
      title: "Desenvolvimento da Agricultura",
      description:
        "Com um total de R$ 26,05 bilhões, a função Agricultura é essencial para um dos pilares da economia brasileira. O investimento apoia desde a agricultura familiar até o agronegócio, impactando a segurança alimentar e a balança comercial. O fomento à inovação neste setor pode ampliar a produtividade de forma sustentável.",
      priority: "media",
      category: "Agricultura",
      investment: "R$ 26.05 bilhões",
      action:
        "Criar linhas de crédito e assistência técnica focadas em práticas agrícolas sustentáveis e de baixa emissão de carbono, incentivando a recuperação de pastagens degradadas e a adoção de tecnologias de agricultura de precisão.",
    },
    {
      id: 14,
      title: "Otimização no Setor Legislativo",
      description:
        "O investimento de R$ 16,33 bilhões na função Legislativa assegura o funcionamento do Congresso Nacional, assembleias e câmaras municipais. Embora seja um custo para a manutenção da democracia, a busca por eficiência e transparência nos gastos pode aumentar a confiança da população no poder Legislativo.",
      priority: "baixa",
      category: "Legislativa",
      investment: "R$ 16.33 bilhões",
      action:
        "Implementar uma plataforma unificada de transparência para todos os níveis do Legislativo, detalhando gastos com pessoal, verbas de gabinete e emendas parlamentares em um formato de dados abertos e de fácil compreensão pelo cidadão.",
    },
    {
      id: 15,
      title: "Fomento à Ciência e Tecnologia",
      description:
        "Os R$ 15,84 bilhões aplicados em Ciência e Tecnologia são o motor para a inovação e o desenvolvimento futuro do país. Este valor, embora modesto, financia pesquisas e bolsas. Um aumento ou otimização deste investimento é crucial para a soberania tecnológica e a competitividade global do Brasil.",
      priority: "media",
      category: "Ciência e Tecnologia",
      investment: "R$ 15.84 bilhões",
      action:
        "Concentrar investimentos em áreas tecnológicas estratégicas, como biotecnologia, inteligência artificial e energias renováveis, criando hubs de inovação que conectem universidades, institutos de pesquisa e o setor privado.",
    },
    {
      id: 16,
      title: "Alavancagem do Urbanismo",
      description:
        "O investimento de R$ 8,10 bilhões em Urbanismo impacta diretamente a qualidade de vida nas cidades. Os recursos são destinados a obras de saneamento, habitação e mobilidade urbana. O planejamento integrado desses investimentos é fundamental para o desenvolvimento urbano sustentável e inclusivo.",
      priority: "media",
      category: "Urbanismo",
      investment: "R$ 8.10 bilhões",
      action:
        "Direcionar os investimentos para projetos de requalificação de áreas centrais degradadas e para a regularização fundiária em áreas urbanas, promovendo o acesso à moradia digna e melhorando a infraestrutura local.",
    },
    {
      id: 17,
      title: "Gestão Ambiental Estratégica",
      description:
        "O aporte de R$ 7,16 bilhões na Gestão Ambiental é fundamental para a conservação dos biomas brasileiros e a fiscalização de crimes ambientais. Este investimento, apesar de parecer baixo frente à vastidão territorial, é decisivo para a sustentabilidade e a imagem do país no exterior.",
      priority: "alta",
      category: "Gestão Ambiental",
      investment: "R$ 7.16 bilhões",
      action:
        "Investir em tecnologias de monitoramento por satélite e em drones para fortalecer a fiscalização contra o desmatamento ilegal e as queimadas, além de ampliar os recursos para as unidades de conservação.",
    },
    {
      id: 18,
      title: "Desenvolvimento da Indústria",
      description:
        "Os R$ 4,88 bilhões destinados à Indústria visam fomentar a competitividade e a inovação no setor secundário. O direcionamento desses recursos pode ajudar a modernizar o parque industrial brasileiro e a gerar empregos de maior qualidade, agregando valor à produção nacional.",
      priority: "baixa",
      category: "Indústria",
      investment: "R$ 4.88 bilhões",
      action:
        "Criar um programa de incentivo à digitalização para pequenas e médias indústrias (Indústria 4.0), oferecendo crédito com juros baixos e consultoria para a adoção de automação e processos mais eficientes.",
    },
    {
      id: 19,
      title: "Foco em Saneamento",
      description:
        "O investimento de R$ 3,60 bilhões em Saneamento é crucial para a saúde pública e a preservação ambiental. A universalização do acesso à água tratada e à coleta de esgoto é um dos maiores desafios do país. Mesmo com um valor limitado, projetos bem executados podem transformar a realidade de muitas comunidades.",
      priority: "alta",
      category: "Saneamento",
      investment: "R$ 3.60 bilhões",
      action:
        "Fomentar parcerias público-privadas e consórcios intermunicipais para acelerar os investimentos em saneamento básico, priorizando as regiões com os piores indicadores e maior vulnerabilidade social.",
    },
    {
      id: 20,
      title: "Oportunidade no Setor de Energia",
      description:
        "O montante de R$ 3,36 bilhões destinado à Energia apoia a expansão e a diversificação da matriz energética brasileira. Este investimento é estratégico para garantir a segurança energética e impulsionar a transição para fontes mais limpas e renováveis, como a solar e a eólica.",
      priority: "media",
      category: "Energia",
      investment: "R$ 3.36 bilhões",
      action:
        "Lançar um programa de incentivos para a instalação de painéis solares em residências de baixa renda e prédios públicos, visando democratizar o acesso à energia limpa e reduzir a demanda sobre o sistema elétrico nacional.",
    },
  ];

  const getInitialCards = () => strategicRecommendations.slice(0, 5);

  const getRandomRecommendations = () => {
    const shuffled = [...strategicRecommendations].sort(
      () => 0.5 - Math.random()
    );
    return shuffled.slice(0, 5);
  };

  const calculatePriorityCount = (recommendations) => {
    return recommendations.reduce(
      (acc, item) => {
        if (item.priority === "alta") acc.alta++;
        else if (item.priority === "media") acc.media++;
        else if (item.priority === "baixa") acc.baixa++;
        return acc;
      },
      { alta: 0, media: 0, baixa: 0 }
    );
  };

  const initialCards = getInitialCards();
  const [randomRecommendations, setRandomRecommendations] =
    useState(initialCards);
  const [priorityCount, setPriorityCount] = useState(
    calculatePriorityCount(initialCards)
  );

  const randomizeRecommendations = () => {
    const randomRecs = getRandomRecommendations();
    setRandomRecommendations(randomRecs);
    setPriorityCount(calculatePriorityCount(randomRecs));
  };

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

  // Utilitário para converter string como "R$ 4.60 trilhões" em número
  const parseInvestment = (str) => {
    const cleaned = str.replace("R$", "").replace(",", "").trim().toLowerCase();
    let multiplier = 1;

    if (cleaned.includes("bilhão") || cleaned.includes("bilhões"))
      multiplier = 1e9;
    else if (cleaned.includes("trilhão") || cleaned.includes("trilhões"))
      multiplier = 1e12;

    const numericPart = parseFloat(cleaned.replace(/[^\d.]/g, ""));
    return isNaN(numericPart) ? 0 : numericPart * multiplier;
  };

  // Função para somar os investimentos
  const getTotalInvestment = () => {
    return strategicRecommendations.reduce((total, rec) => {
      return total + parseInvestment(rec.investment);
    }, 0);
  };

  // Função para formatar como moeda BRL
  const formatCurrency = (value) => {
    let formatted = "";
    let unidade = "";

    if (value >= 1e12) {
      formatted = (value / 1e12).toFixed(3);
      unidade = "trilhões";
    } else if (value >= 1e9) {
      formatted = (value / 1e9).toFixed(3);
      unidade = "bilhões";
    } else if (value >= 1e6) {
      formatted = (value / 1e6).toFixed(3);
      unidade = "milhões";
    } else if (value >= 1e3) {
      formatted = (value / 1e3).toFixed(3);
      unidade = "mil";
    } else {
      formatted = value.toFixed(2);
      unidade = "";
    }

    return `R$ ${formatted} ${unidade}`.trim();
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
              Baseado em análise de {formatCurrency(getTotalInvestment())} em
              dados orçamentários
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

      {/* Randomize Button */}
      <div className="flex justify-end">
        <button
          onClick={randomizeRecommendations}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-all gap-2"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {randomRecommendations.map((rec) => {
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
