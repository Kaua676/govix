import { useState } from "react";

const FilterPanel = ({ filters, onFiltersChange }) => {
  // Lista de categorias com nome e cor
  const categories = [
    {
      id: "administracao",
      label: "Administração",
      color: "bg-slate-100 text-slate-800",
    },
    {
      id: "agricultura",
      label: "Agricultura",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "assistencia-social",
      label: "Assistência social",
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: "ciencia-tecnologia",
      label: "Ciência e Tecnologia",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "comunicacoes",
      label: "Comunicações",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "comercio-servicos",
      label: "Comércio e serviços",
      color: "bg-yellow-100 text-yellow-800",
    },
    { id: "cultura", label: "Cultura", color: "bg-rose-100 text-rose-800" },
    {
      id: "defesa-nacional",
      label: "Defesa nacional",
      color: "bg-red-100 text-red-800",
    },
    {
      id: "desporto-lazer",
      label: "Desporto e lazer",
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "direitos-cidadania",
      label: "Direitos da cidadania",
      color: "bg-emerald-100 text-emerald-800",
    },
    { id: "educacao", label: "Educação", color: "bg-cyan-100 text-cyan-800" },
    {
      id: "encargos-especiais",
      label: "Encargos especiais",
      color: "bg-gray-100 text-gray-800",
    },
    { id: "energia", label: "Energia", color: "bg-yellow-200 text-yellow-900" },
    {
      id: "gestao-ambiental",
      label: "Gestão ambiental",
      color: "bg-green-200 text-green-900",
    },
    { id: "habitacao", label: "Habitação", color: "bg-blue-200 text-blue-900" },
    {
      id: "industria",
      label: "Indústria",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "multiplo",
      label: "Múltiplo",
      color: "bg-fuchsia-100 text-fuchsia-800",
    },
    {
      id: "organizacao-agraria",
      label: "Organização agrária",
      color: "bg-lime-100 text-lime-800",
    },
    {
      id: "relacoes-exteriores",
      label: "Relações exteriores",
      color: "bg-teal-100 text-teal-800",
    },
    { id: "saneamento", label: "Saneamento", color: "bg-sky-100 text-sky-800" },
    { id: "saude", label: "Saúde", color: "bg-red-200 text-red-900" },
    {
      id: "seguranca-publica",
      label: "Segurança pública",
      color: "bg-yellow-300 text-yellow-900",
    },
    {
      id: "sem-informacao",
      label: "Sem Informação",
      color: "bg-zinc-100 text-zinc-800",
    },
    {
      id: "trabalho",
      label: "Trabalho",
      color: "bg-orange-200 text-orange-900",
    },
    {
      id: "transporte",
      label: "Transporte",
      color: "bg-indigo-200 text-indigo-900",
    },
    {
      id: "urbanismo",
      label: "Urbanismo",
      color: "bg-amber-100 text-amber-800",
    },
  ];

  // Lista de todos os estados do Brasil
  const states = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  const tiposTransferencia = [
    "Constitucionais e Royalties",
    "Legais, Voluntárias e Específicas",
  ];

  const favorecidos = [
    "Administração Pública",
    "Administração Pública Estadual ou do Distrito Federal",
    "Administração Pública Federal",
    "Administração Pública Municipal",
    "Agentes Intermediários",
    "Entidades Empresariais Privadas",
    "Entidades Sem Fins Lucrativos",
    "Fundo Público",
    "Organizações Internacionais",
    "Sem Informação",
  ];

  const orderByOptions = ["Ano", "UF"];
  const groupByOptions = ["Tipo de Favorecido", "Programa Orçamentário"];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedFavorecido, setSelectedFavorecido] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");
  const [selectedGroupBy, setSelectedGroupBy] = useState("");

  function handleCategoryChange(id, isChecked) {
    const updated = isChecked
      ? [...selectedCategories, id]
      : selectedCategories.filter((item) => item !== id);

    setSelectedCategories(updated);
    onFiltersChange({ ...filters, categories: updated });
  }

  function handleStateChange(state, isChecked) {
    const updated = isChecked
      ? [...selectedStates, state]
      : selectedStates.filter((item) => item !== state);

    setSelectedStates(updated);
    onFiltersChange({ ...filters, states: updated });
  }

  function handleTipoChange(value) {
    setSelectedTipo(value);
    onFiltersChange({ ...filters, tipo: value });
  }

  function handleFavorecidoChange(value) {
    setSelectedFavorecido(value);
    onFiltersChange({ ...filters, favorecido: value });
  }

  function handleOrderByChange(value) {
    setSelectedOrderBy(value);
    onFiltersChange({ ...filters, orderBy: value });
  }

  function handleGroupByChange(value) {
    setSelectedGroupBy(value);
    onFiltersChange({ ...filters, groupBy: value });
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedStates([]);
    setSelectedTipo("");
    setSelectedFavorecido("");
    setSelectedOrderBy("");
    setSelectedGroupBy("");

    onFiltersChange({
      period: { start: "0000-00", end: "0000-00" },
      categories: [],
      states: [],
      tipo: "",
      favorecido: "",
      orderBy: "",
      groupBy: "",
    });
  }

  function handleApplyFilters() {}

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg sticky top-32 p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-600 rounded-full" />
          <h2 className="text-lg font-semibold text-slate-800">Filtros</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-slate-500 hover:text-red-500 px-2"
        >
          ×
        </button>
      </div>

      {/* Período */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Período</label>
        <div className="space-y-2">
          {/* Campo de Início */}
          <div className="flex items-center gap-2">
            <label htmlFor="period-start" className="text-sm w-12">
              Início:
            </label>
            <input
              id="period-start"
              type="text"
              placeholder="AAAA-MM"
              value={
                filters.period?.start === "0000-00" ? "" : filters.period.start
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  period: {
                    ...filters.period,
                    start: e.target.value === "" ? "0000-00" : e.target.value,
                  },
                })
              }
              className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Campo de Fim */}
          <div className="flex items-center gap-2">
            <label htmlFor="period-end" className="text-sm w-12">
              Fim:
            </label>
            <input
              id="period-end"
              type="text"
              placeholder="AAAA-MM"
              value={
                filters.period?.end === "0000-00" ? "" : filters.period.end
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  period: {
                    ...filters.period,
                    end: e.target.value === "" ? "0000-00" : e.target.value,
                  },
                })
              }
              className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Categorias */}
      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
        <label className="text-sm font-semibold text-slate-700">
          Categorias
        </label>
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={cat.id}
              checked={selectedCategories.includes(cat.id)}
              onChange={(e) => handleCategoryChange(cat.id, e.target.checked)}
            />
            <label htmlFor={cat.id} className="text-sm cursor-pointer">
              <span className={`inline-block px-2 py-1 rounded ${cat.color}`}>
                {cat.label}
              </span>
            </label>
          </div>
        ))}
      </div>

      <hr className="border-slate-200" />

      {/* Estados */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Estados</label>
        <div className="space-y-2 max-h-44 overflow-y-auto">
          {states.map((estado) => (
            <div key={estado} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={estado}
                checked={selectedStates.includes(estado)}
                onChange={(e) => handleStateChange(estado, e.target.checked)}
              />
              <label htmlFor={estado} className="text-sm cursor-pointer">
                {estado}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Favorecido */}
      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
        <label className="text-sm font-semibold text-slate-700">
          Favorecido
        </label>
        {favorecidos.map((fav) => (
          <div key={fav} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={fav}
              checked={selectedFavorecido.includes(fav)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...selectedFavorecido, fav]
                  : selectedFavorecido.filter((item) => item !== fav);
                setSelectedFavorecido(updated);
                onFiltersChange({ ...filters, favorecido: updated });
              }}
            />
            <label htmlFor={fav} className="text-sm cursor-pointer">
              {fav}
            </label>
          </div>
        ))}
      </div>

      {/* Tipo de Transferência */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Tipo de Transferência
        </label>
        <select
          value={selectedTipo}
          onChange={(e) => handleTipoChange(e.target.value)}
          className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Todos</option>
          {tiposTransferencia.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      {/* Ordenar por */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Ordenar por
        </label>
        <select
          value={selectedOrderBy}
          onChange={(e) => handleOrderByChange(e.target.value)}
          className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Nenhum</option>
          {orderByOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Agrupar por */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Agrupar por
        </label>
        <select
          value={selectedGroupBy}
          onChange={(e) => handleGroupByChange(e.target.value)}
          className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Nenhum</option>
          {groupByOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full bg-indigo-600 text-white rounded px-3 py-2 cursor-pointer"
      >
        Aplicar Filtros
      </button>
      <button
        onClick={clearFilters}
        className="w-full bg-red-600 text-white rounded px-3 py-2 cursor-pointer"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default FilterPanel;
