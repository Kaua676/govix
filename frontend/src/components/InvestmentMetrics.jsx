import { useEffect, useState } from "react";
import api from "../services/api";

const InvestmentMetrics = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatCurrencyAbreviado = (value) => {
    if (!value || isNaN(value)) return "R$ 0";
    if (value >= 1_000_000_000_000)
      return `R$ ${(value / 1_000_000_000_000).toFixed(1)} tri`;
    if (value >= 1_000_000_000)
      return `R$ ${(value / 1_000_000_000).toFixed(1)} bi`;
    if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)} mi`;
    if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1)} mil`;
    return `R$ ${value.toFixed(0)}`;
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const filtrosSemOrdenacaoAgrupamento = { ...filters };
    delete filtrosSemOrdenacaoAgrupamento.order_by;
    delete filtrosSemOrdenacaoAgrupamento.group_by;

    api
      .post("/filtro-mensal", filtrosSemOrdenacaoAgrupamento)
      .then((response) => {
        const array = Array.isArray(response.data)
          ? response.data
          : [response.data];
        if (array.length === 0) {
          setError("Nenhum dado encontrado");
        } else {
          setData(array);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados");
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const agruparPorFuncao = (dados) => {
    const soma = {};
    dados.forEach(({ Função, "Total Investido": total }) => {
      if (!Função || total == null) return;
      soma[Função] = (soma[Função] || 0) + total;
    });
    return soma;
  };

  const calcularMetricas = () => {
    if (!data.length) return { lider: {}, crescimento: {}, projecao: {} };

    const porFuncao = agruparPorFuncao(data);
    const categoriaLider = Object.entries(porFuncao).reduce(
      (max, [funcao, valor]) =>
        valor > max.valor ? { nome: funcao, valor } : max,
      { nome: "", valor: 0 }
    );

    const agrupadoPorMes = {};
    data.forEach((item) => {
      const mesOuAno = item["Mês/Ano"] || item["Ano"];
      const funcao = item["Função"];
      const total = item["Total Investido"];

      if (!mesOuAno || !funcao || total == null) return;

      agrupadoPorMes[mesOuAno] ??= {};
      agrupadoPorMes[mesOuAno][funcao] =
        (agrupadoPorMes[mesOuAno][funcao] || 0) + total;
    });

    const mesesOrdenados = Object.keys(agrupadoPorMes).sort();
    if (mesesOrdenados.length < 2) return { lider: categoriaLider };

    const ultimo = agrupadoPorMes[mesesOrdenados[mesesOrdenados.length - 1]];
    const penultimo = agrupadoPorMes[mesesOrdenados[mesesOrdenados.length - 2]];

    let maiorCrescimento = { nome: "", taxa: -Infinity };
    for (const funcao in ultimo) {
      if (penultimo[funcao]) {
        const taxa =
          ((ultimo[funcao] - penultimo[funcao]) / penultimo[funcao]) * 100;
        if (taxa > maiorCrescimento.taxa) {
          maiorCrescimento = { nome: funcao, taxa };
        }
      }
    }

    const ultimosMeses = mesesOrdenados.slice(-4);
    let maiorProjecao = { nome: "", media: -Infinity };
    const crescimentosPorFuncao = {};

    for (let i = 1; i < ultimosMeses.length; i++) {
      const atual = agrupadoPorMes[ultimosMeses[i]];
      const anterior = agrupadoPorMes[ultimosMeses[i - 1]];
      if (!atual || !anterior) continue;
      for (const funcao in atual) {
        if (!anterior[funcao]) continue;
        const taxa =
          ((atual[funcao] - anterior[funcao]) / anterior[funcao]) * 100;
        (crescimentosPorFuncao[funcao] ||= []).push(taxa);
      }
    }

    for (const funcao in crescimentosPorFuncao) {
      const lista = crescimentosPorFuncao[funcao];
      const media = lista.reduce((a, b) => a + b, 0) / lista.length;
      if (media > maiorProjecao.media) {
        maiorProjecao = { nome: funcao, media };
      }
    }

    return {
      lider: categoriaLider,
      crescimento: maiorCrescimento,
      projecao: maiorProjecao,
    };
  };

  const { lider, crescimento, projecao } = calcularMetricas();

  if (loading)
    return <p className="text-sm text-slate-600">Carregando métricas...</p>;
  if (error) return <p className="text-sm text-red-600">Erro: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className="text-white p-4 rounded-lg"
        style={{ backgroundColor: "#0BC0D3" }}
      >
        <div className="text-sm opacity-90">Função com Maior Investimento</div>
        <div className="text-2xl font-bold">{lider.nome || "-"}</div>
        <div className="text-sm opacity-90">
          {formatCurrencyAbreviado(lider.valor || 0)}
        </div>
      </div>

      <div
        className="text-white p-4 rounded-lg"
        style={{ backgroundColor: "#D34AF4" }}
      >
        <div className="text-sm opacity-90">
          Maior Crescimento no Último Mês
        </div>
        <div className="text-2xl font-bold">{crescimento.nome || "-"}</div>
        <div className="text-sm opacity-90">
          +{(crescimento.taxa ?? 0).toFixed(1)}%
        </div>
      </div>

      <div
        className="text-white p-4 rounded-lg"
        style={{ backgroundColor: "#FC671D" }}
      >
        <div className="text-sm opacity-90">Tendência de Crescimento</div>
        <div className="text-2xl font-bold">{projecao.nome || "-"}</div>
        <div className="text-sm opacity-90">
          +{(projecao.media ?? 0).toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default InvestmentMetrics;
