import json
from flask import Blueprint, request, jsonify, current_app, Response
import pandas as pd
import plotly.io as pio
import plotly.graph_objects as go
import plotly.express as px
from services.filter import filtrar_dataframe

pd.options.display.float_format = '{:,.2f}'.format

# Registrar com Blueprint a rota para o Flask
data_bp = Blueprint("data", __name__, url_prefix="/api")

@data_bp.route("/filtro-mensal", methods=["POST"])
def filtro_mensal():
    """
    Retorna o total investido por Mês/Ano, UF e Função.

    ---
    tags:
      - Filtros
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: filtros
        required: true
        description: Filtros para aplicar antes do agrupamento
        schema:
          type: object
          properties:
            data_inicio:
              type: string
              example: "2023-01"
              description: Data inicial no formato YYYY-MM
            data_fim:
              type: string
              example: "2023-12"
              description: Data final no formato YYYY-MM
            uf:
              type: array
              items:
                type: string
              example: ["SP", "RJ"]
              description: Lista de siglas de estados (UFs)
            funcao:
              type: array
              items:
                type: string
              example: ["Educação", "Saúde"]
              description: Lista de funções orçamentárias
            tipo:
              type: array
              items:
                type: string
              example: ["Convênio"]
              description: Tipos de investimento
            programa:
              type: array
              items:
                type: string
              example: ["123456"]
              description: Códigos de programas orçamentários
            favorecido:
              type: array
              items:
                type: string
              example: ["Empresa"]
              description: Tipo de favorecido (Empresa, ONG, etc.)
            order_by:
              type: string
              example: "Total Investido"
              description: Campo usado para ordenar o resultado
            ascending:
              type: string
              example: "false"
              description: Define se a ordenação é ascendente ("true" ou "false")
    responses:
      200:
        description: Lista de totais investidos por mês, estado e função
        schema:
          type: array
          items:
            type: object
            properties:
              Mês/Ano:
                type: string
                example: "01/2023"
              UF:
                type: string
                example: "SP"
              Função:
                type: string
                example: "Educação"
              Total Investido:
                type: number
                example: 1250000.75
      500:
        description: Dados não carregados
        schema:
          type: object
          properties:
            erro:
              type: string
              example: "Dados não carregados"
    """
    df = current_app.config.get("df")
    if df is None or df.empty:
        return jsonify({"erro": "Dados não carregados"}), 500

    params = request.json

    filtros = []

    # Filtro por data
    if params.get("data_inicio"):
        data_inicio = pd.to_datetime(params["data_inicio"], format="%Y-%m")
        filtros.append(df["Data"] >= data_inicio)

    if params.get("data_fim"):
        data_fim = pd.to_datetime(params["data_fim"], format="%Y-%m")
        filtros.append(df["Data"] <= data_fim)

    # UF (OR entre múltiplas UFs)
    if ufs := params.get("uf"):
        filtros.append(df["UF"].isin(ufs))

    if tipos := params.get("tipo"):
        filtros.append(df["Tipo"].isin(tipos))

    if funcoes := params.get("funcao"):
        filtros.append(df["Função"].isin(funcoes))

    if programa := params.get("programa"):
        filtros.append(df["Programa Orçamentário"].isin(programa))

    if favorecido := params.get("favorecido"):
        filtros.append(df["Tipo de Favorecido"].isin(favorecido))
    
    order = params.get("order_by") if params.get("order_by") else "Total Investido"

    ascending = json.loads(params.get("ascending").lower()) if params.get("ascending") else False

    group = ["Mês/Ano", "UF", "Função"]
    if group_by := params.get("group"):
        for g in group_by:
            group.append(g)

    # Combina os filtros com AND
    if filtros:
        filtro_final = filtros[0]
        for f in filtros[1:]:
            filtro_final &= f
        df_filtrado = df[filtro_final]
    else:
        df_filtrado = df.copy()

    # Exemplo de agrupamento final
    resultado = (
        df_filtrado
        .groupby(group)["Valor Transferido"]
        .sum()
        .reset_index()
        .rename(columns={"Valor Transferido": "Total Investido"})
        .sort_values(by=order, ascending=ascending)
    )

    return resultado.to_json(orient="records", force_ascii=False)

