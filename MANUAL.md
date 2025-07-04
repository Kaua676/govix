# Manual de Uso do Govix

Este manual descreve como executar e utilizar a aplicação **Govix**, uma plataforma que analisa dados de transferências públicas para identificar oportunidades de negócio no setor GovTech.

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Python](https://www.python.org/) 3.10 ou superior
- `pip` para instalar dependências Python

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kaua676/govix.git
   cd govix
   ```
2. Configure o backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app/main.py
   ```
   O backend será iniciado em `http://localhost:5000` e a documentação automática via Swagger ficará disponível em `http://localhost:5000/apidocs` com roteamento automático do index para ela.
3. Em outro terminal, configure o frontend:
   ```bash
   cd frontend
   npm install
   # opcional: definir a URL da API
   export VITE_API_URL=http://localhost:5000/api
   npm run dev
   ```
   A interface poderá ser acessada em `http://localhost:5173`.

## Navegando na Aplicação

- **Painel de Filtros** – localizado à esquerda do dashboard, permite escolher período, estados (UF), funções orçamentárias, tipo de transferência e tipo de favorecido. Após definir os filtros clique em **Aplicar Filtros**.
- **Analytics** – exibe gráficos de radar, pizza ou barras com os resultados filtrados e uma tabela com os valores agregados.
- **Mapa de Calor** – mostra a distribuição de investimentos por estado. É possível acompanhar o ranking e a animação por ano.
- **Recomendações** – painel que apresenta sugestões estratégicas pré‑definidas, filtráveis por prioridade.
- **Métricas** – cartões no topo da página que resumem o total investido, estados e funções encontradas e a data da última atualização.

## API

A API do Govix IA fornece quatro rotas principais, todas acessíveis sob `/api`:

- `POST /filtro-mensal` – retorna totais mensais de investimento aplicando os filtros enviados no corpo da requisição.
- `POST /filtro-anual` – agrega os dados por ano com base nos mesmos filtros.
- `POST /filtro-ranking` - Produz o JSON e somatória dos dados por cada função das UFs selecionadas, ordenando e fornencendo uma visualização pré fixada de ranking.
- `POST /mapa` – produz o JSON de um gráfico Plotly com o mapa de calor dos investimentos por estado.

### Exemplo de Payload
```json
{
  "data_inicio": "2023-01",
  "data_fim": "2024-01",
  "uf": ["SP", "RJ"],
  "funcao": ["Saúde"],
  "tipo": ["Constitucionais e Royalties"],
  "favorecido": ["Administração Pública Municipal"],
  "order_by": "Ano",
  "ascending": true,
  "group": ["Programa Orçamentário"]
}
```

A resposta será um array de objetos contendo as colunas agrupadas e o campo `Total Investido`.

## Dicas

- Os arquivos CSV utilizados ficam em `backend/data/recursos_transferidos`. Para atualizar ou adicionar novos anos, coloque os arquivos seguindo o mesmo formato.
- Configure a variável `VITE_API_URL` no frontend caso execute o backend em outra porta ou servidor.
- Utilize a documentação Swagger para explorar todos os parâmetros aceitos pela API.
- Ao tentar filtrar todos os estados com todas as funções pode gerar um travamento na página de barras devido aos agrupamentos, mas ele ainda sim carrega porém é difícil de visualizar as informações estratégicas.

---

Para mais detalhes consulte o [README](README.md).
