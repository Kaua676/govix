# Govix

Radar de Oportunidades Govtech

## 📌 Descrição

**Govix** é uma aplicação web que analisa transferências públicas e fornece insights estratégicos para empresas que atuam no setor **GovTech**. A plataforma integra dados governamentais com visualizações inteligentes, mapa de calor e um painel de recomendações baseadas em IA.

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

### Data Início e Data Fim:
```
"YYYY-MM" (ex: "2022-01")
```

### UF:
```
"str" (ex: "SP")
```

### Função

```
['Administração', 'Agricultura', 'Assistência social', 'Ciência e Tecnologia', 'Comunicações', 'Comércio e serviços', 'Cultura', 'Defesa nacional', 'Desporto e lazer', 'Direitos da cidadania', 'Educação', 'Encargos especiais', 'Energia', 'Gestão ambiental', 'Habitação', 'Indústria', 'Múltiplo', 'Organização agrária', 'Relações exteriores', 'Saneamento', 'Saúde', 'Segurança pública', 'Sem Informação', 'Trabalho', 'Transporte', 'Urbanismo']
```

### Tipo

```
['Constitucionais e Royalties', 'Legais, Voluntárias e Específicas']
```

#### Favorecido
```
['Administração Pública', 'Administração Pública Estadual ou do Distrito Federal', 'Administração Pública Federal', 'Administração Pública Municipal', 'Agentes Intermediários', 'Entidades Empresariais Privadas', 'Entidades Sem Fins Lucrativos', 'Fundo Público', 'Organizações Internacionais', 'Sem Informação']
```

### Programa
```
Verificar ao fazer a consulta com o filtro de função pois existem diversos e são mutáveis.
```

### Order By:
```
"str" (ex: "Ano")
```

### Ascending e Group:
```
["Tipo de Favorecido", "Programa Orçametário"]
```

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

<br/>

<div style="display: flex; gap: 10px;">
  <a href="https://github.com/oppsggbarros">
    <img src="https://github.com/oppsggbarros.png" alt="Gabriel Gravena" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
  <a href="https://github.com/Holiveira090">
    <img src="https://github.com/Holiveira090.png" alt="Henrique Oliveira" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
  <a href="https://github.com/Kaua676">
    <img src="https://github.com/Kaua676.png" alt="Kauã Vicente" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
  <a href="https://github.com/RhyanSKomm">
    <img src="https://github.com/RhyanSKomm.png" alt="Rhyan" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
  <a href="https://github.com/Rodrigo15511">
    <img src="https://github.com/Rodrigo15511.png" alt="Rodrigo Terra" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
  <a href="https://github.com/olszewskioc">
    <img src="https://github.com/olszewskioc.png" alt="Thiago Olszewski" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
  <a href="https://github.com/Willdanthe">
    <img src="https://github.com/Willdanthe.png" alt="Willdanthê Amorim" style="border-radius: 50%; width: 60px; height: 60px; margin: 10%">
  </a>
</div>

---

## 🛠 Ferramentas de Trabalho

### 🔄 Trello
Utilizado para organizar sprints e tarefas.

### 💻 GitHub
Repositório principal:  
[https://github.com/Kaua676/govix](https://github.com/Kaua676/govix)


## 📖 Manual de Uso

Para instruções detalhadas de instalação, navegação e exemplos de requisições da API consulte o arquivo [MANUAL.md](MANUAL.md).

---

## 🙋‍♂️ Autor

Mantido por [Kauã Vicente Domingos].
