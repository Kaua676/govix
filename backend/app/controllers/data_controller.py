import json
from flask import Blueprint, request, jsonify, current_app
import pandas as pd
import plotly.io as pio
import plotly.graph_objects as go
from services.filter import filtrar_dataframe

pd.options.display.float_format = '{:,.2f}'.format

# Registrar com Blueprint a rota para o Flask
data_bp = Blueprint("data", __name__, url_prefix="/api")

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
    
    print(group)


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

    print(resultado)

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
              ano:
                type: integer
                example: 2020
              funcao:
                type: string
                example: Saúde
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

  ano = params.get("ano")
  funcao = params.get("funcao")

  if not ano or not funcao:
    return jsonify({"erro": "Parâmetros 'ano' e 'funcao' são obrigatórios."}), 400
  
  df_filtrado = filtrar_dataframe(df)

  df_filtrado = df_filtrado[(df_filtrado["Ano"] == int(ano)) & (df_filtrado["Função"] == funcao)]
  fig = go.Figure(go.Choropleth(
      geojson=brazil_geo,
      locations=df_filtrado["UF"],
      z=df_filtrado["Total Investido"],
      locationmode="geojson-id",
      colorscale=[
          [0.0, "#22C55E"],
          [0.25, "#EAB308"],
          [0.5, "#F97316"],
          [1.0, "#DC2626"]
      ],
      colorbar_title="Investimento (R$)",
      text=[
          f"UF: {uf}<br>Total: R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
          for uf, valor in zip(df_filtrado["UF"], df_filtrado["Total Investido"])
      ],
      hovertemplate="%{text}<extra></extra>"
  ))

  fig.update_geos(
      fitbounds="locations",
      visible=False
  )

  fig.update_layout(
      title=f"Investimentos por Estado ({int(ano)} - {funcao})",
      margin={"r":0,"t":40,"l":0,"b":0}
  )

  fig.show()

  return pio.to_json(fig)