import json
import pandas as pd

pd.options.display.float_format = '{:,.2f}'.format

def filtrar_dataframe(df):

    params = {
        "data_inicio": "2018-01",
        "data_fim": "2025-12",
        "uf": [],
        "tipo": [],
        "funcao": [],
        "favorecido": [],
        "programa": [],
        "order_by": "Ano",
        "ascending": "true",
        "group": []
    }

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

    group = ["Ano", "UF", "Função", "Tipo"]
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

    return resultado