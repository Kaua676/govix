export async function fetchData(content) {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/filtro_anual",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        })
        
        if (!response.ok) {
            throw new Error(`Erro na requisição ${response.status}`)
        }

        return await response.json

    } catch (error) {
        console.error(`erro ${error.message}`);
        throw error;
    }    
}