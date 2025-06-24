# Govix IA

Radar de Oportunidades Govtech

## 📌 Descrição

**Govix IA** é uma aplicação web que analisa transferências públicas e fornece insights estratégicos para empresas que atuam no setor **GovTech**. A plataforma integra dados governamentais com visualizações inteligentes, mapa de calor e um painel de recomendações baseadas em IA.

---

## 🚀 Funcionalidades

- API de dados com filtros por período, UF, função, tipo de favorecido e programa.
- Dashboard interativo com gráficos de tendência, radar e distribuição.
- Mapa de calor dos estados com ranking por investimentos.
- Painel de recomendações com sugestões e indicadores de confiança.
- Cartões de métricas com resumos de investimentos e oportunidades.

---

## 🧪 Tecnologias Utilizadas

- **Backend:** Python 3, Flask, Pandas, Flasgger, Flask-CORS
- **Frontend:** React, Vite, React Chart.js 2, Chart.js, Lucide React, TailwindCSS (via CDN)
- **Outras libs:** React Query, ESLint

---

## 📂 Estrutura de Pastas

```
govix-project/
├── backend/           # API Flask e dados CSV
├── frontend/          # Aplicação React com Vite
└── node_modules/      # Dependências do projeto
```

---

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) v3.10+
- `pip` instalado

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/Kaua676/govix.git
cd govix-project

# Backend
cd backend
pip install -r requirements.txt
python app/main.py

# Frontend (em outro terminal)
cd ../frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador. A documentação da API estará disponível em `http://localhost:5000/apidocs`.

---

## 🔗 Endpoints Principais

- `POST /api/filtro_anual` – Aplica filtros sobre os dados de transferências públicas e retorna agregações.

### Exemplo de payload:
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

---

## 📘 Valores de Filtros

### UF
`["SP", "RJ", "MG", ...]`

### Função
`["Educação", "Saúde", "Segurança pública", "Agricultura", ...]`

### Tipo
`["Constitucionais e Royalties", "Legais, Voluntárias e Específicas"]`

### Favorecido
`["Administração Pública", "Entidades Empresariais Privadas", "Fundo Público", ...]`

### Programa
> Os programas variam conforme a função selecionada. Consulte via API.

### Agrupamento
`["Tipo de Favorecido", "Programa Orçamentário"]`

---

## 👥 Equipe do Projeto

| Nome                              | Função            |
|-----------------------------------|-------------------|
| Gabriel Gravena Barros            | Desenvolvimento   |
| Henrique Oliveira Silva           | Desenvolvimento   |
| Kauã Vicente Domingos             | Design            |
| Rhyan Santiago Komm               | Desenvolvimento   |
| Rodrigo Terra Costa               | Produto           |
| Thiago Olszewski                  | Desenvolvimento   |
| Willdanthê Amorim Alaman          | Produto           |

---

## 🛠 Ferramentas de Trabalho

### 🔄 Trello
Utilizado para organizar sprints e tarefas.

### 💻 GitHub
Repositório principal:  
[https://github.com/Kaua676/govix](https://github.com/Kaua676/govix)

---

## 🙋‍♂️ Autor

Mantido por [Kauã Vicente Domingos].
