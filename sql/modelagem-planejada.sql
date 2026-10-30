-- FINANCEHUB - MODELAGEM PLANEJADA (Entrega 1)
-- O esquema funcional, as migrations e a autenticação serão implementados na Entrega 2.
CREATE DATABASE IF NOT EXISTS financehub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Entidades previstas: usuarios, categorias, receitas, despesas.
-- Receitas: forma_pagamento ENUM('pix','cartao','dinheiro','outros'), valor, data_recebimento.
-- Despesas: categoria, valor, vencimento, pagamento, status e indicador de imposto.
-- Usuario com perfil administrador ou funcionario.
