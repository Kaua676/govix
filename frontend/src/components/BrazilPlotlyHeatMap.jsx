import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const BrazilPlotlyHeatMap = () => {
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMapData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/mapa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data_inicio: "2020-01",
          data_fim: "2025-12",
          funcoes: ["Saúde"]
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar mapa");
      }

      const jsonData = await response.json();
      setPlotData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  if (loading) return <p>Carregando mapa...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!plotData) return null;

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