@data_bp.route("/filtro_anual", methods=["POST"])
def filtrar_dados():
    """
    Filtrar dados por UF, Função, Tipo e outros parâmetros
    ---
    tags:
      - Filtros
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: filtros
        required: true
        schema:
          type: object
          properties:
            data_inicio:
              type: string
              format: date
              example: "2020-01"
              description: Data de início no formato YYYY-MM
            data_fim:
              type: string
              format: date
              example: "2023-12"
              description: Data de fim no formato YYYY-MM
            uf:
              type: array
              items:
                type: string
              example: ["SP", "RJ"]
            funcao:
              type: array
              items:
                type: string
              example: ["Saúde", "Educação"]
            tipo:
              type: array
              items:
                type: string
              example: ["Constitucionais e Royalties"]
            favorecido:
              type: array
              items:
                type: string
              example: ["Entidades Sem Fins Lucrativos"]
            programa:
              type: array
              items:
                type: string
              example: ["Atencao basica em saude"]
            order_by:
              type: string
              example: "Ano"
            ascending:
              type: boolean
              example: false
            group:
              type: array
              items:
                type: string
              example: ["Tipo de Favorecido", "Programa Orçamentário"]
    responses:
      200:
        description: Lista de dados agregados com base nos filtros aplicados
        schema:
          type: array
          items:
            type: object
            properties:
              Ano:
                type: integer
                example: 2022
              UF:
                type: string
                example: "SP"
              Função:
                type: string
                example: "Saúde"
              Tipo:
                type: string
                example: "Constitucionais e Royalties"
              Tipo de Favorecido:
                type: string
                example: "Entidades Sem Fins Lucrativos"
              Programa Orçamentário:
                type: string
                example: "Atencao basica em saude"
              Total Investido:
                type: number
                format: float
                example: 1250000.75
      500:
        description: Erro ao carregar dados
        schema:
          type: object
          properties:
            erro:
              type: string
              example: "Dados não carregados"
    """

    df = current_app.config.get("df")
    if df is None or df.empty:
        return jsonify({"erro": "Dados não carregados"}), 500

    params = request.json

    filtros = []

    # Filtro por data
    if params.get("data_inicio"):
        data_inicio = pd.to_datetime(params["data_inicio"], format="%Y-%m")
        filtros.append(df["Data"] >= data_inicio)

    if params.get("data_fim"):
        data_fim = pd.to_datetime(params["data_fim"], format="%Y-%m")
        filtros.append(df["Data"] <= data_fim)

    # UF (OR entre múltiplas UFs)
    if ufs := params.get("uf"):
        filtros.append(df["UF"].isin(ufs))

    if tipos := params.get("tipo"):
        filtros.append(df["Tipo"].isin(tipos))

    if funcoes := params.get("funcao"):
        filtros.append(df["Função"].isin(funcoes))

    if programa := params.get("programa"):
        filtros.append(df["Programa Orçamentário"].isin(programa))

    if favorecido := params.get("favorecido"):
        filtros.append(df["Tipo de Favorecido"].isin(favorecido))
    
    order = params.get("order_by") if params.get("order_by") else "Total Investido"

    ascending = json.loads(params.get("ascending").lower()) if params.get("ascending") else False

    group = ["Ano", "UF", "Função"]
    if group_by := params.get("group"):
        for g in group_by:
            group.append(g)

    # Combina os filtros com AND
    if filtros:
        filtro_final = filtros[0]
        for f in filtros[1:]:
            filtro_final &= f
        df_filtrado = df[filtro_final]
    else:
        df_filtrado = df.copy()

    # Exemplo de agrupamento final
    df_filtrado["Ano"] = df_filtrado["Data"].dt.year
    resultado = (
        df_filtrado
        .groupby(group)["Valor Transferido"]
        .sum()
        .reset_index()
        .rename(columns={"Valor Transferido": "Total Investido"})
        .sort_values(by=order, ascending=ascending)
    )

    return resultado.to_json(orient="records", force_ascii=False)

