import { useState } from "react";

const FilterPanel = ({ filters, onFiltersChange }) => {
  const categories = [
    { id: "saude", label: "Saúde", color: "bg-red-100 text-red-800" },
    { id: "educacao", label: "Educação", color: "bg-blue-100 text-blue-800" },
    {
      id: "seguranca",
      label: "Segurança",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "infraestrutura",
      label: "Infraestrutura",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "tecnologia",
      label: "Tecnologia",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "meio-ambiente",
      label: "Meio Ambiente",
      color: "bg-emerald-100 text-emerald-800",
    },
  ];

  const states = [
    "São Paulo",
    "Rio de Janeiro",
    "Minas Gerais",
    "Bahia",
    "Paraná",
    "Rio Grande do Sul",
    "Pernambuco",
    "Ceará",
    "Pará",
    "Santa Catarina",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);

  const handleCategoryChange = (categoryId, checked) => {
    const updated = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(updated);
    onFiltersChange({ ...filters, categories: updated });
  };

  const handleStateChange = (state, checked) => {
    const updated = checked
      ? [...selectedStates, state]
      : selectedStates.filter((s) => s !== state);
    setSelectedStates(updated);
    onFiltersChange({ ...filters, states: updated });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStates([]);
    onFiltersChange({
      period: { start: "2024-01-01", end: "2024-12-31" },
      categories: [],
      states: [],
      minValue: 0,
      maxValue: 1000000000,
    });
  };

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
          <input
            type="date"
            value={filters.period.start}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                period: { ...filters.period, start: e.target.value },
              })
            }
            className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
          <input
            type="date"
            value={filters.period.end}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                period: { ...filters.period, end: e.target.value },
              })
            }
            className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Categorias */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">
          Categorias
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={(e) =>
                  handleCategoryChange(category.id, e.target.checked)
                }
              />
              <label htmlFor={category.id} className="text-sm cursor-pointer">
                <span
                  className={`inline-block px-2 py-1 rounded ${category.color}`}
                >
                  {category.label}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Estados */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">
          Estados (Top 10)
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {states.map((state) => (
            <div key={state} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={state}
                checked={selectedStates.includes(state)}
                onChange={(e) => handleStateChange(state, e.target.checked)}
              />
              <label htmlFor={state} className="text-sm cursor-pointer">
                {state}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Valor */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">
          Valor (R$)
        </label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Valor mínimo"
            value={filters.minValue}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                minValue: Number(e.target.value),
              })
            }
            className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="Valor máximo"
            value={filters.maxValue}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxValue: Number(e.target.value),
              })
            }
            className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
