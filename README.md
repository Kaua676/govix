# Documentação do Projeto Govix

-----

## Visão Geral do Projeto

Este documento é o recurso central para todos os membros da equipe e partes interessadas do projeto **Govix**. Aqui você encontra informações essenciais sobre nossa equipe, o progresso do trabalho e o acesso aos repositórios de código.

O **Govix** tem como objetivo desenvolver uma **aplicação web inovadora para a Digix**. Nosso principal desafio é capacitar a Digix a identificar os setores de maior investimento governamental, permitindo o desenvolvimento dos produtos certos no momento certo.

-----

## Equipe do Projeto

Conheça os talentos por trás do projeto Govix:

  * **Gabriel Gravena Barros:** Desenvolvimento
  * **Henrique Oliveira Silva:** Desenvolvimento
  * **Kauã Vicente Domingos:** Design
  * **Rhyan Santiago Komm:** Desenvolvimento
  * **Rodrigo Terra Costa:** Produto
  * **Thiago Carassini Teodoro Alves:** Desenvolvimento
  * **Willdanthê Amorim Alaman:** Produto

-----

## Recursos e Ferramentas

Utilizamos as seguintes plataformas para gerenciar nosso projeto e versionar o código:

### Trello

Nosso quadro no Trello é o coração do nosso gerenciamento de tarefas, acompanhamento do progresso e organização dos sprints.

  * **Link do Trello:** [link suspeito removido]

### GitHub

Todos os códigos-fonte do projeto são versionados e armazenados em nossos repositórios no GitHub, garantindo controle e colaboração.

  * **Link do Repositório Principal do GitHub:** [https://github.com/Kaua676/govix](https://github.com/Kaua676/govix)

### Funções

Para utilizar os filtros deve seguir essa estrutura de filtros:

```json
{
    "data_inicio": "YYYY-MM",
    "data_fim": "YYYY-MM",
    "uf": ["str"],
    "funcao": ["str"],
    "tipo": ["str"],
    "favorecido": ["str"],
    "order_by": "str",
    "ascending": bool,
    "group": ["str"]
}
```

#### Valores possíveis para os parâmetros de filtro:

##### Data Início e Data Fim:
```
"YYYY-MM" (ex: "2022-01")
```

##### UF:
```
"str" (ex: "SP")
```

#### Função

```
['Administração', 'Agricultura', 'Assistência social', 'Ciência e Tecnologia', 'Comunicações', 'Comércio e serviços', 'Cultura', 'Defesa nacional', 'Desporto e lazer', 'Direitos da cidadania', 'Educação', 'Encargos especiais', 'Energia', 'Gestão ambiental', 'Habitação', 'Indústria', 'Múltiplo', 'Organização agrária', 'Relações exteriores', 'Saneamento', 'Saúde', 'Segurança pública', 'Sem Informação', 'Trabalho', 'Transporte', 'Urbanismo']
```

#### Tipo

```
['Constitucionais e Royalties', 'Legais, Voluntárias e Específicas']
```

##### Favorecido
```
['Administração Pública', 'Administração Pública Estadual ou do Distrito Federal', 'Administração Pública Federal', 'Administração Pública Municipal', 'Agentes Intermediários', 'Entidades Empresariais Privadas', 'Entidades Sem Fins Lucrativos', 'Fundo Público', 'Organizações Internacionais', 'Sem Informação']
```

##### Programa
```
Verificar ao fazer a consulta com o filtro de função pois existem diversos e são mutáveis.
```

##### Order By:
```
"str" (ex: "Ano")
```

##### Ascending e Group:
```
["Tipo de Favorecido", "Programa Orçamentário"]
```

-----
