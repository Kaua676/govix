import { useEffect, useState } from "react";

const useMapData = (params) => {
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMapData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/mapa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
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

    fetchMapData();
  }, [params]);

  return { plotData, loading, error };
};

export default useMapData;
