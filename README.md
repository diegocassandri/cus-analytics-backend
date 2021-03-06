# cus-analytics-backend

## Objetivo

API responsável pelo gerenciamento das informações de rentabildiade dos projetos da equipe de customizações da Fábrica de Software Senior.

### Principais Funcionalidades
    - Crud de Projetos
    - Upload de projetos (Modelo de Planilha específica .xls)
    - Curd de Área
    - Crus de Recursos
    - Crud de Usuários
    - Permite autenticação com servidor LDAP e login proprietário


## Tecnologias
    - NodeJS (Express)
    - MongoDB (Mongoose)
    - Documentação (Documentação)
    - Upload de Arquivos (Multer)
    - Processamento de arquivos .xls (node-xlsx)
    - Autenticação AD (activedirectory, jsonwebtoken)
    - Docker e DockerCompose (Conteiner)
    - GitLabCI (Para integração contínua)

## Documentação API

- Rota: /Docs   

![Documentação API](/doc/documentation.png "Documentação API")

## Como Rodar
    
`Clonar repositório`  

```
$ git https://github.com/diegocassandri/cus-analytics-backend.git
$ cd cus-analytics-backend
```
`Instalar dependências` 

```
$ npm install
```

`Alterar variáveis de ambiente`

Com base no arquivo .env.example, criar um novo arquivo chamado .env no memso diretório substituindo as seguintes variáveis de ambiente:

```
DIR_FILES=src/projetos
JWT_KEY= //Chave JWT
PORT=3333
MONGO_URL= //URL Database
LDAP_URL= //URL Servidor LDAP
LDAP_BASE= //BASE Servidor LDAP
```

`Executar Projeto localmente` 

```
$ npm start
```
`Executar projeto com Docker` 

```
$ docker-compose up -d
```