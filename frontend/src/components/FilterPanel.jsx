import { useState } from "react";

const FilterPanel = ({ filters, onFiltersChange }) => {
  // Lista de categorias com nome e cor
  const categories = [
    { id: "Administração", label: "Administração", color: "bg-[#2563eb] text-white" },
    { id: "Agricultura", label: "Agricultura", color: "bg-[#16a34a] text-white" },
    { id: "Assistência social", label: "Assistência social", color: "bg-[#ec4899] text-white" },
    { id: "Ciência e Tecnologia", label: "Ciência e Tecnologia", color: "bg-[#8b5cf6] text-white" },
    { id: "Comunicações", label: "Comunicações", color: "bg-[#0ea5e9] text-white" },
    { id: "Comércio e serviços", label: "Comércio e serviços", color: "bg-[#f97316] text-white" },
    { id: "Cultura", label: "Cultura", color: "bg-[#e11d48] text-white" },
    { id: "Defesa nacional", label: "Defesa nacional", color: "bg-[#7c3aed] text-white" },
    { id: "Desporto e lazer", label: "Desporto e lazer", color: "bg-[#22c55e] text-white" },
    { id: "Direitos da cidadania", label: "Direitos da cidadania", color: "bg-[#f43f5e] text-white" },
    { id: "Educação", label: "Educação", color: "bg-[#3b82f6] text-white" },
    { id: "Encargos especiais", label: "Encargos especiais", color: "bg-[#a855f7] text-white" },
    { id: "Energia", label: "Energia", color: "bg-[#facc15] text-black" },
    { id: "Gestão ambiental", label: "Gestão ambiental", color: "bg-[#10b981] text-white" },
    { id: "Habitação", label: "Habitação", color: "bg-[#06b6d4] text-white" },
    { id: "Indústria", label: "Indústria", color: "bg-[#f87171] text-black" },
    { id: "Múltiplo", label: "Múltiplo", color: "bg-[#818cf8] text-white" },
    { id: "Organização agrária", label: "Organização agrária", color: "bg-[#65a30d] text-white" },
    { id: "Relações exteriores", label: "Relações exteriores", color: "bg-[#4f46e5] text-white" },
    { id: "Saneamento", label: "Saneamento", color: "bg-[#2dd4bf] text-black" },
    { id: "Saúde", label: "Saúde", color: "bg-[#ef4444] text-white" },
    { id: "Segurança pública", label: "Segurança pública", color: "bg-[#eab308] text-black" },
    { id: "Sem Informação", label: "Sem Informação", color: "bg-[#9ca3af] text-black" },
    { id: "Trabalho", label: "Trabalho", color: "bg-[#db2777] text-white" },
    { id: "Transporte", label: "Transporte", color: "bg-[#fb923c] text-black" },
    { id: "Urbanismo", label: "Urbanismo", color: "bg-[#3f6212] text-white" },
  ];


  // Lista de todos os estados do Brasil
  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
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
  const [localPeriodStart, setLocalPeriodStart] = useState(
    filters.data_inicio || "",
  );
  const [localPeriodEnd, setLocalPeriodEnd] = useState(
    filters.data_fim || "",
  );
  const [selectedCategories, setSelectedCategories] = useState(
    filters.funcao || [],
  );
  const [selectedStates, setSelectedStates] = useState(filters.uf || []);
  const [selectedTipo, setSelectedTipo] = useState(filters.tipo || "");
  const [selectedFavorecido, setSelectedFavorecido] = useState(
    filters.favorecido || "",
  );
  const [selectedOrderBy, setSelectedOrderBy] = useState(filters.order || "");
  const [selectedGroupBy, setSelectedGroupBy] = useState(filters.group || "");
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;

  const handleClick = () => {
    if (handleChangeDataFim(localPeriodEnd) !== true) {
      alert("Data fim inválida!\nModelo: YYYY-MM");
      return;
    }
    if (handleChangeDataInicio(localPeriodStart) !== true) {
      alert("Data início inválida\nModelo: YYYY-MM");
      return;
    }
    handleApplyFilters();
  };

  const handleChangeDataFim = (value) => {
    if (regex.test(value)) {
      setLocalPeriodEnd(value);
      return true;
    } else {
      return false;
    }
  };
  const handleChangeDataInicio = (value) => {
    if (regex.test(value)) {
      setLocalPeriodStart(value);
      return true;
    } else {
      return false;
    }
  };

  function handleCategoryChange(id, isChecked) {
    const updated = isChecked
      ? [...selectedCategories, id]
      : selectedCategories.filter((item) => item !== id);

    setSelectedCategories(updated);
  }

  function handleStateChange(state, isChecked) {
    const updated = isChecked
      ? [...selectedStates, state]
      : selectedStates.filter((item) => item !== state);

    setSelectedStates(updated);
  }

  function handleTipoChange(value) {
    setSelectedTipo(value);
  }

  function handleFavorecidoChange(value) {
    setSelectedFavorecido(value);
  }

  function handleOrderByChange(value) {
    setSelectedOrderBy(value);
  }

  function handleGroupByChange(value) {
    setSelectedGroupBy(value);
  }

  function clearFilters() {
    setLocalPeriodStart("2018-01");
    setLocalPeriodEnd("2018-12");
    setSelectedCategories([]);
    setSelectedStates([""]);
    setSelectedTipo("");
    setSelectedFavorecido([]);
    setSelectedOrderBy("");
    setSelectedGroupBy("");
    onFiltersChange({
      ascending: "true",
      data_fim: "2018-12",
      data_inicio: "2018-01",
      favorecido: [],
      funcao: [],
      group: [],
      order_by: "",
      programa: [],
      tipo: [],
      uf: [],
    });
  }

  function handleApplyFilters() {
    onFiltersChange({
      ascending: "true",
      data_fim: localPeriodEnd,
      data_inicio: localPeriodStart,
      favorecido: selectedFavorecido,
      funcao: selectedCategories,
      group: selectedGroupBy,
      order_by: selectedOrderBy,
      programa: [],
      tipo: selectedTipo,
      uf: selectedStates,
    });
  }
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
              value={localPeriodStart === "0000-00" ? "" : localPeriodStart}
              onChange={(e) => setLocalPeriodStart(e.target.value)}
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
              value={localPeriodEnd === "0000-00" ? "" : localPeriodEnd}
              onChange={(e) => setLocalPeriodEnd(e.target.value)}
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
              onChange={(e) =>
                handleCategoryChange(cat.id, e.target.checked)}
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
                onChange={(e) =>
                  handleStateChange(estado, e.target.checked)}
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
                  : selectedFavorecido.filter((item) =>
                    item !== fav
                  );
                setSelectedFavorecido(updated);
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
        onClick={(e) => handleClick(e)}
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
