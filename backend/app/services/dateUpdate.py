from pathlib import Path
from datetime import datetime

def arquivo_recente():
    """
    Retorna o nome e a data do arquivo mais recentemente modificado
    em um diretório.
    """
    recurso_dir = Path(__file__).resolve().parents[2] / 'data' / 'recursos_transferidos'

    if not recurso_dir.exists():
        raise FileNotFoundError(f"Pasta não encontrada: {recurso_dir}")

    arquivos = [f for f in recurso_dir.iterdir() if f.is_file()]
    
    if not arquivos:
        return None, None, None

    arquivo_mais_recente = max(arquivos, key=lambda f: f.stat().st_mtime)
    nome = arquivo_mais_recente.name

    modificado_timestamp = arquivo_mais_recente.stat().st_mtime
    dt_modificado = datetime.fromtimestamp(modificado_timestamp)

    data_modificada = dt_modificado.strftime('%Y-%m-%d')
    hora_modificacao = dt_modificado.strftime('%H:%M:%S')

    return nome, data_modificada, hora_modificacao