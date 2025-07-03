import { useEffect, useState } from "react";
import api from "../services/api";

const formatCurrency = (value) => {
  if (!value || isNaN(value)) return "R$ 0";
  if (value >= 1e12) return `R$ ${(value / 1e12).toFixed(1)} tri`;
  if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(1)} bi`;
  if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(1)} mi`;
  return `R$ ${value.toFixed(0)}`;
};

const RegionalMetrics = ({ filters }) => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErro(null);
    const filtersHeat = {...filters, order_by: filters.order_by === "Ano" ? "" : filters.order_by}

    api
      .post("/filtro-mensal", filtersHeat)
      .then((res) => {
        const array = Array.isArray(res.data) ? res.data : [res.data];
        setDados(array);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados regionais:", err);
        setErro("Erro ao buscar métricas");
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const calcularMetricas = () => {
    if (!dados.length) return { lider: {}, media: {}, estabilidade: {} };

    const agrupado = {};

    dados.forEach(({ UF, "Mês/Ano": mes, "Total Investido": total }) => {
      if (!UF || !mes || total == null) return;

      agrupado[UF] ??= {};
      agrupado[UF][mes] = (agrupado[UF][mes] || 0) + total;
    });

    const valoresTotais = {};
    const valoresMedios = {};
    const desvios = {};

    for (const uf in agrupado) {
      const periodos = Object.keys(agrupado[uf]);
      const valores = Object.values(agrupado[uf]);

      const total = valores.reduce((a, b) => a + b, 0);
      const media = total / periodos.length;

      let desvio = null;
      if (periodos.length > 1) {
        const variancia =
          valores.reduce((acc, v) => acc + Math.pow(v - media, 2), 0) /
          valores.length;
        desvio = Math.sqrt(variancia);
      }

      valoresTotais[uf] = total;
      valoresMedios[uf] = media;
      if (desvio !== null) desvios[uf] = desvio;
    }

    const lider = Object.entries(valoresTotais).reduce(
      (acc, [uf, valor]) => (valor > acc.valor ? { nome: uf, valor } : acc),
      { nome: "", valor: 0 }
    );

    const media = Object.entries(valoresMedios).reduce(
      (acc, [uf, valor]) => (valor > acc.valor ? { nome: uf, valor } : acc),
      { nome: "", valor: 0 }
    );

    const estabilidade = Object.entries(desvios).length
      ? Object.entries(desvios).reduce(
          (acc, [uf, valor]) => (valor < acc.valor ? { nome: uf, valor } : acc),
          { nome: "", valor: Infinity }
        )
      : { nome: "-", valor: null };

    return { lider, media, estabilidade };
  };

  const { lider, media, estabilidade } = calcularMetricas();

  if (loading)
    return <p className="text-sm text-slate-600">Carregando métricas...</p>;
  if (erro) return <p className="text-sm text-red-600">{erro}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Estado Líder */}
      <div
        className="text-white p-4 rounded-lg"
        style={{ backgroundColor: "#D34AF4" }}
      >
        <div className="text-sm opacity-90">Estado Líder</div>
        <div className="text-2xl font-bold">{lider.nome || "-"}</div>
        <div className="text-sm opacity-90">
          {formatCurrency(lider.valor || 0)}
        </div>
        <div className="text-xs mt-1 opacity-80">
          UF que mais recebeu investimento no período selecionado.
        </div>
      </div>

      {/* Maior Aporte Médio por Mês */}
      <div
        className="text-white p-4 rounded-lg"
        style={{ backgroundColor: "#0BC0D3" }}
      >
        <div className="text-sm opacity-90">Maior Aporte Médio</div>
        <div className="text-2xl font-bold">{media.nome || "-"}</div>
        <div className="text-sm opacity-90">
          {formatCurrency(media.valor || 0)} /mês
        </div>
        <div className="text-xs mt-1 opacity-80">
          UF que mais recebeu, em média, por mês no período analisado.
        </div>
      </div>

      {/* Estado Mais Estável */}
      <div
        className="text-white p-4 rounded-lg"
        style={{ backgroundColor: "#FC671D" }}
      >
        <div className="text-sm opacity-90">Estado Mais Estável</div>
        <div className="text-2xl font-bold">{estabilidade.nome || "-"}</div>
        <div className="text-sm opacity-90">
          {estabilidade.valor != null
            ? `± ${formatCurrency(estabilidade.valor)}`
            : "N/A"}
        </div>
        <div className="text-xs mt-1 opacity-80">
          {estabilidade.valor != null
            ? "UF com distribuição de investimento mais constante ao longo dos meses."
            : "É necessário mais de um mês para calcular a estabilidade."}
        </div>
      </div>
    </div>
  );
};

export default RegionalMetrics;
