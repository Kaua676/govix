import json
from urllib.request import urlopen
from flask import Flask, current_app, redirect
from flask_cors import CORS
import pandas as pd
import os
import glob
from pathlib import Path
import logging
from controllers.data_controller import data_bp
from flasgger import Swagger


logging.basicConfig(level=logging.DEBUG)

RESOURCES_FILES = Path(__file__).parent.parent / "data/recursos_transferidos"
print(f"[DEBUG] RESOURCES_FILES: {RESOURCES_FILES.resolve()}")

app = Flask(__name__)
CORS(app)
Swagger(app)

pd.options.display.float_format = '{:,.2f}'.format
first = True
def load_dataframe():
    try:
        arquivos_csv = glob.glob(os.path.join(RESOURCES_FILES, "*.csv"))
        print(f"[DEBUG] Arquivos CSV encontrados: {arquivos_csv}")

        if not arquivos_csv:
            print("⚠️ Nenhum CSV encontrado!")
            return pd.DataFrame()

        df_completo = pd.concat(
            [pd.read_csv(arquivo, sep=";") for arquivo in arquivos_csv],
            ignore_index=True
        )

        df = df_completo.drop(['Unnamed: 7'], axis=1, errors='ignore')
        df['Data'] = pd.to_datetime(df['Mês/Ano'], format="%m/%Y")
        df['Função'] = df['Função'].str.replace(r'^\d*\w*+\s*-\s*', '', regex=True)
        df["Valor Transferido"] = (
            df["Valor Transferido"]
            .astype(str)
            .str.replace(r"R\$\s*", "", regex=True)
            .str.replace(".", "", regex=False)
            .str.replace(",", ".", regex=False)
            .astype(float)
        )
        df["Programa Orçamentário"] = df["Programa Orçamentário"].str.capitalize()
        df["Programa Orçamentário"] = df["Programa Orçamentário"].replace("Atenção básica em saúde", "Atencao basica em saude")

        return df

    except Exception as e:
        logging.error(f"Erro ao carregar dados: {str(e)}")
        return pd.DataFrame()
    

@app.route("/")
def initial():
    return redirect("/apidocs")

@app.before_request
def startup():
    global first
    if first:
        df = load_dataframe()
        print(f"[DEBUG]✅ DataFrame carregado com {len(df)} linhas")

        with urlopen('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson') as response:
            Brazil = json.load(response)
            print(f"[DEBUG]✅ GeoJSON carregado: {len(Brazil)} linhas")
        
        state_id_map = {}
        for feature in Brazil['features']:
            uf = feature['properties']['sigla']
            feature['id'] = uf
            state_id_map[uf] = feature['properties']['name']


        current_app.config["df"] = df
        current_app.config["brazil_geo"] = Brazil
        first = False

app.register_blueprint(data_bp)

if __name__ == "__main__":
    app.run(debug=True)
