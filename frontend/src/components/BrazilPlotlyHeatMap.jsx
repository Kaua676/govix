import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import api from "../services/api";

const BrazilPlotlyHeatMap = ({filters}) => {
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMapData = async () => {
    setLoading(true);
    const filtersHeat = {...filters, order_by: filters.order_by === "Ano" ? "" : filters.order_by}
      api.post("mapa", filtersHeat)
        .then((response) => {
          const data = response.data
          setPlotData(data);
        })
        .catch((error) => {
          console.log(error)
          setError( error.code == "ERR_NETWORK" ? "Nenhum dado encontrado com os filtros selecionados!" : error.message);
        })
        .finally(() => {
          setLoading(false);
        })
  };

  useEffect(() => {
    fetchMapData();
  }, [filters]);

  if (loading) return <p>Carregando mapa...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!plotData) return <p>Nenhum mapa encontrado</p>;

  return (
    <div className="my-6">
      <Plot
        data={plotData.data}
        layout={plotData.layout}
        frames={plotData.frames}
        config={plotData.config}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
};

export default BrazilPlotlyHeatMap;
