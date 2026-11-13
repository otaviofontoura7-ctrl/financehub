# Histórico e correção das entregas anteriores

Este projeto usa **um único repositório GitHub**, preservando os commits da Entrega 1 e da Entrega 2.

## Entrega 1
Definição do problema, público-alvo, soluções propostas, HTML/CSS/JS e arquitetura inicial do back-end.

## Entrega 2
Cadastro/login integrado ao MySQL, bcrypt, autenticação com JWT, perfis administrador e funcionário, middlewares e testes iniciais.

## Correções após a avaliação do professor
A avaliação apontou falta de comandos SQL CREATE TABLE no GitHub e instruções de instalação incompletas. Foram adicionados:
- sql/financehub_entrega2.sql: banco executável, tabelas usuarios, categorias, receitas, despesas, índices, PKs, FKs e restrições.
- sql/financehub_entrega3_migracao.sql: atualização incremental que adiciona forma_pagamento às receitas.
- backend/.env.example: apenas variáveis e valores fictícios de exemplo, sem senhas.
- README.md: instalação, configuração, administrador, execução e testes.
- docs/TESTES_MANUAIS.md: roteiro de validação integrada, ainda não executado localmente.

## Entrega 3
CRUD financeiro completo no código, interface Fetch/DOM, permissões verificadas no servidor, indicadores financeiros calculados no banco.

**Nota:** o GitHub armazena o código, mas não inclui os dados do MySQL local, o arquivo privado .env nem node_modules. Os testes unitários não substituem uma execução com o banco.