@data_bp.route("/mapa", methods=["POST"])
def mapa_funcao_ano():
  """
      Gera o gráfico de investimento por estado
      ---
      tags:
      - Mapas
      summary: Mapa de calor por UF
      description: Retorna o JSON de um gráfico Plotly do investimento por estado filtrando por ano e função.
      parameters:
        - in: body
          name: payload
          required: true
          schema:
            type: object
            properties:
              data_inicio:
                type: string
                example: 2020-01
              data_fim:
                type: string
                example: 2025-12
              funcoes:
                type: array
                items:
                  type: string
                example: ["Saúde"]
      responses:
        200:
          description: JSON com gráfico Plotly
        400:
          description: Parâmetros inválidos
        500:
          description: Dados não carregados
      """
  df = current_app.config.get("df")
  if df is None or df.empty:
      return jsonify({"erro": "Dados não carregados"}), 500
  
  brazil_geo = current_app.config.get("brazil_geo")
  if brazil_geo is None or not brazil_geo:
      return jsonify({"erro": "Dados Geo não carregados"}), 500

  params = request.json

  if not params.get("data_inicio") or not params.get("data_fim") or not params.get("funcoes"):
    return jsonify({"erro": "Parâmetros 'data_inicio', 'data_fim' e 'funcoes' são obrigatórios."}), 400

# Agora pode converter com segurança
  data_inicio = pd.to_datetime(params["data_inicio"], format="%Y-%m")
  data_fim = pd.to_datetime(params["data_fim"], format="%Y-%m")
  funcoes = params.get("funcoes")
  
  map_params = {
    "data_inicio": data_inicio,
    "data_fim": data_fim,
    "uf": [],
    "tipo": [],
    "funcao": funcoes,
    "favorecido": [],
    "programa": [],
    "order_by": "Ano",
    "ascending": "true",
    "group": []
  }
  
  df_filtrado = filtrar_dataframe(df, map_params)

  resultado_pivot = df_filtrado.pivot_table(
            index=["UF", "Ano"],
            columns="Função",
            values="Total Investido",
            aggfunc="sum",
            fill_value=0
        ).reset_index()
          
  # Adicionar coluna com total geral
  resultado_pivot["Total Investido"] = resultado_pivot[funcoes].sum(axis=1)

  # Garantir que todas as funções existam como colunas (mesmo que vazias)
  for func in funcoes:
    if func not in resultado_pivot.columns:
      resultado_pivot[func] = 0
      
  def formatar_valor(valor):
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

  def gerar_hover_text(df, funcoes):
      textos = []
      for i, row in df.iterrows():
          bloco_funcoes = "<br>".join([
              f"{func}: {formatar_valor(row.get(func, 0))}" for func in funcoes
          ])
          texto = (
              f"UF: {row['UF']}<br>"
              f"Total Investido: {formatar_valor(row['Total Investido'])}"
              "<br>--------<br>" +
              bloco_funcoes
          )
          textos.append(texto)
      return textos

  # Adiciona a coluna text com hover customizado
  resultado_pivot["text"] = gerar_hover_text(resultado_pivot, funcoes)

  hover_dict = {col: ":,.2f" for col in ["Total Investido"] + funcoes}
  hover_dict["Ano"] = False
  hover_dict["UF"] = False

  fig = px.choropleth(
      resultado_pivot,
      geojson=brazil_geo,
      locations="UF",
      locationmode="geojson-id",
      color="Total Investido",
      animation_frame="Ano",
      hover_name="UF",
      hover_data={},
      color_continuous_scale=[
          [0.0, "#22C55E"],
          [0.25, "#EAB308"],
          [0.5, "#F97316"],
          [1.0, "#DC2626"]
      ]
  )
  
  fig.data[0].text = resultado_pivot["text"]
  fig.update_traces(hovertemplate="%{text}<extra></extra>")
  
  for frame in fig.frames:
    # Acha o ano atual do frame
    ano_frame = int(frame.name)

    # Filtra os dados daquele ano
    df_ano = resultado_pivot[resultado_pivot["Ano"] == ano_frame].reset_index(drop=True)

    # Atualiza o text no traço do frame
    frame.data[0].text = df_ano["text"]
    frame.data[0].hovertemplate = "%{text}<extra></extra>"
  
  fig.update_geos(
      fitbounds="locations",
      visible=False
  )

  fig.update_layout(
      title="Investimentos por Estado (Total e por Função)",
      margin={"r":0, "t":40, "l":0, "b":0}
  )
  
  fig.layout.updatemenus[0].buttons[0].args[1]['frame']['duration'] = 2000

  # fig.show()

  return pio.to_json(fig)