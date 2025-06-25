export async function fetchData(RawPayload) {
    const payload = normalizePayload(RawPayload);
    try {
        
        console.log(payload)
        const response = await fetch("http://localhost:5000/api/filtro_anual",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Erro na requisição ${response.status}`)
        }

        return await response.json()

    } catch (error) {
        console.error(`erro ${error.message}`);
        throw error;
    }    
}

function normalizePayload(filters) {
  const payload = {
    ascending: filters.ascending ?? false,
    data_fim: filters.period?.end || "",
    data_inicio: filters.period?.start || "",
    order_by: filters.orderBy || "Ano",
  };

  if (Array.isArray(filters.favorecido) && filters.favorecido.length > 0) {
    payload.favorecido = filters.favorecido;
  }
  if (Array.isArray(filters.categories) && filters.categories.length > 0) {
    payload.funcao = filters.categories;
  }
  if (Array.isArray(filters.groupBy) && filters.groupBy.length > 0) {
    payload.group = filters.groupBy;
  }
  if (Array.isArray(filters.programa) && filters.programa.length > 0) {
    payload.programa = filters.programa;
  }
  if (Array.isArray(filters.tipo) && filters.tipo.length > 0) {
    payload.tipo = filters.tipo;
  }
  if (Array.isArray(filters.states) && filters.states.length > 0) {
    payload.uf = filters.states;
  }

  return payload;
}
