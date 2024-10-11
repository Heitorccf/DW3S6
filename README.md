# Projeto DW3

Este é o projeto **DW3**, uma aplicação web completa que inclui **backend** em **Node.js** e **TypeScript**, e **frontend** em **React**. A aplicação fornece funcionalidades de gerenciamento de **Alunos**, **Cursos** e **Autenticação de Usuários** via uma API RESTful com autenticação JWT.

## Estrutura do Projeto

- **backend/**: Código fonte do backend, incluindo controladores, modelos, rotas e testes automatizados.
- **frontend/**: Código fonte do frontend, que será a interface da aplicação, construída com React.
- **README.md**: Documentação geral do projeto.

## Tecnologias Utilizadas

- **Node.js** com **Express** (Backend)
- **TypeScript** para tipagem estática
- **PostgreSQL** para persistência de dados
- **JWT** para autenticação
- **React** para o frontend
- **Docker** para gerenciamento do banco de dados
- **Jest** para testes automatizados
- **Swagger** para documentação da API

## Instalação

1. Clone o repositório e instale as dependências.
2. Configure o backend com as variáveis de ambiente necessárias no arquivo `.env` dentro da pasta `backend/`, incluindo o nome do banco de dados, usuário, senha e a porta onde o servidor irá rodar.
3. Configure o banco de dados PostgreSQL, rodando o script de criação das tabelas.
4. Inicie o servidor de backend e o frontend. Ambos podem ser executados simultaneamente.

## Testes

- Para rodar os testes do backend, utilize o framework **Jest**.
- O frontend também possui testes automatizados.

## Documentação da API

A documentação da API está disponível via **Swagger**, acessível em `http://localhost:40000/api-docs` após iniciar o servidor.

## Contribuições

Contribuições são bem-vindas! Faça um fork do repositório, crie uma branch para sua feature, commit suas alterações e abra um pull request para revisão.
