# API InformaUFPE/CAA

API construída em NextJS utilizando webscrapping para extrair as informações de cardápio, notícias, eventos e artigos relacionados ao [Centro Acadêmico do Agreste](https://www.ufpe.br/caa) da Universidade Federal de Pernambuco.

### Objetivo

A API fornece as informações para o aplicativo [InformaCAA](https://github.com/forlucashenrique/InformaCAA) que tem como objetivo centralizar as principais informações do Campi.

###  API

> **GET**  `/api/cardapio` retorna um JSON com o cardápio da semana.

> **GET** `/api/noticias` retorna um JSON com as notícias mais recentes.

> **GET** `/api/noticias/[id]` retorna um JSON com um atributo html relacionado à notícia

> **GET** `/api/eventos` retorna um JSON com os eventos mais recentes.

> **GET** `/api/eventos/[id]` retorna um JSON com o atributo html relacionado ao evento.

> **GET** `/api/artigos` retorna um JSON com os artigos mais recentes.

> **GET** `/api/artigos/[id]` retorna um JSON com o atributo html relacionado ao artigo.

### Tecnologias utilizadas

- [NextJS]('https://nextjs.org/')